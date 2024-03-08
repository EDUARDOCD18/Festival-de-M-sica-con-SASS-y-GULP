const { src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function css(done) {
  // Identificar el archivo de sass
  // Compilar sass
  // Almacenar
  src("src/scss/app.scss").pipe(sass()).pipe(dest("build/css"));
  done();
}

exports.css = css;
