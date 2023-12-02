const myHeaders = {
    "Content-Type": "application/json"
}

export function toastifyDespesas(){

    const main  = document.querySelector("main");

    main.insertAdjacentHTML("afterbegin",`
    <div class=modal-src>
            <form method="post" class=modal id="modal">
                <label for="inp-descricao">Descrição da Despesa</label>
                <input id="inp-descricao" type="text">

                <label for="inp-valor-despesa">Custo da Despesa</label>
                <input id="inp-valor-despesa" type="text">
            
                <button id="btn-cadastrar-despesa">Cadastrar Despesa</button>
            </form>
            <button id="btn-fechar-modal">X</button>
    </div>
    `)

    const form = document.querySelector('#modal');

    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        console.log("============> CHEGOU!!")
        cadastrarDespesa();
    })

    const btnFecharModal = document.querySelector('#btn-fechar-modal');

    btnFecharModal.addEventListener('click', (event)=>{
        const modal = document.querySelector('.modal-src')
        event.remove(main);
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

    console.log(despesasJson);

    const res = await fetch("http://localhost:3001/despesa", 
    {
        headers: myHeaders,
        method: "POST",
        body: despesasJson
    })

    console.log(res);

    if(res.status == 201){
        
    }
}