const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

/* -- Función para compilar el CSS-- */
function css(done) {
  src("src/scss/**/*.scss") // Identificar el archivo de sass
    .pipe(plumber())
    .pipe(sass()) // Compilar sass
    .pipe(dest("build/css")); // Almacenar

  done();
}

/* -- Función para llamar el compilado del CSS -- */
function dev(done) {
  watch("src/scss/**/*.scss", css);
  done();
}

/* -- Exportaciones o tareas ejecutables -- */
exports.css = css;
exports.dev = dev;
