const nomeObra = document.getElementById("inomeitem");
const categoria = document.getElementById("icategoria");
const foto = document.getElementById("foto");
const descricao = document.getElementById("iresitem");
const botaocadastrar = document.querySelector(".btn");

var url = new URL(window.location.href);
var peditar = url.searchParams.get("peditar");
var pindice = url.searchParams.get("indice");

var emaillogado;
femailLogado();

if (peditar == "true"){
    editar(pindice);
}




botaocadastrar.onclick = (evento) =>{
    if((peditar != "true") || (peditar == null)){
    evento.preventDefault();
    fenvio()
    .then(result =>{
        if(result){
            let dados = JSON.parse(localStorage.getItem("catalogo")) || [];
            dados.push(
        {
            nome : nomeObra.value,
            descricao : descricao.value,
            foto  : nomeArq,    
            categoria : categoria.value,   
            email: emaillogado 
        }
    )

    localStorage.setItem("catalogo", JSON.stringify(dados));
    window.location.assign("catalogo.html")
        }

        else{
            alert("Houve erro no envio do arquivo");
        }
    });
    }
    else{
        editarenvio(evento);
        window.location.assign("catalogo.html")
    }

}

var nomeArq;
async function fenvio() {
    const url = 'http://localhost:3005/upload';
    const arquivo = document.getElementById("foto").files[0];
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    console.log(JSON.stringify(FormData));
    try{

            var resp = await fetch(url, {
                                            method: 'POST',
                                            body: formData
                                        }
                                    )

        if (resp.ok){
            let respText = await resp.text();
            nomeArq = respText;
            return true;
        }

        else{
            return false
        }
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

function editar(indice){
    nomeObra.value = "";
    descricao.value = "";
    foto.files[0] = null; 
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    nomeObra.value = dados[indice].nome;
    descricao.value = dados[indice].descricao;
    categoria.value = dados[indice].categoria;
    fotoa = dados[indice].foto;
  }

var fotoa;

  function editarenvio(evento){
       evento.preventDefault();
      if ((fotoa != foto.value)&&(foto.value != "")){
   
      fenvio()
      .then(result =>{
                      if(result){
                        salvaEdicao(nomeArq);
                         }
                      });
     }
     else
     {
          salvaEdicao(fotoa);
     } 
  }
  
function salvaEdicao(pfoto){
  let dados = JSON.parse(localStorage.getItem("catalogo"));
  dados[pindice].nome = nomeObra.value;
  dados[pindice].descricao = descricao.value;
  dados[pindice].foto = pfoto;
  dados[pindice].categoria = categoria.value;
  dados[pindice].email = emaillogado;
  localStorage.setItem("catalogo", JSON.stringify(dados));

}

function femailLogado(){
    let dados= sessionStorage.getItem("logado")
    if(dados == null){
        window.location.assign("login.html")
    } else{
        emaillogado = dados;
    }
}
