import Toast from './../../utils/toast.js';
import { url_api } from '../../config/url_api.js';
const axiosClient = axios

const url_API = url_api + "/admin/list-users"

const usersList = async () => {
   try {
      const token = localStorage.getItem("token")
      const res = await axiosClient.get(url_API, {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}` 
         }
      })
      console.log(res)

      return res
   } catch (err) {
      console.error(err)
      const serverMessage = err.response?.data?.message || "Erro ao listar usuários";
      Toast({
         message: serverMessage,
         color1: "#9B2A2A",
         color2: "#ED8B53",
         position: "right"
      });
      return null
   }
}



export default usersList