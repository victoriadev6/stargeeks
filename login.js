const formulario = document.getElementById("formulario");
const msg = document.querySelector(".mensagem");
const email = document.getElementById("email");
const senha = document.getElementById("senha")

formulario.onsubmit = (evt)=>{
    let dados = JSON.parse(localStorage.getItem("bd"));
    let logado;
    dados.forEach((elemento) => {
        if(elemento.emailcliente == email.value && elemento.senhacliente == senha.value){
            msg.innerHTML = "Aguarde redirecionando..."
            sessionStorage.setItem("logado", email.value);
            setTimeout(()=>{
                window.location.assign("catalogo.html");
            }, 2000);
            evt.preventDefault();
            logado = "ok";
            return true;
        }
        if (logado!="ok") {
            msg.innerHTML = "Usuario ou senha incorretos"
            evt.preventDefault()
            return null;
        }
    });
}