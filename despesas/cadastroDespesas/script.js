import {validarUsuario} from "../../validarUsuario.js";

validarUsuario();

import {baseURL} from "../../api.js";

const myHeaders = {
    "Content-Type": "application/json"
}

const nav = document.querySelector("nav");
const main = document.querySelector("main");

toastifyDespesas();

function toastifyDespesas(){

    main.insertAdjacentHTML("afterbegin",`
        <form method="post" class=modal id="modal">
            <label for="inp-descricao">Descrição da Despesa</label>
            <input id="inp-descricao" type="text">

            <label for="inp-valor-despesa">Custo da Despesa</label>
            <input id="inp-valor-despesa" type="number">
        
            <button id="btn-cadastrar-despesa">Cadastrar Despesa</button>
        </form>
    `)

    nav.insertAdjacentHTML("afterbegin", `
        <ul>
            <li>
                <a id="btn-aba-despesas" class="btn-nav-despesas">Despesas</a>
            </li>
            <li>
                <a id="btn-abrir-cadastro" class="btn-nav-produtos">Cadastro de Desepesas</a>
            </li>
        </ul>
    `);

    const btnCarregarDespesas = document.querySelector("#btn-aba-despesas")

    btnCarregarDespesas.addEventListener('click', ()=>{
        setTimeout(()=>{
            window.location.replace("/despesas/index.html");
        }, 300);
    });

    const form = document.querySelector('#modal');

    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        cadastrarDespesa();
    })    
}

async function cadastrarDespesa(){

    const data = new Date();

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    const despesas = {
        descricao: document.querySelector("#inp-descricao").value,
        valorDespesa: document.querySelector("#inp-valor-despesa").value,
        dia: dia,
        mes: mes,
        ano: ano
    }

    const despesasJson = JSON.stringify(despesas);

    const res = await fetch(`${baseURL}/despesa`, 
    {
        headers: myHeaders,
        method: "POST",
        body: despesasJson
    })

    console.log(res);

    if(res.status == 201){
        
    }
}
