document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("carouselProductosJson");

  try {
    const res = await fetch("json/productos.json");
    const productos = await res.json();

    productos.forEach((producto, i) => {
      const item = document.createElement("div");
      item.className = "carousel-item" + (i === 0 ? " active" : "");

      item.innerHTML = `
        <div class="hero-slide position-relative w-100 h-100">
          <img src="${producto.imagen}" alt="${producto.nombre}" class="hero-bg">
          <div class="overlay-card">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <span>$${producto.precio}</span>
          </div>
        </div>
      `;

      contenedor.appendChild(item);
    });
  } catch (err) {
    console.error("Error cargando productos.json:", err);
  }
});
