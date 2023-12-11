import {toastifyProdutos} from './toastifyProdutos.js';
import {baseURL} from "../api.js";

carregarProdutos();

const myHeaders = {
    "Content-Type": "application/json"
}

const main = document.querySelector("main")
const ul = document.createElement('ul')
main.appendChild(ul);
const ulProdutos = document.querySelector("ul");

async function carregarProdutos(){
    
    const dados = await fetch(`${baseURL}/produto?situacao=2`);
    
    const dadosJson = await dados.json();

    dadosJson.forEach((item)=>{
        
        ulProdutos.insertAdjacentHTML('beforebegin',` 
            <li>
                <form id="form-info-produtos">
                    <div class="div-information">
                        <p id="p-descricao">Descrição: ${item.descricao}</p>
                        <p id="p-valor-custo">Valor Custo: ${item.valorCusto}</p>
                        <p id="p-valor-venda">Valor Venda: ${item.valorVenda}</p>
                        
                        

                        <input type="hidden" id="inp-id-produto" value="${item.id}">
                        <button type="submit" id="btn-excluir${item.id}">
                            <img src="https://img.icons8.com/?size=48&id=FgOBVsURv5ar&format=png" alt="excluir" >
                        </button>
                        <button id="btn-editar-produto">Editar</button>
                    </div>
                </form>
            </li>
        `);
        const btnExcluir = document.getElementById(`btn-excluir${item.id}`)

        btnExcluir.addEventListener('click', ()=>{
            console.log("CLICOU")       
            excluirProduto();
    
        })
    })

    main.insertAdjacentHTML("beforeend", `
        <button id="btn-abrir-cadastro">Cadastro Produto</button>
    `);

    const btnAbrirCadastro = document.querySelector("#btn-abrir-cadastro");

        btnAbrirCadastro.addEventListener('click', ()=>{
            toastifyProdutos();
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

async function excluirProduto(){
    
    const idProduto = document.querySelector("#inp-id-produto").value;
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

    console.log(res);
    
    //const dadosJson = await dados.json();
}