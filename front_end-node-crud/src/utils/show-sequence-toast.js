import Toast from "./toast.js"

async function showSequenceToast(statusCode, role, page) {
  if (statusCode === 201 || statusCode === 200) {
    await Toast({
      message: `${statusCode === 201 ? "Cadastro" : "Login"} efetuado com sucesso!`,
      color1: "#00b072ff",
      color2: "#96c93d",
      position: "center",
      duration: 2000,
    });

    await Toast({
      message: `Estamos te redirecionando para ${
        page === "register"
          ? "o login"
          : (role === "user" ? "o seu perfil" : "a dashboard")
      }...`,
      color1: "#00b072ff",
      color2: "#96c93d",
      position: "center",
      duration: 2000,
    });
  }
}


export default showSequenceToast

