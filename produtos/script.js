import {validarUsuario} from "../validarUsuario.js";

validarUsuario();

import {baseURL} from "../api.js";

carregarProdutos();

const myHeaders = {
    "Content-Type": "application/json"
}

const nav = document.querySelector("nav")
const main = document.querySelector("main")
const ul = document.createElement('ul')
main.appendChild(ul);
const ulProdutos = document.querySelector("ul");

async function carregarProdutos(){
    
    const dados = await fetch(`${baseURL}/produto?situacao=2`);
    
    const dadosJson = await dados.json();

    dadosJson.forEach((item)=>{
        
        ulProdutos.insertAdjacentHTML("beforeend",` 
            <li>
                <form class="form-produtos">
                    <div class="div-produtos">
                        <button type="submit" id="btn-excluir${item.id}">
                            <img src="https://img.icons8.com/?size=48&id=FgOBVsURv5ar&format=png" alt="excluir" >
                        </button>
                        <p id="p-descricao">Descrição: ${item.descricao}</p>
                        <p id="p-valor-custo">Valor Custo: ${item.valorCusto}</p>
                        <p id="p-valor-venda">Valor Venda: ${item.valorVenda}</p>
                        
                        <button id="btn-editar-produto">Editar</button>
                    </div>
                </form>
            </li>
        `);
        const btnExcluir = document.getElementById(`btn-excluir${item.id}`)

        btnExcluir.addEventListener('click', ()=>{  
            excluirProduto(item.id);
        })
    })

    nav.insertAdjacentHTML("afterbegin", `
        <ul>
            <li>
                <a id="btn-aba-produtos" class="btn-nav-produtos">Produtos</a>
            </li>
            <li>
                <a id="btn-abrir-cadastro" class="btn-nav-produtos">Cadastro Produto</a>
            </li>
        </ul>
    `);

    const btnAbrirCadastro = document.querySelector("#btn-abrir-cadastro");

    btnAbrirCadastro.addEventListener('click', ()=>{
        setTimeout(()=>{
            window.location.replace("/produtos/cadastroProdutos/index.html");
        }, 300);
    });
 
}

async function atualizarProduto(){

    const dados = await fetch(`${baseURL}/produto?situacao=2`);
    
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

async function excluirProduto(id_produto){
    
    const idProduto = id_produto;
    const situacao = {
        situacao: 1
    }

    const situacaoJson = JSON.stringify(situacao);

    console.log(idProduto);

    const res = await fetch(`${baseURL}/produto/${idProduto}`, 
    {
        headers: myHeaders,
        method: "PATCH",
        body: situacaoJson
    });
}