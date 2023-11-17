const token = localStorage.getItem("@token-exemplo");
const user = localStorage.getItem("@user-exemplo");

const main = document.querySelector("main");
const form = document.querySelector("form");

form.insertAdjacentHTML('afterbegin', `
    <select name="" id="select-produtos">
        <option value="0">Selecione</option>
        
      
            for(let i=0; i < produtosJson.length; i++){
        
            <option value=""></option>
           
        }
        
    </select>
`)