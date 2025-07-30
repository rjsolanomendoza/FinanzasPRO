const endpointCategories = "http://localhost:3000/categories";
const endpointMovements = "http://localhost:3000/movements";

const formMovements = document.getElementById("form-movement");
const tableMovements = document.getElementById("tbody-movement");
let selectCategories = formMovements.category;

document.addEventListener("DOMContentLoaded", () => {
    if(!localStorage.getItem("loggedIn")) {
        window.location.href = "./src/html/login.html";
    }
    pintCategories();
    pintMovements();
});
formMovements.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newMovement = {
        type:formMovements.type.value,
        description: formMovements.description.value,
        amount: parseFloat(formMovements.amount.value),
        date: formMovements.date.value,
        categoryId: parseInt(formMovements.category.value)
    }
    await fetch(endpointMovements, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMovement)
    });

    formMovements.reset();
    pintMovements();
})
async function pintCategories() {
    selectCategories.innerHTML = "";
    const res = await fetch(endpointCategories);
    const categories = await res.json();
    categories.forEach(category => {
        selectCategories.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    });
}
async function pintMovements() {
    tableMovements.innerHTML = "";
    const res = await fetch(`${endpointMovements}?_expand=category`);
    const movements = await res.json();
    movements.forEach(movement => {
        tableMovements.innerHTML += `
            <tr>
                <td>${movement.type}</td>
                <td>${movement.description}</td>
                <td>${movement.amount}</td>
                <td>${movement.date}</td>
                <td>${movement.category.name}</td>
                <td>
                    <button class="btn-delete" data-id="${movement.id}">Delete</button>
                </td>
            </tr>
        `;
    });
    document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const id = e.target.dataset.id;
            await fetch(`${endpointMovements}/${id}`, {
                method: "DELETE"
            });
            pintMovements();
        });
    });
}