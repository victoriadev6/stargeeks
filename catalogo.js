const cards1 = document.getElementById("filme")
const cards2 = document.getElementById("musica")
const cards3 = document.getElementById("livro")


carregarcatalogo()
function carregarcatalogo(){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    let divcard = document.createElement("div");
    if (dados == null){
        divcard.innerHTML = " <p> Nenhum item encontrado </p>";
        cards.appendChild(divcard);
        return null
    }

    dados.forEach((elemento, indice) => {
        if (elemento.categoria == "F"){
        let divcard = document.createElement("div")
        divcard.innerHTML = `
        <img src="img/${elemento.foto}">

        <div class="info">                   
                <img src="imagens/lixeiringa.png" onclick="excluir(${indice})">
                
                <img src="imagens/mudar.png" onclick="editar(${indice})">
            
        </div>
`
        cards.appendChild(divcard);
        }
    }
    )
}



botaocadastrar.onclick = (evento) =>{
    evento.preventDefault();
    fenvio()
    .then(result =>{
        if(result){
            let dados = JSON.parse(localStorage.getItem("catalogo")) || [];
            dados.push(
        {
            nome : nome.value,
            descricao : descricao.value,
            categoria: categoria.value,
            foto  : nomeArq,        
        }
    )

    localStorage.setItem("catalogo", JSON.stringify(dados));
        }

        else{
            alert("Houve erro no envio do arquivo");
        }
    });
    

}





function editar(indice){
    nome.value = "";
    descricao.value = "";
    foto.value = "";
    cadmodal.style.display = "flex";
    botaocadastrar.style.display = "none";
    botaoeditar.style.display = "block"
    let dados = JSON.parse(localStorage.getItem("catalogo"));

    nome.value = dados[indice].nome;
    descricao.value = dados[indice].descricao;
    fotoa = dados[indice].foto;
    idelemento.value = indice
}

var fotoa;
botaoeditar.onclick = (evento) =>{
    if((fotoa != foto.value) && (foto.value != "")){
        evento.preventDefault();
        fenvio()
        .then(result => {
            if(result){
                salvarEdicao(nomeArq);
            }
        });
    }

    else{
        salvarEdicao(fotoa)
    }
}

function salvarEdicao(pfoto){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    dados[idelemento.value].nome = nome.value;
    dados[idelemento.value].descricao = descricao.value;
    dados[idelemento.value].foto = pfoto;
    localStorage.setItem("catalogo", JSON.stringify(dados));
}


function excluir(indice){
    if (confirm("Tem certeza de que deseja excluir?")) {
        let dados = JSON.parse(localStorage.getItem("catalogo"));
    dados.splice(indice,1);
    localStorage.setItem("catalogo", JSON.stringify(dados));
    window.location.reload();
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