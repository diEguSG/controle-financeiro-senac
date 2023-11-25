//import {toastify} from '../../toastify.js';

carregarProdutos();
atualizarProduto();

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
        situacao: 2
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
    
    const dados = await fetch("http://localhost:3001/produto?situacao=2");
    
    const dadosJson = await dados.json();

    dadosJson.forEach((item)=>{
        
        ulProdutos.insertAdjacentHTML('beforebegin',`
    
            <li>
                <form>
                    <div class="div-information">
                        <p id="p-descricao">Descrição: ${item.descricao}</p>
                        <p id="p-valor-custo">Valor Custo: ${item.valorCusto}</p>
                        <p id="p-valor-venda">Valor Venda: ${item.valorVenda}</p>

                        <input type="hidden" id="inp-id-produto" value="${item.id}">
                        <button id="btn-editar-produto">Editar</button>
                    </div>
                </form>
            </li>
        `);
    })
}

async function atualizarProduto(){

    const dados = await fetch("http://localhost:3001/produto?situacao=2");
    
    const dadosJson = await dados.json();

    
    main.insertAdjacentHTML("beforeend", `

        <form method="post">
            <p id="inp-descricao">${dadosJson.descricao}</p>

            <label for="inp-valor-custo">Custo do Produto</label>
            <input id="inp-valor-custo" type="text" value="${dadosJson.valorCusto}">

            <label for="inp-valor-venda">Venda do Produto</label>
            <input id="inp-valor-venda" type="text" value="${dadosJson.valorVenda}">

            <input type="hidden" id="inp-id-produto" value="${dadosJson.id}">
            <button id="btn-att-produto">Atualizar</button>
        </form>
    `)


    const produtos = {
        valorCusto: document.querySelector("#inp-valor-custo").value,
        valorVenda: document.querySelector("#inp-valor-venda").value,
        situacao: 2
    }
    
}