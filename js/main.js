// Clave fija con la que guardamos el carrito en LocalStorage.
// Usar una constante evita errores de tipeo si la escribimos
// distinto en dos archivos.
const CLAVE_CARRITO = "ssm_carrito";

/**
 * Lee el carrito guardado en LocalStorage.
 * LocalStorage solo guarda texto, por eso hay que convertir
 * con JSON.parse(). Si todavía no existe nada, devolvemos
 * un arreglo vacío para no romper el resto del código.
 */
function obtenerCarrito() {
  const datosGuardados = localStorage.getItem(CLAVE_CARRITO);
  if (!datosGuardados) {
    return [];
  }
  return JSON.parse(datosGuardados);
}

/**
 * Guarda el carrito completo en LocalStorage.
 * JSON.stringify() convierte el arreglo de JS en texto,
 * que es lo único que LocalStorage puede almacenar.
 */
function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarContadorCarrito();
}

/**
 * Agrega un producto al carrito.
 * Si el producto (identificado por su código) ya estaba,
 * solo sumamos la cantidad en vez de duplicar la fila.
 */
function agregarAlCarrito(producto, cantidad = 1) {
  const carrito = obtenerCarrito();

  const itemExistente = carrito.find((item) => item.codigo === producto.codigo);

  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    carrito.push({
      codigo: producto.codigo,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: cantidad,
    });
  }

  guardarCarrito(carrito);
}

/**
 * Quita un producto del carrito según su código.
 */
function quitarDelCarrito(codigo) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter((item) => item.codigo !== codigo);
  guardarCarrito(carrito);
}

/**
 * Cambia la cantidad de un producto ya agregado.
 * Si la cantidad queda en 0 o menos, se elimina directamente.
 */
function cambiarCantidad(codigo, nuevaCantidad) {
  const carrito = obtenerCarrito();
  const item = carrito.find((item) => item.codigo === codigo);
  if (!item) return;

  if (nuevaCantidad <= 0) {
    quitarDelCarrito(codigo);
    return;
  }

  item.cantidad = nuevaCantidad;
  guardarCarrito(carrito);
}

/**
 * Suma cuántas unidades hay en total dentro del carrito.
 * Se usa para mostrar el numerito rojo/blanco en el menú.
 */
function contarUnidadesCarrito() {
  const carrito = obtenerCarrito();
  return carrito.reduce((total, item) => total + item.cantidad, 0);
}

/**
 * Busca en el HTML el span con id="contador-carrito" (si la
 * página lo tiene) y le pone el número actualizado.
 * Se llama automáticamente cada vez que el carrito cambia.
 */
function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    contador.textContent = contarUnidadesCarrito();
  }
}

// Apenas carga cualquier página, dejamos el contador al día.
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);
