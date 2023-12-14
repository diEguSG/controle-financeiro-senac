import {baseURL} from "../api.js";

const main = document.querySelector("main");
const ul = document.createElement('ul')
main.appendChild(ul);
const ulVendas = document.querySelector("ul");


function dataAtual(){

    const data = new Date();

    let dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    if(dia < 10){
        dia = "0" + dia;
    }

    main.insertAdjacentHTML("afterbegin", `
        <input type="date" name="" value=${ano + "-" + mes + "-" + "01"} id="filtro-data-inicial">
        <input type="date" name="" value=${ano + "-" + mes + "-" + dia} id="filtro-data-final">
        <button id="btn-carregar-info">Carregar</button>
    `)
}

function atualizaData(){

    const btnAlterarData = document.querySelector("#btn-carregar-info");

    btnAlterarData.addEventListener('click', ()=>{
        const dataInicial = document.querySelector("#filtro-data-inicial").value;
        const dataFinal = document.querySelector("#filtro-data-final").value;

        const anoFinal = dataFinal.slice(0, 4)
        const mesFinal = dataFinal.slice(5, 7)
        const diaFinal = dataFinal.slice(8, 10)

        const anoInicial = dataInicial.slice(0, 4)
        const mesInicial = dataInicial.slice(5, 7)
        const diaInicial = dataInicial.slice(8, 10)

        carregarVendas(anoFinal, anoInicial, mesFinal, mesInicial, diaFinal, diaInicial);
    })
}

async function carregarVendas(anoFinal, anoInicial, mesFinal, mesInicial, diaFinal, diaInicial){

    let dados = []; 
    if(anoFinal - anoInicial == 0){
        
        const dadosAnual = await fetch(`${baseURL}/venda?ano=${anoFinal}`);
        const dadosAnualJson = await dadosAnual.json();

        if(mesFinal - mesInicial == 0){
            
            for(let i = 0; i < dadosAnualJson.length; i++){
                if(dadosAnualJson[i].mes == mesFinal){
                    if(diaFinal - diaInicial == 0){ 
                        if(dadosAnualJson[i].dia == diaFinal){     
                            dados.push(dadosAnualJson[i]) 
                        }  
                    }
                    else if (dadosAnualJson[i].dia <= diaFinal){
                        dados.push(dadosAnualJson[i]) 
                    }
                }
            }
        }else{
            for(let i = mesInicial; i <= mesFinal; i++){
                for(let j = 0; j < dadosAnualJson.length; j++){
                    if(dadosAnualJson[j].mes == i){  
                        dados.push(dadosAnualJson[j])     
                    }
                }
            }
        }
    }
    else{
        for(let i = anoInicial; i <= anoFinal; i++){
            const dadosAnual = await fetch(`${baseURL}/venda?ano=${i}`);
            const dadosAnualJson = await dadosAnual.json();  
                
            console.log(anoFinal);
            if(mesFinal - mesInicial == 0){
                for(let i = 0; i < dadosAnualJson.length; i++){
                    if(dadosAnualJson[i].mes == mesFinal){
                        if(diaFinal - diaInicial == 0){ 
                            if(dadosAnualJson[i].dia == diaFinal){     
                                dados.push(dadosAnualJson[i]) 
                            }  
                        }
                        else if (dadosAnualJson[i].dia <= diaFinal){
                            dados.push(dadosAnualJson[i]) 
                        }
                    }
                }
            }else{
                for(let i = mesInicial; i <= mesFinal; i++){
                    for(let j = 0; j < dadosAnualJson.length; j++){
                        if(dadosAnualJson[j].mes == i){  
                            dados.push(dadosAnualJson[j])  
                        }
                    }
                }
            }
        }
    }   
    
    ulVendas.innerHTML = '';

    ulVendas.insertAdjacentHTML("beforeend", `
        <table>
            <tr>
                <th>Nº Venda</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th>Data</th>
            </tr>
        </table>
    `);

    const table = document.querySelector("table");

    let lucro = 0;
    let valorVendas = 0;

    for(let i = 0; i < dados.length; i++){
        const produto = await fetch(`${baseURL}/produto?id=${dados[i].id_produto}`);
        const produtoJson = await produto.json();

        table.insertAdjacentHTML('beforeend',`  
            <tr>
                <td>${dados[i].id}</td>
                <td>${produtoJson[0].descricao}</td>
                <td>${dados[i].quantidade}</td>
                <td>${dados[i].valorTotal}</td>
                <td>${dados[i].dia}/${dados[i].mes}/${dados[i].ano}</td>
            </tr>
        `); 

        lucro += (produtoJson[0].valorVenda - produtoJson[0].valorCusto) * dados[i].quantidade
        

        valorVendas += dados[i].valorTotal;
    
        if(i == (dados.length - 1)){
            
            console.log(valorVendas);
            console.log(lucro);
        }
    }
}

// async function carregarDespesas(anoFinal, anoInicial, mesFinal, mesInicial, diaFinal, diaInicial){

//     let dados = []; 
//     if(anoFinal - anoInicial == 0){
//         const dadosAnual = await fetch(`${baseURL}/despesa?ano=${anoFinal}`);
//         const dadosAnualJson = await dadosAnual.json();

//         if(mesFinal - mesInicial == 0){
//             for(let i = 0; i < dadosAnualJson.length; i++){
//                 if(dadosAnualJson[i].mes == mesFinal){
                     
//                         if(dadosAnualJson[i].dia == diaFinal){     
//                             dados.push(dadosAnualJson[i]) 
//                         }  
                    
                    
//                 }
//             }
//         }else{
//             for(let i = mesInicial; i <= mesFinal; i++){
//                 for(let j = 0; j < dadosAnualJson.length; j++){
//                     if(dadosAnualJson[j].mes == i){  
//                         dados.push(dadosAnualJson[j])     
//                     }
//                 }
//             }
//         }
//     }
//     else{
//         for(let i = anoInicial; i <= anoFinal; i++){
//             const dadosAnual = await fetch(`${baseURL}/despesa?ano=${i}`);
//             const dadosAnualJson = await dadosAnual.json();  
                
//             if(mesFinal - mesInicial == 0){
//                 for(let i = 0; i < dadosAnualJson.length; i++){
//                     if(dadosAnualJson[i].mes == mesFinal){
//                         if(dadosAnualJson[i].dia == diaFinal){     
//                             dados.push(dadosAnualJson[i]) 
//                         }
//                         else if (dadosAnualJson[i].dia < diaFinal){
//                             dados.push(dadosAnualJson[i]) 
//                         }
//                     }
//                 }
//             }else{
//                 for(let i = mesInicial; i <= mesFinal; i++){
//                     for(let j = 0; j < dadosAnualJson.length; j++){
//                         if(dadosAnualJson[j].mes == i){  
//                             dados.push(dadosAnualJson[j])  
//                         }
//                     }
//                 }
//             }
//         }
//     } 

//     let valorDespesas = 0;

//     for(let i = 0; i < dados.length; i++){
//         valorDespesas += dados[i].valorDespesa;

//         if(i == dados.length - 1){
//             carregarVendas(anoFinal, anoInicial, mesFinal, mesInicial, diaFinal, diaInicial, valorDespesas)
//         }
//     }
// }

dataAtual();
atualizaData();