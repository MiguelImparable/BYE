function validarFormulario() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (email.trim() === "" || password.trim() === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Validar el formato del correo electrónico utilizando una expresión regular simple
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("El correo electrónico no tiene un formato válido.");
        return;
    }

    alert("Formulario válido. ¡Iniciando sesión!");
    window.location.href = "home.html";
}
