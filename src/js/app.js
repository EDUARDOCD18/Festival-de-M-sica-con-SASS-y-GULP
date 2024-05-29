document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

/*  -- FUNCIÓN JS PRINCIPAL -- */
function iniciarApp() {
  crearGaleria();
  scrollNav();
  navegacionFija();
  botonIrArriba();
}

/* -- FUNCIONES PARA IMÁGENES-- */

/* -- Función para crear la galería -- */
function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `<source srcset="build/img/thumb/${i}.avif" type="image/avif" />
    <source srcset="build/img/thumb/${i}.webp" type="image/webp" /><img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galería"/>`;

    imagen.onclick = function () {
      mostrarImagen(i);
    };

    galeria.appendChild(imagen);
  }
}

/* -- Imagen en Modal-- */
function mostrarImagen(id) {
  const imagen = document.createElement("picture");
  imagen.innerHTML = `<source srcset="build/img/grande/${id}.avif" type="image/avif" />
    <source srcset="build/img/grande/${id}.webp" type="image/webp" /><img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galería"/>`;

  /* -- Crea el overlay con la imagen */
  const overlay = document.createElement("DIV");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");

  /* -- Función para cerrar el overlay tocando en cualquier parte del mismo */
  overlay.onclick = function () {
    body.appendChild(overlay); // Agrega overlay al body
    body.classList.remove("fijar-body"); // Quita clase al body
    overlay.remove(); // Quita el overlay
  };

  /* -- Botón para cerrar el modal */
  const cerrarModal = document.createElement("P");
  cerrarModal.textContent = "X";
  cerrarModal.classList.add("btn-cerrar");

  /* -- Función para cerrar el overlay haciendo click en el botón cerrar */
  cerrarModal.onclick = function () {
    body.appendChild(overlay); // Agrega overlay al body
    body.classList.remove("fijar-body"); // Quita clase al body
    overlay.remove(); // Quita el overlay
  };

  overlay.appendChild(cerrarModal);

  /* -- Añadir al HTML -- */
  const body = document.querySelector("body");
  body.appendChild(overlay);
  body.classList.add("fijar-body");
}

/* -- FUNCIONES PARA NAVEGACION --*/

/* -- Función para la navegación fija -- */
function navegacionFija() {
  const barra = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");
  const body = document.querySelector("body");

  window.addEventListener("scroll", function () {
    if (sobreFestival.getBoundingClientRect().bottom < 0) {
      barra.classList.add("fijo");
      body.classList.add("header-fijo"); // Aplica el padding-top cuando el header es fijo
    } else {
      barra.classList.remove("fijo");
      body.classList.remove("header-fijo"); // Remueve el padding-top cuando el header no es fijo
    }
  });
}

/* -- Función para el scroll--  */
function scrollNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal a");
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();

      const seccionScroll = e.target.attributes.href.value;
      const seccionScroll2 = "." + seccionScroll.substr(1);
      const seccion = document.querySelector(seccionScroll2);
      seccion.scrollIntoView({ behaviour: "smooth" });
    });
  });
}

function botonIrArriba() {
  const btnVolverArriba = document.getElementById("volverArriba");
  const sobreFestival = document.querySelector(".sobre-festival");

  // Verifique la posición de desplazamiento y el botón mostrar/ocultar
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY; // GObtener la posición de desplazamiento actual
    if (sobreFestival.getBoundingClientRect().bottom < 0) {
      // Mostrar botón después de desplazarse por debajo de .sobre-festival
      btnVolverArriba.classList.add("visible");
    } else {
      btnVolverArriba.classList.remove("visible");
    }
  });

  // Agregar funcionalidad al hacer clic en el botón
  btnVolverArriba.addEventListener("click", function () {
    // desplácese hacia arriba sin problemas
    document.documentElement.scrollTop = 0;
  });
}
