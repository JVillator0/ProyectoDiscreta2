$( document ).ready(function() {
    $('select').formSelect();
    obtenerCaso();
});

function obtenerCaso(){
  var casos = [
    caso1 = {
      nombre: "Caso 1",
      probabilidad: 5,
    },
    caso2 = {
      nombre: "Caso 2",
      probabilidad: 45,
    },
    caso3 = {
      nombre: "Caso 3",
      probabilidad: 50,
    },
  ];
  var caso_seleccionado = calcularProbabilidad(casos);
  console.log(caso_seleccionado);
}

function calcularProbabilidad(casos){
  var probabilidad = [];
  casos.forEach(element => {
    for (var i = 0; i < element.probabilidad; i++) {
      probabilidad.push(element.nombre);
    }
  });
  var seleccion = Math.floor(Math.random() * 100);
  return probabilidad[seleccion];
}


/**
 * EL COLOR NEGRO ES DOMINANTE 
 * 
 */