const VerifyFields = (data) => {
   
   if(!data.name || !data.email || !data.password) {
      
      return true;
   } else {
      return false;
   }
}

 
export default VerifyFields