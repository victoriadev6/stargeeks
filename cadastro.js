const formulario = document.getElementById("formulario");
const msg = document.querySelector(".mensagem");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const senha2 = document.getElementById("senha");


function verificarEmail(email, evento){
    let dados = JSON.parse(localStorage.getItem("bd"));
    if (dados == null){
        criarUsuario(evento);
    } else {
        let validar = dados.find(elemento => elemento.emailcliente==email);
        if (validar){
            msg.innerHTML="E-mail já existe!";
            evento.preventDefault();
        } else {
            criarUsuario(evento);
        }  
    }  
}

formulario.onsubmit = (evento) => {
    if(nome.value == ""){
        evento.preventDefault()
        msg.innerHTML = "Digite seu nome"
        nome.focus()
        return null
}
if (email.value == ""){
    evento.preventDefault();
    msg.innerHTML = "Digite seu e-mail"
    email.focus()
    return null

    }


    if (senha.value == ""){
        evento.preventDefault();
        msg.innerHTML = "Digite sua senha"
        senha.focus()
        return null

}

if (senha2.value == ""){
    evento.preventDefault();
    msg.innerHTML = "Confirme sua senha"
    senha.focus()
    return null

}
if (senha.value != senha2.value){
    evento.preventDefault
    msg.innerHTML = "Digite senhas iguais"
    senha2.focus();
    return null;
}
verificarEmail(email.value, evento);
}
function criarUsuario(evento){
    let dados= JSON.parse(localStorage.getItem("bd")) || []

    dados.push(
        {
            nomecliente : nome.value,
            emailcliente : email.value,
            senhacliente : senha.value,
        }

        )

        localStorage.setItem("bd",  JSON.stringify(dados))
        msg.innerHTML = "Usuário cadastrado com sucesso"
        evento.preventDefault()
        setTimeout(()=> {
            window.location.assign("login.html")
        },2000)
       
}

