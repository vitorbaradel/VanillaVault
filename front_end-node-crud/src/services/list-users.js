import deleteUser from './list-users/deleteUser.js';
import usersList from './list-users/usersList.js';
import logout from './logout.js';
import Toast from '../utils/toast.js'
import { url_api } from '../config/url_api.js';

const buttonReload = document.querySelector('.reload-manager')
buttonReload.addEventListener("click", () => {
   window.location.reload();
})

window.addEventListener('load', async () => {
   await listUsers();
});

const listUsers = async () => {
  const res = await usersList();
  const list = document.querySelector('.user-box');

  for (let i = 0; i < res.data.users.length; i++) {
    const user = res.data.users[i];
    const nomes = user.name.split(" ").slice(0, 2);

    list.insertAdjacentHTML('beforeend', `
      <div id="${user._id}" class="user-info">
        <div class="user-content">
          <img src="https://ui-avatars.com/api/?name=${nomes.join("+")}&background=random" />
          <p>${user.name}</p>
          <p class="user-email-content">${user.email}</p>
          <p>${user.role}</p>
          <p>${user.createdAt}</p>
        </div>
        <div class="user-info-icons">
          <i class="fa-solid fa-trash" user-object="${user._id}"></i> |
          <i class="fa-solid fa-pen-to-square" user-object="${user._id}" data-modal="update-user"></i>
        </div>
      </div>
    `);
  }
};


const list = document.querySelector('.user-box');
list.addEventListener('click', async (event) => {
  if(event.target.classList.contains('fa-trash')) {
    const userId = event.target.getAttribute('user-object');
    const userElement = document.getElementById(userId);

    if (userElement) {
      userElement.style.display = "none";
      const res = await deleteUser(userId);

      if (res && res.status === 200) {
        Toast({
         message: "Usuário deletado com sucesso",
         color1: "#00b072ff",
         color2: "#96c93d",
         position: "center",
        });
        setTimeout(() => {
          userElement.remove(); 
        }, 1500);
      } else {
        userElement.style.display = "";
      }
    }
  }
});

const url_API = url_api + "/admin/logout"

const buttonLogout = document.getElementById('logout')
buttonLogout.addEventListener('click', async () => {
  const res = await logout(url_API)

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


