const cards1 = document.getElementById("filme")
const cards2 = document.getElementById("musica")
const cards3 = document.getElementById("livro")

var emaillogado;
femailLogado();
 

carregarcatalogo()

function carregarcatalogo(){

    let dados = JSON.parse(localStorage.getItem("catalogo"));
    let divcard = document.createElement("div");
    if (dados == null){
        divcard.innerHTML = " <p> Nenhum item encontrado </p>";
        cards1.appendChild(divcard);
        return null
    }

    dados.forEach((elemento, indice) => {
        if(elemento.email == emaillogado){
            if (elemento.categoria == "F" || elemento.categoria == "S" || elemento.categoria == "D"){
                let divcard = document.createElement("div")
                divcard.innerHTML = `
                <img src="img/${elemento.foto}">
        
                <div class="info">                   
                <i class="bi bi-trash3-fill" onclick="excluir(${indice})"></i>
                <i class="bi bi-pencil-square" onclick="editar(${indice})"></i>      
                </div>
        `
                cards1.appendChild(divcard);
                } 
                if (elemento.categoria == "M"){
                    let divcard = document.createElement("div")
                    divcard.innerHTML = `
                    <img src="img/${elemento.foto}">
            
                    <div class="info">                   
                    <i class="bi bi-trash3-fill" onclick="excluir(${indice})"></i>
                    <i class="bi bi-pencil-square" onclick="editar(${indice})"></i>   
                    </div>
            `
                    cards2.appendChild(divcard);
                    }
                    if (elemento.categoria == "L"){
                        let divcard = document.createElement("div")
                        divcard.innerHTML = `
                        <img src="img/${elemento.foto}">
                
                        <div class="info">                   
                        <i class="bi bi-trash3-fill" onclick="excluir(${indice})"></i>
                        <i class="bi bi-pencil-square" onclick="editar(${indice})"></i>  
                            
                            
                        </div>
                `
                        cards3.appendChild(divcard);
                        } 
        }
        
    }
    )

}



function editar(indice){
    var url ="cadastroitem.html?peditar=true&indice="+ encodeURIComponent(indice);
    window.location.href = url;
}


function excluir(indice){
    if (confirm("Tem certeza de que deseja excluir?")) {
        let dados = JSON.parse(localStorage.getItem("catalogo"));
    dados.splice(indice,1);
    localStorage.setItem("catalogo", JSON.stringify(dados));
    window.location.reload();
    }
   
   
}



function femailLogado(){
    let dados= sessionStorage.getItem("logado")
    if(dados == null){
        window.location.assign("login.html")
    } else{
        emaillogado = dados;
    }
}