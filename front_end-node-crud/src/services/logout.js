import Toast from '../utils/toast.js';
const axiosClient = axios;


const logout = async (url_API) => {
   try {
      const token = localStorage.getItem('token')
      const res = await axiosClient.get(url_API, {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
         }
      })
      return res
   } catch (err) {
      const messageServer = err.response?.data?.message || "Erro ao efetuar o logout"
      console.error(err)
      Toast({
         message: messageServer,
         color1: "#9B2A2A",
         color2: "#ED8B53",
         position: "right"
      })
      return null
   }
}


export default logout