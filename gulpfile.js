const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function css(done) {
  src("src/scss/**/*.scss") // Identificar el archivo de sass
    .pipe(sass()) // Compilar sass
    .pipe(dest("build/css")); // Almacenar

  done();
}

function dev(done) {
  watch("src/scss/**/*.scss", css);
  done();
}

// Exportaciones o tareas ejecutables
exports.css = css;
exports.dev = dev;
