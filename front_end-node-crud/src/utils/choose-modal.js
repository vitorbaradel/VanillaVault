const askUserToChooseBoolean = (modalChoose, buttonClose) => {
   return new Promise((resolve) => {
      const buttonYes = document.getElementById('button-choose-yes')
      const buttonNot = document.getElementById('button-choose-not')
   

      modalChoose.showModal()

      const onYes = () => {
         modalChoose.close()
         cleanup()
         resolve(true) 
      }

      const onNot = () => {
         modalChoose.close()
         cleanup()
         resolve(false) 
      }


      const cleanup = () => {
         buttonYes.removeEventListener('click', onYes)
         buttonNot.removeEventListener('click', onNot)
      }

      buttonYes.addEventListener('click', onYes)
      buttonNot.addEventListener('click', onNot)
      if(buttonClose) {
         buttonClose.addEventListener('click', onNot)
      } else {
         return
      }
   })
}

export default askUserToChooseBoolean