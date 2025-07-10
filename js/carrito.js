function agregarProductoAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const index = carrito.findIndex(item => item.id === producto.id);
  if (index >= 0) {
    carrito[index].cantidad += producto.cantidad;
  } else {
    carrito.push(producto);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  renderizarCarrito(); // actualiza contenido modal si está abierto
}

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  const contador = document.getElementById("contadorCarrito");
  if (contador) contador.textContent = total;
}

function renderizarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedor = document.getElementById("contenidoCarrito");

  if (!contenedor) return;

  if (carrito.length === 0) {
    contenedor.innerHTML = `<p class="text-center">El carrito está vacío.</p>`;
    return;
  }

  let html = `
    <table class="table table-hover align-middle">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  `;

  carrito.forEach(item => {
    const precioNum = parseInt(item.precio.replace(/[^\d]/g, ""));
    const total = precioNum * item.cantidad;

    html += `
      <tr>
        <td>${item.nombre}</td>
        <td>${item.precio}</td>
        <td>${item.cantidad}</td>
        <td>$${total.toLocaleString("es-CL")}</td>
        <td>
          <button class="btn btn-sm btn-outline-danger eliminar-item" data-id="${item.id}">X</button>
        </td>
      </tr>
    `;
  });

    html += `
      </tbody>
    </table>
    <div class="text-end fw-bold fs-5 mt-3">
      TOTAL: $${carrito.reduce((sum, item) => {
        const precioNum = parseInt(item.precio.replace(/[^\d]/g, ""));
        return sum + precioNum * item.cantidad;
      }, 0).toLocaleString("es-CL")}
    </div>
  `;

  contenedor.innerHTML = html;

  // Eventos de eliminar
  contenedor.querySelectorAll(".eliminar-item").forEach(boton => {
    boton.addEventListener("click", () => {
      eliminarProductoDelCarrito(boton.dataset.id);
    });
  });

  // Desactivar botón Pagar si está vacío
  const btnPagar = document.getElementById("btnPagar");
  if (btnPagar) {
    btnPagar.disabled = carrito.length === 0;
    btnPagar.classList.toggle("disabled", carrito.length === 0);
  }

}

function eliminarProductoDelCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito = carrito.filter(item => item.id !== id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  renderizarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  renderizarCarrito();

  const vaciarBtn = document.getElementById("vaciarCarritoBtn");
  if (vaciarBtn) {
    vaciarBtn.addEventListener("click", () => {
      localStorage.removeItem("carrito");
      actualizarContadorCarrito();
      renderizarCarrito();
    });
  }
});
