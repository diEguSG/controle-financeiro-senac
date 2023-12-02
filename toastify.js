export function toastify(message, situation){
    const main  = document.querySelector("main");

    main.insertAdjacentHTML("afterbegin",`
    <div class="toastify">
        <p>${message}</p>
    </div>
    `)

    if(situation == "error"){
        const toast = document.querySelector(".toastify")
    // toast.setAttribute("style",`background-color: ${color};`)
        toast.classList.add("error")
    }
    // console.log(toast)
}