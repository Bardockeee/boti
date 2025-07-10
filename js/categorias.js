document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("contenedorCategorias");
  const res = await fetch("json/categorias.json");
  const categorias = await res.json();

  categorias.forEach(categoria => {
    const col = document.createElement("div");
    col.className = "col-md-4 col-sm-6";
    col.innerHTML = `
      <div class="categoria-card">
        <img src="${categoria.imagen}" alt="${categoria.nombre}" class="img">
        <div class="overlay">
          <span class="descuento">${categoria.descuento}</span>
          <h3 class="titulo">${categoria.nombre.toUpperCase()}</h3>
          <a href="${categoria.url}" class="btn">
            VER TODAS <i class="bi bi-chevron-right"></i>
          </a>
        </div>
      </div>
    `;
    contenedor.appendChild(col);
  });
});
