export function validarUsuario(){
    const token = localStorage.getItem("@token-exemplo");
    const user = localStorage.getItem("@user-exemplo");

    if(token == null || user == null){
        setTimeout(()=>{
            window.location.href = '/';
        }, 1)
    }
}