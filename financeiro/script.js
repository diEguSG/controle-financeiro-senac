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
        <input type="date" name="" value=${ano + "-" + mes + "-" + dia} id="filtro-data">
        <button id="btn-carregar-info">Carregar</button>
    `)
    const teste = document.querySelector("#filtro-data").value;
    console.log(teste)

}

function atualizaData(){

    const btnAlterarData = document.querySelector("#btn-carregar-info");

    btnAlterarData.addEventListener('click', ()=>{
        const data = document.querySelector("#filtro-data").value;
        
        const ano = data.slice(0, 4)
        const mes = data.slice(5, 7)
        const dia = data.slice(8, 10)

        carregarVendas(ano, mes, dia)

    })
}

async function carregarVendas(ano, mes, dia){

    const dadosAnual = await fetch(`http://localhost:3001/venda?ano=${ano}`)

    const dadosAnualJson = await dadosAnual.json();

    console.log(dadosAnualJson)

    let dados = []; 
    for(let i = 0; i < dadosAnualJson.length; i++){
        if(dadosAnualJson[i].mes == mes){
            if(dadosAnualJson[i].dia == dia){     
                dados.push(dadosAnualJson[i]) 
            }
        }
    }
    console.log(dados)

    ulVendas.innerHTML = '';

    dados.forEach(async (item)=>{

        const produto = await fetch(`http://localhost:3001/produto?id=${item.id}`);
        const produtoJson = await produto.json();
        
        ulVendas.insertAdjacentHTML('beforeend',` 
            <li>
                <form>
                    <div class="div-information">
                        <p id="p-descricao">Descrição: ${produtoJson[0].descricao}</p>
                        <p id="p-quantidade-">Quantidade: ${item.quantidade}</p>
                        <p id="p-valor-total">Valor Total: ${item.valorTotal}</p>
                        <p id="p-data">Data: ${item.dia}/${item.mes}/${item.ano}</p>

                        <input type="hidden" id="inp-id-produto" value="${item.id}">
                    </div>
                </form>
            </li>
        `);   
    })        
}

dataAtual();
atualizaData();