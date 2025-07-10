document.addEventListener("DOMContentLoaded", () => {
  generarCarrusel("contenedorRecomendados", "json/destacados.json");
  generarCarrusel("contenedorPacks", "json/packs.json");
  actualizarContadorCarrito();
});

async function generarCarrusel(idContenedor, jsonUrl) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  const res = await fetch(jsonUrl);
  const productos = await res.json();

  const porSlide = 4;
  const totalSlides = Math.ceil(productos.length / porSlide);

  for (let i = 0; i < totalSlides; i++) {
    const productosSlice = productos.slice(i * porSlide, i * porSlide + porSlide);
    const item = document.createElement("div");
    item.classList.add("carousel-item");
    if (i === 0) item.classList.add("active");

    const row = document.createElement("div");
    row.className = "row";

    productosSlice.forEach((producto, index) => {
      const col = document.createElement("div");
      col.className = "col-md-3";
      col.innerHTML = `
        <div class="card card-producto mb-3">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
            <p class="card-title fw-bold mb-2">${producto.nombre}</p>
            <div class="d-flex align-items-center gap-2 mb-1">
              <span class="badge bg-danger">${producto.descuento}</span>
              <span class="fw-bold text-danger">${producto.precioClub}</span>
              <span class="badge bg-dark">CLUB</span>
            </div>
            <div class="text-muted small">Ref. ${producto.precioAnterior}</div>
            <div class="fw-bold">${producto.precioNormal}</div>
            <div class="d-flex align-items-center justify-content-between mt-2">
              <div class="input-group input-group-sm w-50">
                <button class="btn btn-outline-dark" type="button">-</button>
                <input type="text" class="form-control text-center" value="1">
                <button class="btn btn-outline-dark" type="button">+</button>
              </div>
              <button 
                class="btn btn-dark btn-sm btn-agregar" 
                data-nombre="${producto.nombre}" 
                data-precio="${producto.precioClub}" 
                data-id="${idContenedor}-${i}-${index}">
                AGREGAR
              </button>
            </div>
          </div>
        </div>
      `;
      row.appendChild(col);
    });

    item.appendChild(row);
    contenedor.appendChild(item);
  }

  // Delegación de eventos para este carrusel
  contenedor.addEventListener("click", (e) => {
    const boton = e.target;

    if (boton.matches("button.btn-outline-dark")) {
      const input = boton.closest(".input-group").querySelector("input");
      let valor = parseInt(input.value);

      if (boton.textContent.trim() === "+") {
        input.value = valor + 1;
      } else if (boton.textContent.trim() === "-" && valor > 1) {
        input.value = valor - 1;
      }
    }

    if (boton.matches("button.btn-agregar")) {
      const tarjeta = boton.closest(".card");
      const input = tarjeta.querySelector("input");
      const cantidad = parseInt(input.value);

      const producto = {
        id: boton.dataset.id,
        nombre: boton.dataset.nombre,
        precio: boton.dataset.precio,
        cantidad: cantidad
      };

      agregarProductoAlCarrito(producto);

      boton.textContent = "AGREGADO ✓";
      boton.disabled = true;
      setTimeout(() => {
        boton.textContent = "AGREGAR";
        boton.disabled = false;
      }, 1500);
    }
  });
}
