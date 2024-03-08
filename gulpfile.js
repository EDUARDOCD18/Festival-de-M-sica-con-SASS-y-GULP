/* gulp se utiliza para automatizar tareas */
function tarea(done) {
  console.log("Mi primera tarea");

  done()
}

// Gulp requiere node.js para funcionar
exports.tarea = tarea;
