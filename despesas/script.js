import {toastifyDespesas} from './toastifyDespesas.js';
import {baseURL} from "../api.js";

carregarDespesas();

const main = document.querySelector("main")
const ul = document.createElement('ul')
main.appendChild(ul);
const ulDespesas = document.querySelector("ul");


async function carregarDespesas(){
    
    const data = new Date();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    const dados = await fetch(`${baseURL}/despesa?mes=${ano}`);
    
    const dadosJson = await dados.json();


    const dadosVenda = [];
    for(let i = 0; i < dadosJson.length; i++){
        if(dadosJson[i].mes == mes){
            dadosVenda.push(dadosAnualJson[i]);
        }
    }

    dadosVenda.forEach((item)=>{
        
        ulDespesas.insertAdjacentHTML('beforebegin',` 
            <li>
                <div class="div-information">
                    <p id="p-descricao">Descrição: ${item.descricao}</p>
                    <p id="p-valorDespesa">Valor: ${item.valorDespesa}</p>
                    <p id="p-data">Data: ${item.dia}/${item.mes}/${item.ano}</p>
                </div>     
            </li>
        `);
    })

    main.insertAdjacentHTML("beforeend", `
        <button id="btn-abrir-cadastro">Cadastro Despesas</button>
    `);

    const btnAbrirCadastro = document.querySelector("#btn-abrir-cadastro");

    btnAbrirCadastro.addEventListener('click', ()=>{
        toastifyDespesas();
    })
}