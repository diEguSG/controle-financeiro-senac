import {toastify} from "./toastify.js";

const form = document.querySelector("form");

const myHeaders = {
    "Content-Type": "application/json"
}

form.addEventListener('submit', async(event)=>{
    event.preventDefault();
    login();
})

async function login(){
    const user = {
        email: document.querySelector("#inp-email").value,
        password: document.querySelector("#inp-senha").value 
    }

    const userJson = JSON.stringify(user);
    
    const res = await fetch("http://localhost:3001/login",
    {
        headers: myHeaders,
        method: "POST",
        body: userJson
    })

    const btnEntrar = document.querySelector("#btn-entrar");

    if(res.status == 200){
        const resJson = await res.json()
        toastify("Ok, login efetuado com sucesso!", "ok");
        localStorage.setItem("@token-exemplo", resJson.acessToker);
        localStorage.setItem("@user-exemplo", JSON.stringify(resJson.user));
        btnEntrar.setAttribute('disabled', '');
        setTimeout(()=>{
            window.location.href = './home/index.html';
        }, 3000)
    }else{
        toastify("OPS, e-mail ou senha incorretos!", "error");
        btnEntrar.setAttribute('disabled', '');
        setTimeout(()=>{
            btnEntrar.removeAttribute('disabled', '');
        }, 3000); 
    }    
}
