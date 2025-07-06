document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const userArea = document.getElementById("userArea");

  function mostrarSaludo(nombre) {
    userArea.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-outline-light dropdown-toggle ms-3" type="button" data-bs-toggle="dropdown">
          👤 ${nombre}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="#" id="cerrarSesion">Cerrar sesión</a></li>
        </ul>
      </div>
    `;
    document.getElementById("cerrarSesion").addEventListener("click", function () {
      localStorage.removeItem("sesion_activa");
      location.reload();
    });
  }

  const sesion = JSON.parse(localStorage.getItem("sesion_activa"));
  if (sesion && sesion.nombre) {
    mostrarSaludo(sesion.nombre);
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("registro_usuario"));
    const inputUsuario = document.getElementById("loginUser").value;
    const inputContrasena = document.getElementById("loginPassword").value;

    if (!storedUser) {
      alert("No hay ningún usuario registrado.");
      return;
    }

    if (
      inputUsuario === storedUser.usuario &&
      inputContrasena === storedUser.contrasena
    ) {
      // Inicio exitoso
      localStorage.setItem("sesion_activa", JSON.stringify({
        nombre: storedUser.nombre
      }));

      mostrarSaludo(storedUser.nombre);

      // Cierra el modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      modal.hide();

        // Reproduce el sonido de inicio de sesión
      const audio = document.getElementById("sableSonido");

        
        audio.currentTime = 0.5;
        audio.play();

        
        setTimeout(() => {
        audio.pause();
        audio.currentTime = 0; // Reinicia para futuras veces
        }, 4000);


      //Muestra el mensaje estilo holograma
      const fuerzaMensaje = document.getElementById("fuerzaMensaje");
      fuerzaMensaje.style.display = "block";

      setTimeout(() => {
        fuerzaMensaje.style.display = "none";
      }, 4000);
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  });
});



