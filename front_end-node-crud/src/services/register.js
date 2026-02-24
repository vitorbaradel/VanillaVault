import askUserToChooseBoolean from '../utils/choose-modal.js'
import showSequenceToast from "../utils/show-sequence-toast.js"
import VerifyFields from '../utils/validation.js'
import Toast from '../utils/toast.js'
import { url_api } from '../config/url_api.js'
const axiosClient = axios

const url_register = url_api + "/register"

const registerUser = async () => {
   let name = document.getElementById('name').value
   const email = document.getElementById('email').value
   const password = document.getElementById('password').value
   const modalChoose = document.getElementById('modal-choose-name')


   if (name === "") {
      const userAccepted = await askUserToChooseBoolean(modalChoose)
      console.log(userAccepted)
      if (userAccepted) 
      name = email.split("@")[0].split(/[\._\s]/)[0]
   }

   const data = {
      name,
      email,
      password
   }
   if (VerifyFields(data)) {
      Toast({
         message: "Preencha todos os campos.",
         color1: "#9B2A2A",
         color2: "#ED8B53",
         position: "right"
      });
      return
   } else {
      try {
         const res = await axiosClient.post(url_register, data, {
            headers: {
               'Content-Type': 'application/json'
            }
         })
         console.log(res.data)
         return res
      } catch (err) {
         console.error(err)
         const serverMessage = err.response?.data?.message || "Erro ao cadastrar";
         console.log(serverMessage)
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

const buttonRegister = document.getElementById('register-button');
buttonRegister.addEventListener('click', async (e) => {
   e.preventDefault()
   e.stopPropagation()
   const res = await registerUser()

   const statusCode = res.status
   const role = "none"
   const page = "register"
   await showSequenceToast(statusCode, role, page);
   
   window.location.href = "src/pages/login.html"
   
})



