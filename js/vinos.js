document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.getElementById("contenedorProductos");

  try {
    const res = await fetch("json/productos-vinos.json");
    const productos = await res.json();

    productos.forEach((producto, index) => {
      const card = document.createElement("div");
      card.className = "col-md-4";

      card.innerHTML = `
        <div class="card card-producto h-100">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body d-flex flex-column">
            <p class="card-title fw-bold mb-2">${producto.nombre}</p>
            <div class="d-flex align-items-center gap-2 mb-1">
              <span class="badge bg-danger">${producto.descuento}</span>
              <span class="fw-bold text-danger">${producto.precioClub}</span>
              <span class="badge bg-dark">CLUB</span>
            </div>
            <div class="text-muted small">Ref. ${producto.precioAnterior}</div>
            <div class="fw-bold mb-3">${producto.precioNormal}</div>
            <div class="d-flex align-items-center justify-content-between mt-auto">
              <div class="input-group input-group-sm w-50">
                <button class="btn btn-outline-dark" type="button">-</button>
                <input type="text" class="form-control text-center" value="1">
                <button class="btn btn-outline-dark" type="button">+</button>
              </div>
              <button class="btn btn-danger btn-sm">AGREGAR</button>
            </div>
          </div>
        </div>
      `;
      contenedor.appendChild(card);
    });
  } catch (error) {
    contenedor.innerHTML = `<div class="text-danger">Error al cargar productos</div>`;
    console.error("Error cargando JSON:", error);
  }
});
