const token = localStorage.getItem("@token-exemplo");
const user = localStorage.getItem("@user-exemplo");

const main = document.querySelector("main");
const form = document.querySelector("form");


carregarProdutos();

async function carregarProdutos(){
    
    const dados = await fetch("http://localhost:3001/produto");
    
    const dadosJson = await dados.json();
    //console.log(dadosJson);

    dadosJson.forEach((item)=>{
        
        form.insertAdjacentHTML('beforebegin',`
        <select name="" id="select-produtos">
            <option value="${item.id}">${item.descricao}</option>
        </select>
        `);
    })
}