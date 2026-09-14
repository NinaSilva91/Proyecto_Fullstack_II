/* =========================================================
   LOGIN - SECRET SWEET MAID
   ========================================================= */

function procesarLogin(correo, clave) {

  const mensaje = document.getElementById("mensaje-login");

  /*
   * Usuario administrador de prueba.
   * Estos datos son solamente para la demostración
   * del proyecto, ya que no existe un backend real.
   */
  if (
    correo.toLowerCase() === "admin@gmail.com" &&
    clave === "1234"
  ) {

    localStorage.setItem("usuarioSSM", correo);
    localStorage.setItem("rolSSM", "Admin");

    mensaje.textContent =
      "¡Bienvenida/o administrador/a!";

    mensaje.className =
      "mensaje-formulario exito";

    setTimeout(function () {
      window.location.href = "index.html";
    }, 1000);

    return;
  }


  /*
   * Usuario cliente.
   * Si el correo y contraseña pasaron las
   * validaciones, se guarda como Cliente.
   */
  localStorage.setItem("usuarioSSM", correo);
  localStorage.setItem("rolSSM", "Cliente");

  mensaje.textContent =
    "¡Bienvenida/o a Secret Sweet Maid!";

  mensaje.className =
    "mensaje-formulario exito";

  setTimeout(function () {
    window.location.href = "index.html";
  }, 1000);
}