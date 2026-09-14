/* =========================================================
   validaciones.js
   Acá viven TODAS las validaciones de formularios controladas
   por JavaScript que pide la rúbrica (IE1.2.1 e IE1.2.2):
   - Login
   - Contacto
   - Registro

   Idea general (para explicarla al profesor):
   1. Cada campo tiene un <span class="mensaje-error"> al lado,
      pensado para mostrar el error JUSTO donde ocurre (no un
      alert() genérico).
   2. Antes de enviar (evento "submit") revisamos TODOS los
      campos. Si hay algún error, hacemos preventDefault()
      para que el formulario NO se envíe con datos malos.
   3. Los dominios de correo permitidos (@duoc.cl,
      @profesor.duoc.cl y @gmail.com) están definidos una sola
      vez en DOMINIOS_PERMITIDOS para no repetir el arreglo en
      cada validación.
   ========================================================= */

const DOMINIOS_PERMITIDOS = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

/**
 * Muestra un mensaje de error debajo del campo indicado y le
 * agrega la clase "error" al contenedor .campo (así el CSS le
 * pone el borde rojo).
 */
function mostrarError(idCampo, mensaje) {
  const spanError = document.getElementById(`error-${idCampo}`);
  const contenedorCampo = document.getElementById(idCampo).closest(".campo");
  if (spanError) spanError.textContent = mensaje;
  if (contenedorCampo) contenedorCampo.classList.add("error");
}

/**
 * Limpia el error de un campo (se llama cuando ese campo sí
 * pasó la validación).
 */
function limpiarError(idCampo) {
  const spanError = document.getElementById(`error-${idCampo}`);
  const contenedorCampo = document.getElementById(idCampo).closest(".campo");
  if (spanError) spanError.textContent = "";
  if (contenedorCampo) contenedorCampo.classList.remove("error");
}

/**
 * Valida que un correo tenga formato válido Y que el dominio
 * esté dentro de los permitidos por el profesor.
 * Devuelve un mensaje de error, o "" si está todo bien.
 */
function validarFormatoCorreo(correo) {
  const formatoBasico = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoBasico.test(correo)) {
    return "Ingresa un correo con formato válido (ej: nombre@dominio.cl).";
  }
  const dominio = correo.split("@")[1].toLowerCase();
  if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
    return `Solo se aceptan correos ${DOMINIOS_PERMITIDOS.map((d) => "@" + d).join(", ")}.`;
  }
  return "";
}

/* =========================================================
   LOGIN
   Reglas oficiales:
   - Correo: requerido, máximo 100 caracteres, dominio permitido.
   - Contraseña: requerida, entre 4 y 10 caracteres.
   ========================================================= */
function inicializarValidacionLogin() {
  const formulario = document.getElementById("form-login");
  if (!formulario) return;

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); // frenamos el envío hasta validar todo
    let formularioValido = true;

    const correo = document.getElementById("login-correo").value.trim();
    const clave = document.getElementById("login-clave").value;

    // --- Validación de correo ---
    if (correo === "") {
      mostrarError("login-correo", "El correo es obligatorio.");
      formularioValido = false;
    } else if (correo.length > 100) {
      mostrarError("login-correo", "El correo no puede superar los 100 caracteres.");
      formularioValido = false;
    } else {
      const errorCorreo = validarFormatoCorreo(correo);
      if (errorCorreo) {
        mostrarError("login-correo", errorCorreo);
        formularioValido = false;
      } else {
        limpiarError("login-correo");
      }
    }

    // --- Validación de contraseña ---
    if (clave === "") {
      mostrarError("login-clave", "La contraseña es obligatoria.");
      formularioValido = false;
    } else if (clave.length < 4 || clave.length > 10) {
      mostrarError("login-clave", "La contraseña debe tener entre 4 y 10 caracteres.");
      formularioValido = false;
    } else {
      limpiarError("login-clave");
    }

    const mensajeFormulario = document.getElementById("mensaje-login");
    if (formularioValido) {
      // No hay backend real: simulamos el "inicio de sesión"
      // guardando el nombre de usuario para la sesión de la demo.
      mensajeFormulario.textContent = "¡Bienvenida/o! Inicio de sesión exitoso.";
      mensajeFormulario.className = "mensaje-formulario exito";
    } else {
      mensajeFormulario.textContent = "Revisa los campos marcados en rojo.";
      mensajeFormulario.className = "mensaje-formulario fallo";
    }
  });
}

/* =========================================================
   CONTACTO
   Reglas oficiales:
   - Nombre: requerido, máximo 100 caracteres.
   - Correo: máximo 100 caracteres, dominio permitido.
   - Comentario: requerido, máximo 500 caracteres.
   ========================================================= */
function inicializarValidacionContacto() {
  const formulario = document.getElementById("form-contacto");
  if (!formulario) return;

  // Contador de caracteres en vivo para el comentario (esto es
  // la parte de "sugerencias" que pide la pauta: le mostramos
  // al usuario cuánto espacio le queda mientras escribe).
  const comentario = document.getElementById("contacto-comentario");
  const contador = document.getElementById("contador-comentario");
  if (comentario && contador) {
    comentario.addEventListener("input", () => {
      contador.textContent = `${comentario.value.length}/500`;
    });
  }

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    let formularioValido = true;

    const nombre = document.getElementById("contacto-nombre").value.trim();
    const correo = document.getElementById("contacto-correo").value.trim();
    const texto = document.getElementById("contacto-comentario").value.trim();

    if (nombre === "") {
      mostrarError("contacto-nombre", "El nombre es obligatorio.");
      formularioValido = false;
    } else if (nombre.length > 100) {
      mostrarError("contacto-nombre", "Máximo 100 caracteres.");
      formularioValido = false;
    } else {
      limpiarError("contacto-nombre");
    }

    if (correo === "") {
      mostrarError("contacto-correo", "El correo es obligatorio.");
      formularioValido = false;
    } else if (correo.length > 100) {
      mostrarError("contacto-correo", "Máximo 100 caracteres.");
      formularioValido = false;
    } else {
      const errorCorreo = validarFormatoCorreo(correo);
      if (errorCorreo) {
        mostrarError("contacto-correo", errorCorreo);
        formularioValido = false;
      } else {
        limpiarError("contacto-correo");
      }
    }

    if (texto === "") {
      mostrarError("contacto-comentario", "Cuéntanos algo antes de enviar.");
      formularioValido = false;
    } else if (texto.length > 500) {
      mostrarError("contacto-comentario", "Máximo 500 caracteres.");
      formularioValido = false;
    } else {
      limpiarError("contacto-comentario");
    }

    const mensajeFormulario = document.getElementById("mensaje-contacto");
    if (formularioValido) {
      mensajeFormulario.textContent = "¡Gracias! Tu mensaje fue enviado.";
      mensajeFormulario.className = "mensaje-formulario exito";
      formulario.reset();
      if (contador) contador.textContent = "0/500";
    } else {
      mensajeFormulario.textContent = "Revisa los campos marcados en rojo.";
      mensajeFormulario.className = "mensaje-formulario fallo";
    }
  });
}

/* =========================================================
   REGISTRO
   La pauta oficial pide revisar RUN, nombre, apellidos, correo,
   fecha de nacimiento, tipo de usuario, región, comuna y
   dirección, pero no detalla el largo/formato exacto de cada
   uno. Las reglas de abajo son una RECOMENDACIÓN razonable
   (formato chileno estándar), no una exigencia textual del
   documento.
   ========================================================= */

// Comunas de ejemplo por región, para el <select> dependiente.
// RECOMENDACIÓN: se dejó una lista corta a modo de demo; se
// puede ampliar sin tocar el resto del código.
const COMUNAS_POR_REGION = {
  metropolitana: ["La Pintana", "Puente Alto", "Santiago", "Maipú", "Ñuñoa"],
  valparaiso: ["Valparaíso", "Viña del Mar", "Quilpué"],
  biobio: ["Concepción", "Talcahuano", "Los Ángeles"],
};

/**
 * Valida un RUN chileno (formato 12345678-9) usando el
 * algoritmo del dígito verificador módulo 11.
 * RECOMENDACIÓN: se agrega porque el RUN es un dato sensible
 * de identidad y valga la pena verificar su formato real.
 */
function validarRun(runCompleto) {
  const run = runCompleto.replace(/\./g, "").replace(/-/g, "").toUpperCase();
  if (!/^[0-9]{7,8}[0-9K]$/.test(run)) return false;

  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1);

  let suma = 0;
  let multiplicador = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  let dvEsperado = resto.toString();
  if (resto === 11) dvEsperado = "0";
  if (resto === 10) dvEsperado = "K";

  return dv === dvEsperado;
}

function inicializarSelectRegionComuna() {
  const selectRegion = document.getElementById("registro-region");
  const selectComuna = document.getElementById("registro-comuna");
  if (!selectRegion || !selectComuna) return;

  selectRegion.addEventListener("change", () => {
    const comunas = COMUNAS_POR_REGION[selectRegion.value] || [];
    selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';
    comunas.forEach((comuna) => {
      const opcion = document.createElement("option");
      opcion.value = comuna;
      opcion.textContent = comuna;
      selectComuna.appendChild(opcion);
    });
  });
}

function inicializarValidacionRegistro() {
  const formulario = document.getElementById("form-registro");
  if (!formulario) return;

  inicializarSelectRegionComuna();

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    let formularioValido = true;

    const run = document.getElementById("registro-run").value.trim();
    const nombre = document.getElementById("registro-nombre").value.trim();
    const apellidos = document.getElementById("registro-apellidos").value.trim();
    const correo = document.getElementById("registro-correo").value.trim();
    const fechaNacimiento = document.getElementById("registro-fecha").value;
    const tipoUsuario = document.getElementById("registro-tipo").value;
    const region = document.getElementById("registro-region").value;
    const comuna = document.getElementById("registro-comuna").value;
    const direccion = document.getElementById("registro-direccion").value.trim();

    if (run === "" || !validarRun(run)) {
      mostrarError("registro-run", "Ingresa un RUN válido (ej: 12345678-9).");
      formularioValido = false;
    } else {
      limpiarError("registro-run");
    }

    if (nombre === "") {
      mostrarError("registro-nombre", "El nombre es obligatorio.");
      formularioValido = false;
    } else {
      limpiarError("registro-nombre");
    }

    if (apellidos === "") {
      mostrarError("registro-apellidos", "Los apellidos son obligatorios.");
      formularioValido = false;
    } else {
      limpiarError("registro-apellidos");
    }

    if (correo === "" || validarFormatoCorreo(correo)) {
      mostrarError(
        "registro-correo",
        correo === "" ? "El correo es obligatorio." : validarFormatoCorreo(correo)
      );
      formularioValido = false;
    } else {
      limpiarError("registro-correo");
    }

    if (fechaNacimiento === "") {
      mostrarError("registro-fecha", "Selecciona tu fecha de nacimiento.");
      formularioValido = false;
    } else {
      // Edad mínima 13 años (RECOMENDACIÓN, no exigida en el
      // documento oficial, pero razonable para una tienda online).
      const hoy = new Date();
      const nacimiento = new Date(fechaNacimiento);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const noHaCumplidoEsteAno =
        hoy.getMonth() < nacimiento.getMonth() ||
        (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());
      if (noHaCumplidoEsteAno) edad--;

      if (edad < 13) {
        mostrarError("registro-fecha", "Debes tener al menos 13 años para registrarte.");
        formularioValido = false;
      } else {
        limpiarError("registro-fecha");
      }
    }

    if (tipoUsuario === "") {
      mostrarError("registro-tipo", "Selecciona un tipo de usuario.");
      formularioValido = false;
    } else {
      limpiarError("registro-tipo");
    }

    if (region === "") {
      mostrarError("registro-region", "Selecciona una región.");
      formularioValido = false;
    } else {
      limpiarError("registro-region");
    }

    if (comuna === "") {
      mostrarError("registro-comuna", "Selecciona una comuna.");
      formularioValido = false;
    } else {
      limpiarError("registro-comuna");
    }

    if (direccion === "") {
      mostrarError("registro-direccion", "La dirección es obligatoria.");
      formularioValido = false;
    } else {
      limpiarError("registro-direccion");
    }

    const mensajeFormulario = document.getElementById("mensaje-registro");
    if (formularioValido) {
      mensajeFormulario.textContent = "¡Cuenta creada con éxito! Ya puedes iniciar sesión.";
      mensajeFormulario.className = "mensaje-formulario exito";
      formulario.reset();
    } else {
      mensajeFormulario.textContent = "Revisa los campos marcados en rojo.";
      mensajeFormulario.className = "mensaje-formulario fallo";
    }
  });
}

// Cada función revisa si "su" formulario existe en la página
// actual antes de hacer algo, así este mismo archivo se puede
// enlazar en todas las páginas sin generar errores.
document.addEventListener("DOMContentLoaded", () => {
  inicializarValidacionLogin();
  inicializarValidacionContacto();
  inicializarValidacionRegistro();
});
