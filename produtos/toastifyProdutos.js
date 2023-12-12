import {baseURL} from "../api.js";

const myHeaders = {
    "Content-Type": "application/json"
}

export function toastifyProdutos(){

    const main = document.querySelector("main");

    main.insertAdjacentHTML("afterbegin",`
    <div class=modal-src>
            <form method="post" class=modal id="modal">
                <label for="inp-descricao">Descrição do Produto</label>
                <input id="inp-descricao" type="text">

                <label for="inp-valor-custo">Custo do Produto</label>
                <input id="inp-valor-custo" type="text">

                <label for="inp-valor-venda">Venda do Produto</label>
                <input id="inp-valor-venda" type="text">

                <button id="btn-cadastrar-produto">Cadastrar Produto</button>
            </form>
            <button id="btn-fechar-modal">X</button>
    </div>
    `)

    const form = document.querySelector('#modal');

    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        cadastrarProduto();
    })

    const btnFecharModal = document.querySelector('#btn-fechar-modal');

    btnFecharModal.addEventListener('click', ()=>{
        const modal = document.querySelector(".modal-src")
        modal.remove();
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