import Toast from './../utils/toast.js';
import { url_api } from './../config/url_api.js';
import logout from './logout.js';
const axiosClient = axios

const url_API = url_api + "/user/profile"
const url_API_logout = url_api + "/user/logout"

const getProfileUser = async () => {
   try {
      const token = localStorage.getItem('token')
      const res = await axiosClient.get(url_API, {
         headers: {
            'Content-Type': "application/json",
            "Authorization": `${token}`
         }
      })
      console.log(res.data)
      return res
   } catch (err) {
      console.error(err)
      const serverMessage = err.respose?.data?.message || "Erro ao carregar perfil"
      
      Toast({
         message: serverMessage,
         color1: "#9B2A2A",
         color2: "#ED8B53",
         position: "right"
      })
      return null
   }
}


window.addEventListener('load', async () => {
   const res = await getProfileUser()
   const nomes = res.data.userInfo.name.split(" ").slice(0, 2);

   const dateCreated = new Date(res.data.userInfo.createdAt);
   const formatted = dateCreated.toLocaleDateString("pt-BR", {
         day: '2-digit',
         month: '2-digit',
         year: 'numeric'
   }) + ' | ' + dateCreated.toLocaleTimeString("pt-BR", {
         hour: '2-digit',
         minute: '2-digit'
   });

  const containerProfile = document.querySelector('.profile-container')
  containerProfile.insertAdjacentHTML('beforeend', `
      <div class="profile-card">
         <div class="profile-image">
            <img src="https://ui-avatars.com/api/?name=${nomes.join("+")}&background=random" alt="Foto de Perfil">
         </div>
         <div class="profile-info">
            <h1 id="profile-name">
               ${res.data.userInfo.name}
            </h1>
            <p class="profile-email"><strong>Email:</strong> 
               <span id="profile-email">
                  ${res.data.userInfo.email}
               </span>
            </p>
            <p class="profile-role"><strong>Role:</strong> 
               <span id="profile-role">
                  ${res.data.userInfo.role}
               </span>
            </p>
            <p class="profile-created"><strong>Conta criada em:</strong>
               <span id="profile-created">
                  ${formatted}
               </span>
            </p>
         </div>
      </div>
   `);
});

const buttonLogout = document.getElementById('logout')
buttonLogout.addEventListener('click', async () => {
  const res = await logout(url_API_logout)

  if(res && res.status === 200) {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    Toast({
      message: "Logout efetuado com sucesso!",
      color1: "#00b072ff",
      color2: "#96c93d",
      position: "center",
    });
    setTimeout(() => {
      window.location.href = "../pages/login.html"
    }, 2500)
  } 
});