const main = document.querySelector("main");

const myHeaders = {
    "Content-Type": "application/json"
}

infos();



async function infos(){

    const dadosProdutos = await fetch("http://localhost:3001/produto?situacao=2");

    const dadosProdutosJson = await dadosProdutos.json();
    
    main.insertAdjacentHTML("afterbegin", `
        <form method="post">
            
            <div>
                <label for="slc-produto">Produto</label>
                <select name="" id="slc-produto">
                </select>
            </div>

            <div>
                <label for="inp-quantidade">Quantidade</label>
                <input type=number id="inp-quantidade">
            </div>

            <button id="btn-cad-venda">Salvar</button>
        </form>
    `)

     dadosProdutosJson.forEach((item)=>{
        const select = document.querySelector("#slc-produto");
        select.insertAdjacentHTML ("beforeend", `
            <option value="${item.id}">${item.descricao}</option>
        `) 
    })

    const form = document.querySelector("form");

    form.addEventListener('submit', async(event)=>{
        event.preventDefault();

        const idProduto = document.querySelector("#slc-produto").value;
        
        const dadosProduto = await fetch(`http://localhost:3001/produto/${idProduto}`);
        const dadosProdutoJson = await dadosProduto.json();

        const quantidade = document.querySelector("#inp-quantidade").value;
        const data = new Date();

        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();

        const infoVenda = {
            id_produto: dadosProdutoJson.id,
            quantidade: quantidade,
            valorTotal: quantidade * dadosProdutoJson.valorVenda,
            dia: dia,
            mes: mes,
            ano: ano
        }

        const infoJson = JSON.stringify(infoVenda);

        const res = await fetch("http://localhost:3001/venda",
        {
            headers: myHeaders,
            method: "POST",
            body: infoJson
        })
    })
    
    
}



