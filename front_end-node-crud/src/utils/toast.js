
const Toast = (data) => {
   Toastify({
      text: data.message,
      duration: data.duration || 2000,
      close: true,
      style: {
         background: `linear-gradient(to right, ${data.color1}, ${data.color2})`
      },
      gravity: "top",
      position: data.position
  }).showToast();

  return new Promise((resolve) => {
    setTimeout(() => { // depois de 2000 segundos executa o resolve(), é o que encerra a promisse, indica que a opração terminou
      resolve();
    }, data.duration || 2000);
  });
};

  
export default Toast