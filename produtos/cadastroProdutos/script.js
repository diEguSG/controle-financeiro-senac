import {baseURL} from "../../api.js";

const myHeaders = {
    "Content-Type": "application/json"
}

const nav = document.querySelector("nav");
const main = document.querySelector("main");

toastifyProdutos();

function toastifyProdutos(){

    main.insertAdjacentHTML("beforeend",`
        <form method="post" class=modal id="modal">
            <label for="inp-descricao">Descrição do Produto</label>
            <input id="inp-descricao" type="text">

            <label for="inp-valor-custo">Custo do Produto</label>
            <input id="inp-valor-custo" type="text">

            <label for="inp-valor-venda">Venda do Produto</label>
            <input id="inp-valor-venda" type="text">

            <button id="btn-cadastrar-produto">Cadastrar Produto</button>
        </form>
    `)

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

    const btnCarregarProduto = document.querySelector("#btn-aba-produtos")

    btnCarregarProduto.addEventListener('click', ()=>{
        setTimeout(()=>{
            window.location.replace("/produtos/index.html");
        }, 300);
    });

    const form = document.querySelector('#modal');

    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        cadastrarProduto();
    })
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

    const res = await fetch(`${baseURL}/produto`, 
    {
        headers: myHeaders,
        method: "POST",
        body: produtosJson
    })

    console.log(res);

    if(res.status == 201){
        
    }
}


function alterarDisplay(formProdutos, btnAbrirCadastro){
    

    if(window.getComputedStyle(formProdutos, null).display == "block"){
        formProdutos.style.display = "none";
        btnAbrirCadastro.style.display = "none";
        
    }
    else if(window.getComputedStyle(formProdutos, null).display == "none"){
        formProdutos.style.display = "block";
        btnAbrirCadastro.style.display = "inline-block";
    }
}


