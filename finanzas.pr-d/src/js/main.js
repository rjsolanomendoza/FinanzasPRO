document.addEventListener("DOMContentLoaded", () => {
    if(!localStorage.getItem("loggedIn")) {
        window.location.href = "./src/html/login.html";
    }
    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        window.location.href = "./src/html/login.html";
    })

})