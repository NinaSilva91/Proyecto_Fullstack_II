/* =========================================================
   productos.js
   Acá vive el "arreglo de productos" que pide la pauta.
   En un proyecto real esto vendría de una base de datos,
   pero para esta evaluación (solo frontend) los productos
   viven directamente en JavaScript, como un arreglo de
   objetos.

   Cada producto respeta los campos que pide el profesor:
   código, nombre, descripción, precio, stock, stock crítico,
   categoría e imagen.
   ========================================================= */

const productos = [
  {
    codigo: "P001",
    nombre: "Diadema Maid Clásica",
    descripcion: "Diadema blanca con encaje, básica para cualquier outfit maid.",
    precio: 6990,
    stock: 15,
    stockCritico: 5,
    categoria: "accesorios",
    imagen: "imgs/producto1.jpg",
  },
  {
    codigo: "P002",
    nombre: "Delantal Sweet Lolita",
    descripcion: "Delantal rosado con moños, inspirado en cafés maid japoneses.",
    precio: 12990,
    stock: 4,
    stockCritico: 5,
    categoria: "vestuario",
    imagen: "imgs/producto2.jpg",
  },
  {
    codigo: "P003",
    nombre: "Medias Altas Kawaii",
    descripcion: "Medias sobre la rodilla, algodón suave, varios colores pastel.",
    precio: 5990,
    stock: 20,
    stockCritico: 8,
    categoria: "vestuario",
    imagen: "imgs/producto3.jpg",
  },
  {
    codigo: "P004",
    nombre: "Pin Coleccionable Bekyuu",
    descripcion: "Pin metálico de la maid Bekyuu, edición limitada de temporada.",
    precio: 3990,
    stock: 2,
    stockCritico: 5,
    categoria: "coleccionables",
    imagen: "imgs/producto4.jpg",
  },
  {
    codigo: "P005",
    nombre: "Taza Secret Sweet Maid",
    descripcion: "Taza de cerámica con el logo de la comunidad, apta microondas.",
    precio: 7990,
    stock: 10,
    stockCritico: 4,
    categoria: "coleccionables",
    imagen: "imgs/producto5.jpg",
  },
  {
    codigo: "P006",
    nombre: "Guantes de Encaje",
    descripcion: "Guantes cortos de encaje blanco, complemento de uniforme maid.",
    precio: 4990,
    stock: 12,
    stockCritico: 5,
    categoria: "accesorios",
    imagen: "imgs/producto6.jpg",
  },
];

/**
 * Dibuja las tarjetas de productos dentro del contenedor
 * que recibamos, filtrando por categoría si corresponde.
 * "todas" muestra el catálogo completo.
 */
function renderizarProductos(categoriaFiltro = "todas") {
  const contenedor = document.getElementById("lista-productos");
  if (!contenedor) return; // por si esta función se llama en otra página

  contenedor.innerHTML = ""; // limpiamos antes de volver a dibujar

  const productosFiltrados =
    categoriaFiltro === "todas"
      ? productos
      : productos.filter((p) => p.categoria === categoriaFiltro);

  productosFiltrados.forEach((producto) => {
    // Ojo: acá se arma el HTML de la card por JS. No repetimos
    // "id" porque estas tarjetas no usan id, solo clases.
    const stockBajo = producto.stock <= producto.stockCritico;

    const card = document.createElement("div");
    card.className = "col-4";
    card.innerHTML = `
      <article class="card">
        <div class="card-img" style="background-image: url('${producto.imagen}');"></div>
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p class="precio">$${producto.precio.toLocaleString("es-CL")}</p>
        ${
          stockBajo
            ? `<p class="stock-bajo">¡Quedan pocas unidades! (${producto.stock})</p>`
            : `<p>Stock disponible: ${producto.stock}</p>`
        }
        <button type="button" data-codigo="${producto.codigo}" class="btn-agregar">
          Agregar al carrito
        </button>
      </article>
    `;
    contenedor.appendChild(card);
  });

  // Después de crear los botones, les conectamos el evento.
  // Se hace acá (y no una sola vez al cargar la página) porque
  // cada vez que filtramos se vuelven a crear los botones.
  document.querySelectorAll(".btn-agregar").forEach((boton) => {
    boton.addEventListener("click", () => {
      const codigo = boton.getAttribute("data-codigo");
      const producto = productos.find((p) => p.codigo === codigo);
      agregarAlCarrito(producto, 1); // función de main.js
      boton.textContent = "¡Agregado!";
      setTimeout(() => (boton.textContent = "Agregar al carrito"), 900);
    });
  });
}

// Si la página tiene el filtro de categorías, lo conectamos.
document.addEventListener("DOMContentLoaded", () => {
  const filtro = document.getElementById("filtro-categoria");
  if (filtro) {
    filtro.addEventListener("change", () => renderizarProductos(filtro.value));
  }
  renderizarProductos(); // primer dibujo del catálogo completo
});
