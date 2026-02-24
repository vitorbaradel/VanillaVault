import Toast from '../../utils/toast.js'
import { url_api } from '../../config/url_api.js';
const axiosClient = axios

const url_API = url_api + "/admin/delete/user/"

const deleteUser = async (id) => {
   if (!id) {
      Toast({
         message: "Nenhum ID de usuário recebido",
         color1: "#9B2A2A",
         color2: "#ED8B53",
         position: "right"
      })
      return
   } 

   try {
      const token = localStorage.getItem('token')
      const res = await axiosClient.delete(`${url_API + id}`, {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}` 
         }
      });

      console.log(res.data)
      return res
   } catch (err) {
      console.error(err)
      const serverMessage = err.response?.data?.message || "Erro ao deletar";
      Toast({
         message: serverMessage,
         color1: "#9B2A2A",
         color2: "#ED8B53",
         position: "right"
      });
      return null
   }
}

export default deleteUser;

