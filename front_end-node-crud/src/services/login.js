import askUserToChooseBoolean from '../utils/choose-modal.js';
import showSequenceToast from '../utils/show-sequence-toast.js';
import Toast from '../utils/toast.js'
import VerifyFields from '../utils/validation.js'
import { url_api } from '../config/url_api.js'
const axiosClient = axios

const url_login = url_api + "/login"

const userLogin = async () => {
   const email = document.getElementById('email').value
   const password = document.getElementById('password').value


   const firstWordDefault = email.split("@")[0].split(/[\._\s]/)[0];
   const name = firstWordDefault

   if(VerifyFields({ name, email, password })) {
      Toast({
         message: "Preencha todos os campos.",
         color1: "#9B2A2A",
         color2: "#ED8B53",
         position: "right"
      });
      return
   } else {
      try {
         const res = await axiosClient.post(url_login, { email, password }, {
            headers: {
               'Content-Type': 'application/json'
            }})
         console.log(res)
         return res
      } catch (err) {
         const serverMessage = err.response?.data?.message || "Erro ao logar";
         Toast({
            message: serverMessage,
            color1: "#9B2A2A",
            color2: "#ED8B53",
            position: "right"
         });
         return null
      }
   }
}

window.addEventListener("load", () => {
  const navEntries = performance.getEntriesByType("navigation");
  if (navEntries.length > 0 && navEntries[0].type === "back_forward") {
    
   localStorage.removeItem("token")
   localStorage.removeItem("role")
  }
});

const loginButton = document.getElementById('login-button')
   loginButton.addEventListener('click', async () => {
   
   let tokenLocal = localStorage.getItem("token");
   let roleLocal = localStorage.getItem("role")

   if(!tokenLocal && !roleLocal) {
      const res = await userLogin();
      
      const token = res.data.token;
      const role = res.data.role;
      const statusCode = res.status;

      await showSequenceToast(statusCode, role, "login")
      role === "user" 
         ? window.location.href = "profile-user.html"
         : window.location.href = "list-users.html"
       
      if (token && role) {
         localStorage.setItem("token", token);
         localStorage.setItem("role", role)
   
      } 
   } else {
         const modalChoose = document.getElementById('modal-choose-login')
         const role = localStorage.getItem("role")

         const accepted = await askUserToChooseBoolean(modalChoose)
         if(accepted) {
            await showSequenceToast(200, role, "login")
            role === "user" 
               ? window.location.href = "profile-user.html"
               : window.location.href = "list-users.html" 
         } else {
            localStorage.removeItem("token")
            localStorage.removeItem("role")
            await Toast({
               message: "Sessão terminada",
               color1: "#00b072ff",
               color2: "#96c93d",
               position: "center",
               duration: 1110
            })
            await Toast ({
               message: "Pode efetuar login novamente",
               color1: "#00b072ff",
               color2: "#96c93d",
               position: "center",
               duration: 1500
            })
         } 

      }
})
