import {toastify} from "../toastify.js";

const form = document.querySelector("form");

const myHeaders = {
    "Content-Type": "application/json"
}

form.addEventListener('submit', async(event)=>{
    event.preventDefault();
    cadastro();
})

async function cadastro(){
    const user = {
        nome:  document.querySelector("#inp-nome").value,
        email: document.querySelector("#inp-email").value,
        password: document.querySelector("#inp-senha").value 
    }

    const userJson = JSON.stringify(user);
    
    const res = await fetch("http://localhost:3001/register",
    {
        headers: myHeaders,
        method: "POST",
        body: userJson
    })

    const btnCadastrar = document.querySelector("#btn-cadastrar");

    console.log(res);

    if(res.ok){
        toastify("Usuário cadastrado com sucesso!", "sucess");
        btnCadastrar.setAttribute('disabled', '');
        setTimeout(()=>{
            window.location.replace("../index.html");
        }, 3500);
    }else{
        toastify("Usuário já existente!", "error")
        btnCadastrar.setAttribute('disabled', '');
        setTimeout(()=>{
            btnCadastrar.removeAttribute('disabled', '');
        }, 3000); 
    }

    const resJson = await res.json();

    console.log(resJson);
}