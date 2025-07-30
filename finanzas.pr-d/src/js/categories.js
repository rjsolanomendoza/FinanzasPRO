const endpoint = "http://localhost:3000/categories";

const form = document.getElementById("form-categorie");
const list = document.getElementById("categorie-list");
document.addEventListener("DOMContentLoaded", () => {
    if(!localStorage.getItem("loggedIn")) {
        window.location.href = "./src/html/login.html";
    }
    pintCategories();
});
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newCategory = {
        name: form.name.value.trim()
    };
    if (newCategory) {
        await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCategory)
        });
    }
});
form.reset();
async function pintCategories() {
    list.innerHTML = "";
    const res = await fetch(endpoint);
    const categories = await res.json();
    categories.forEach(category => {
        list.innerHTML += `<li>${category.name} <button class="btn-delete" data-id="${category.id}">Delete</button></li>`;
    });
    document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const id = e.target.dataset.id;
            await fetch(`${endpoint}/${id}`, {
                method: "DELETE"
            });
            pintCategories();
        });
    });
}
