/* =========================================================
   carrito.js
   ========================================================= */

function renderizarCarrito() {
  const cuerpoTabla = document.getElementById("cuerpo-carrito");
  const totalTexto = document.getElementById("total-carrito");
  const mensajeVacio = document.getElementById("carrito-vacio");
  if (!cuerpoTabla) return;

  const carrito = obtenerCarrito(); // función de main.js
  cuerpoTabla.innerHTML = "";

  if (carrito.length === 0) {
    mensajeVacio.style.display = "block";
    totalTexto.textContent = "Total: $0";
    return;
  }
  mensajeVacio.style.display = "none";

  let total = 0;

  carrito.forEach((item) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${item.nombre}</td>
      <td>$${item.precio.toLocaleString("es-CL")}</td>
      <td>
        <input type="number" min="1" value="${item.cantidad}"
               data-codigo="${item.codigo}" class="input-cantidad">
      </td>
      <td>$${subtotal.toLocaleString("es-CL")}</td>
      <td><button type="button" class="btn-quitar" data-codigo="${item.codigo}">Quitar</button></td>
    `;
    cuerpoTabla.appendChild(fila);
  });

  totalTexto.textContent = `Total: $${total.toLocaleString("es-CL")}`;

  // Conectamos los inputs de cantidad (uno por fila)
  document.querySelectorAll(".input-cantidad").forEach((input) => {
    input.addEventListener("change", () => {
      const codigo = input.getAttribute("data-codigo");
      const cantidad = parseInt(input.value, 10) || 1;
      cambiarCantidad(codigo, cantidad); // main.js
      renderizarCarrito(); // volvemos a dibujar con el total nuevo
    });
  });

  // Conectamos los botones "Quitar"
  document.querySelectorAll(".btn-quitar").forEach((boton) => {
    boton.addEventListener("click", () => {
      const codigo = boton.getAttribute("data-codigo");
      quitarDelCarrito(codigo); // main.js
      renderizarCarrito();
    });
  });
}

document.addEventListener("DOMContentLoaded", renderizarCarrito);
