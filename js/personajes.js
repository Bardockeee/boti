
window.onload = async function () {
  let personajes = [];
  let paginaActual = 0;
  const porPagina = 6;
  const maxPersonajes = 12;

  try {
    const res = await fetch("https://akabab.github.io/starwars-api/api/all.json");
    personajes = await res.json();
    console.log(personajes);

    const contenedor = document.getElementById("personajes-dinamicos");
    const boton = document.getElementById("btnVerMas");

    function renderizarPagina() {
      const inicio = paginaActual * porPagina;
      const fin = inicio + porPagina;
      const personajesPagina = personajes.slice(inicio, fin);

      personajesPagina.forEach(personaje => {
        const col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
          <div class="card figura-card bg-black text-white border-0">
            <img src="${personaje.image}" class="card-img-top" alt="${personaje.name}">
            <div class="card-body">
              <h5 class="card-title text-warning">${personaje.name}</h5>
              <p class="card-text">
                🧬 Especie: ${personaje.species || "N/A"}<br>
                ⚔️ Afiliación: ${personaje.affiliations?.[0] || "Desconocida"}<br>
                📏 Altura: ${personaje.height} cm<br>
                ⚖️ Peso: ${personaje.mass} kg
              </p>
            </div>
          </div>
        `;

        contenedor.appendChild(col);
      });

      paginaActual++;

      // Si ya mostramos 12, cambia el botón
      if (paginaActual * porPagina >= maxPersonajes) {
        boton.textContent = "Mostrar menos ↑";
      }
    }

    function reiniciarVista() {
      contenedor.innerHTML = "";
      paginaActual = 0;
      renderizarPagina();
      boton.textContent = "Ver más personajes ↓";
    }

    function reiniciarVista() {
      contenedor.innerHTML = "";
      paginaActual = 0;
      renderizarPagina();
      boton.textContent = "Ver más personajes ↓";

      // Hacer scroll automático hacia la sección de personajes
      const seccionPersonajes = document.getElementById("personajes");
      if (seccionPersonajes) {
        seccionPersonajes.scrollIntoView({ behavior: "smooth" });
      }
    }


    // Evento botón
    boton.addEventListener("click", () => {
      if (boton.textContent.includes("menos")) {
        reiniciarVista();
      } else {
        renderizarPagina();
      }
    });

    // Mostrar primeros 6 al cargar
    renderizarPagina();

  } catch (error) {
    console.error("Error al obtener personajes:", error);
    document.getElementById("personajes-dinamicos").innerHTML =
      `<div class="alert alert-danger text-center">No se pudo cargar la información desde la galaxia 😢</div>`;
  }
};



