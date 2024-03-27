// CSS
const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

// Imágenes
const cache = require("gulp-cache");
const imagenmin = require("gulp-imagemin");
const webp = require("gulp-webp");

/* -- Función para compilar el CSS-- */
function css(done) {
  src("src/scss/**/*.scss") // Identificar el archivo de sass
    .pipe(plumber())
    .pipe(sass()) // Compilar sass
    .pipe(dest("build/css")); // Almacenar
  done();
}

/* -- Función para reducir imágenes -- */
function imagenes(done) {
  const opciones = {
    optimizationLevel: 3,
  };

  src("src/img/**/*.{png,jpg}") // Fuente de los archivos
    .pipe(cache(imagenmin(opciones))) // Reducción de imágenes
    .pipe(dest("build/img")); // Destino de las imágenes
  done();
}

/* -- Función para convertir imágenes a webp -- */
function versionWebp(done) {
  const opciones = {
    quality: 50,
  };

  src("src/img/**/*.{png,jpg}") // Fuente de los archivos
    .pipe(webp(opciones)) // Conversión
    .pipe(dest("build/img")); // Guardar cambios
  done();
}

/* -- Función para llamar el compilado del CSS -- */
function dev(done) {
  watch("src/scss/**/*.scss", css);
  done();
}

/* -- Exportaciones o tareas ejecutables -- */
exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.dev = parallel(imagenes, versionWebp, dev);
