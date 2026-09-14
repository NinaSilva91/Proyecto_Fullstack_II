# Proyecto_Fullstack_II
# Tienda Online Secret Sweet Maid

## 1. Información del proyecto

**Proyecto:** Tienda Online Secret Sweet Maid  
**Asignatura:** DSY1104 - Desarrollo Fullstack II  
**Evaluación:** Evaluación Parcial N°1  
**Tecnologías principales:** HTML5, CSS3 y JavaScript  
**Repositorio:** GitHub

---

## 2. Descripción del proyecto

El proyecto consiste en el desarrollo de una tienda online frontend para
Secret Sweet Maid, orientada a la presentación y comercialización de
productos relacionados con la identidad de la comunidad.

La aplicación busca implementar una interfaz web funcional, accesible y
responsiva, utilizando HTML, CSS y JavaScript.

El desarrollo considera la creación de distintas vistas para permitir la
navegación del usuario, visualización de productos, registro e inicio de
sesión, contacto y gestión de un carrito de compras.

Esta primera versión corresponde a la Evaluación Parcial N°1, por lo que
el proyecto constituye una base para el desarrollo de funcionalidades
posteriores.

---

## 3. Objetivos

### Objetivo general

Desarrollar una tienda online frontend utilizando HTML, CSS y JavaScript,
aplicando buenas prácticas de estructura HTML, diseño mediante CSS,
validación de formularios con JavaScript y control de versiones mediante
Git y GitHub.

### Objetivos específicos

- Implementar páginas web utilizando HTML5 semántico.
- Crear una navegación funcional entre las distintas vistas.
- Desarrollar un diseño personalizado mediante CSS externo.
- Implementar un diseño responsivo para diferentes tamaños de pantalla.
- Validar formularios mediante HTML y JavaScript.
- Mostrar mensajes de error y sugerencias personalizados.
- Generar el catálogo de productos mediante JavaScript.
- Implementar un carrito de compras utilizando LocalStorage.
- Aplicar una metodología de trabajo colaborativo mediante Git y GitHub.

---

## 4. Requerimientos funcionales

Los principales requerimientos funcionales considerados para esta versión
del proyecto son los siguientes:

### RF01 - Navegación

El sistema debe permitir navegar entre las diferentes páginas mediante
hipervínculos funcionales.

### RF02 - Página de inicio

La página principal debe presentar información de la tienda, elementos
visuales y productos destacados.

### RF03 - Catálogo de productos

El sistema debe permitir visualizar un listado de productos, mostrando
información como:

- Imagen.
- Nombre.
- Precio.
- Opción para añadir al carrito.

Los productos serán gestionados mediante un arreglo de objetos en
JavaScript.

### RF04 - Detalle de producto

El usuario podrá acceder al detalle de un producto y visualizar
información adicional, además de disponer de la opción para añadirlo al
carrito.

### RF05 - Registro de usuario

El sistema debe disponer de un formulario de registro de usuario,
implementando las validaciones correspondientes mediante JavaScript.

### RF06 - Inicio de sesión

El sistema debe disponer de un formulario de inicio de sesión con
validaciones para correo electrónico y contraseña.

### RF07 - Contacto

El sistema debe disponer de un formulario de contacto para que el usuario
pueda enviar información mediante un formulario validado.

### RF08 - Carrito de compras

El usuario podrá:

- Añadir productos al carrito.
- Visualizar los productos seleccionados.
- Modificar cantidades.
- Eliminar productos.

La información del carrito será almacenada mediante LocalStorage.

### RF09 - Validación de formularios

Los formularios deberán incorporar validaciones que permitan evitar el
ingreso de información incorrecta o incompleta.

Las validaciones deberán generar mensajes claros y personalizados para
orientar al usuario.

---

## 5. Requerimientos no funcionales

### RNF01 - HTML semántico

Las páginas utilizarán una estructura HTML semántica, considerando
elementos como:

- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<footer>`

### RNF02 - Diseño mediante CSS externo

Los estilos serán definidos en archivos CSS externos para facilitar el
mantenimiento y mantener una apariencia consistente entre las páginas.

### RNF03 - Diseño responsivo

La interfaz deberá adaptarse a diferentes tamaños de pantalla,
considerando computadores, tablets y dispositivos móviles.

### RNF04 - Usabilidad

Los formularios deberán entregar mensajes de error y sugerencias claras
para facilitar la interacción del usuario.

### RNF05 - Control de versiones

El desarrollo utilizará Git y GitHub para mantener un historial de cambios,
organizar el trabajo y facilitar la colaboración entre los integrantes
del equipo.

---

## 6. Tecnologías y herramientas

| Tecnología / herramienta | Uso |
|---|---|
| HTML5 | Estructura y semántica del sitio web |
| CSS3 | Diseño, estilos y adaptación responsiva |
| JavaScript | Validaciones, productos y carrito |
| LocalStorage | Persistencia de información del carrito |
| Git | Control de versiones |
| GitHub | Repositorio remoto y colaboración |
| Visual Studio Code | Editor de código |

---

## 7. Estructura de navegación

La propuesta de navegación considera las siguientes vistas:

```text
Inicio
│
├── Productos
│   └── Detalle de producto
│
├── Registro
│
├── Iniciar sesión
│
├── Nosotros
│
├── Blogs
│   ├── Detalle blog 1
│   └── Detalle blog 2
│
└── Contacto
