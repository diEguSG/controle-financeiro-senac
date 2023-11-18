//import {toastify} from '../../toastify.js';

carregarProdutos();


const form = document.querySelector("form");
const main = document.querySelector("main")
const ul = document.createElement('ul')
main.appendChild(ul);
const ulProdutos = document.querySelector("ul");

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    cadastrarProduto();
})

const myHeaders = {
    "Content-Type": "application/json"
}

async function cadastrarProduto(){

    const produtos = {
        descricao: document.querySelector("#inp-descricao").value,
        valorCusto: document.querySelector("#inp-valor-custo").value,
        valorVenda: document.querySelector("#inp-valor-venda").value,
        situacao: document.querySelector("#slc-situacao-produto").value
    }

    const produtosJson = JSON.stringify(produtos);

    console.log(produtosJson);

    const res = await fetch("http://localhost:3001/produto", 
    {
        headers: myHeaders,
        method: "POST",
        body: produtosJson
    })

    console.log(res);

    if(res.status == 201){
        
    }
}

async function carregarProdutos(){
    
    const dados = await fetch("http://localhost:3001/produto");
    
    const dadosJson = await dados.json();
    //console.log(dadosJson);

    dadosJson.forEach((item)=>{
        
        ulProdutos.insertAdjacentHTML('beforebegin',`
        
            <li>
                <div class="div-information">
                    <p id="p-descricao">Descrição: ${item.descricao}</p>
                    <p id="p-valor-custo">Valor Custo: ${item.valorCusto}</p>
                    <p id="p-valor-venda">Valor Venda: ${item.valorVenda}</p>
                </div>
            </li>
        `);
    })
}


// async function carregarSituacoes(){

//     const dados = await fetch("http://localhost:3001/produto");
    
//     const dadosJson = await dados.json(); 

//     console.log(dadosJson);

//     dadosJson.forEach((item)=>{

//         teste.insertAdjacentHTML('beforebegin', `
            
//         `)
//     })
// }