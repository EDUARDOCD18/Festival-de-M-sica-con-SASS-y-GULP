document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  crearGaleria();
}

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
