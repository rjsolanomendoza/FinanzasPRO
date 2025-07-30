document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:3000/users");
    const usuarios = await res.json();

    const valido = usuarios.find(u => u.username === username && u.password === password);

    if (valido) {
      localStorage.setItem("loggedIn", true);
      window.location.href = "./dashboard.html";
    } else {
      mostrarError("Credenciales incorrectas");
    }
  } catch (error) {
    mostrarError("Error al conectar con el servidor");
  }
});

function mostrarError(mensaje) {
  const errorMsg = document.getElementById("error-msg");
  errorMsg.textContent = mensaje;
  errorMsg.style.color = "red";
}