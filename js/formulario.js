document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".registro-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita recargar la página

    const usuario = {
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      usuario: document.getElementById("usuario").value,
      contrasena: document.getElementById("contrasena").value,
      email: document.getElementById("email").value,
      telefono: document.getElementById("telefono").value,
      fecha: document.getElementById("fecha").value,
      genero: document.querySelector('input[name="genero"]:checked')?.id || "No especificado"
    };

    // Guardar en localStorage
    localStorage.setItem("registro_usuario", JSON.stringify(usuario));

    alert("¡Registro exitoso!");

    // Limpiar formulario
    form.reset();
  });
});
