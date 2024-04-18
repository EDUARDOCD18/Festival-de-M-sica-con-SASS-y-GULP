/* -- DEPENDENCIAS CSS-- */
const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");

/* DEPENDENCIAS IMÁGENES */
const cache = require("gulp-cache");
const imagenmin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

/* -- Función para compilar el CSS-- */
function css(done) {
  src("src/scss/**/*.scss") // Identificar el archivo de sass
    .pipe(plumber())
    .pipe(sass()) // Compilar sass
    .pipe(postcss([autoprefixer(), cssnano()])) // Mejora código CSS
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

/* -- Función para convertir imágenes a avif -- */
function versionAvif(done) {
  const opciones = {
    quality: 50,
  };

  src("src/img/**/*.{png,jpg}") // Fuente de los archivos
    .pipe(avif(opciones)) // Conversión
    .pipe(dest("build/img")); // Guardar cambios
  done();
}

/* -- Función para los archivos JS --  */
function javascript(done) {
  src("src/js/**/*.js") // Ubica la fuente del JS
    .pipe(dest("build/js")); // Guarda el archivo en destino

  done();
}

/* -- Función para llamar el compilado del CSS -- */
function dev(done) {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);
  done();
}

/* -- Exportaciones o tareas ejecutables -- */
exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);
