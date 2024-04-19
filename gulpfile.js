/* -- DEPENDENCIAS CSS-- */
const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

/* -- DEPENDENCIAS IMÁGENES -- */
const cache = require("gulp-cache");
const imagenmin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

/* -- DEPENDENCIAS PARA JS -- */
const terser = require("gulp-terser-js");

/* -- FUNCIONES CSS-- */

/* -- Función para compilar el CSS-- */
function css(done) {
  src("src/scss/**/*.scss") // Identificar el archivo de sass
    .pipe(sourcemaps.init()) // Inicia sourmaps
    .pipe(plumber())
    .pipe(sass()) // Compilar sass
    .pipe(postcss([autoprefixer(), cssnano()])) // Mejora código CSS
    .pipe(sourcemaps.write(".")) // Destino de sourcemap
    .pipe(dest("build/css")); // Almacenar
  done();
}

/* -- FUNCIONES PARA IMÁGENES-- */

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

/* -- FUNCIONES JS -- */

/* -- Función para los archivos JS --  */
function javascript(done) {
  src("src/js/**/*.js") // Ubica la fuente del JS
    .pipe(sourcemaps.init()) // Inicia sourcemap
    .pipe(terser()) // Mejora el código JS
    .pipe(sourcemaps.write(".")) // Guarda el sourmap
    .pipe(dest("build/js")); // Guarda el archivo en destino

  done();
}

/* -- FUNCIONES DE COMPILADO -- */

/* -- Función para llamar al compilado -- */
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
