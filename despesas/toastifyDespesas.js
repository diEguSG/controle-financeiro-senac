import {baseURL} from "../api.js";

const myHeaders = {
    "Content-Type": "application/json"
}

export function toastifyDespesas(divDespesas, btnAbrirCadastro){

    const main  = document.querySelector("main");

    main.insertAdjacentHTML("afterbegin",`
    <div class=modal-src>
            <form method="post" class=modal id="modal">
                <label for="inp-descricao">Descrição da Despesa</label>
                <input id="inp-descricao" type="text">

                <label for="inp-valor-despesa">Custo da Despesa</label>
                <input id="inp-valor-despesa" type="number">
            
                <button id="btn-cadastrar-despesa">Cadastrar Despesa</button>
            </form>
            <button id="btn-fechar-modal">X</button>
    </div>
    `)

    alterarDisplay(divDespesas, btnAbrirCadastro);

    const form = document.querySelector('#modal');

    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        cadastrarDespesa();
    })

    const btnFecharModal = document.querySelector('#btn-fechar-modal');

    btnFecharModal.addEventListener('click', ()=>{
        const modal = document.querySelector(".modal-src")
        modal.remove();
        alterarDisplay(divDespesas, btnAbrirCadastro);
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


function alterarDisplay(divDespesas, btnAbrirCadastro){

    if(window.getComputedStyle(divDespesas, null).display == "block"){
        divDespesas.style.display = "none";
        btnAbrirCadastro.style.display = "none";
        
    }
    else if(window.getComputedStyle(divDespesas, null).display == "none"){
        divDespesas.style.display = "block";
        btnAbrirCadastro.style.display = "inline-block";
    }
}