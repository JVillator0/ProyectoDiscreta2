var cantidad_circulos = 0;
var contador_circulos = 0;
var circulos = [];
var puntajes = [];
var dardos = [];
var acum_puntajes = [];
var cont_puntajes = [];
var dibujar = true;

var circle;
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

$(document).ready(function(){
  $('#mdl_inicio').modal('show');
  initCanvas();
});

canvas.addEventListener('click', function(evt) {
  if(dibujar){
    var mousePos = getMousePos(canvas, evt);

    mousePos.x -= 1;
    mousePos.x -= 1;

    drawCircle(mousePos);
  }
}, false);

$("#btn_iniciar").on('click', function(){
  var temp_cantidad_circulos = $("#inpt_num_circulos").val();
  if(temp_cantidad_circulos != null && temp_cantidad_circulos != ''){
    if(!isNaN(temp_cantidad_circulos)){
      if(temp_cantidad_circulos > 1){
        cantidad_circulos = temp_cantidad_circulos;
        $('#mdl_inicio').modal('hide');
        $("#count_clicks").html(cantidad_circulos - contador_circulos);
      }else{
        alert("Digite un numero mayor a 1");
      }
    }else{
      alert("Digite un numero");
    }
  }else{
      alert("Digite un valor");
  }
});

$("#btn_puntajes").on('click', function(){
  var temp_puntajes = $("#inpt_puntajes_circulos").val().trim();
  var temp_arr_puntajes = temp_puntajes.split(",");
  if(temp_arr_puntajes.length == cantidad_circulos){
    $('#mdl_puntajes').modal('hide');
    for (let i = circulos.length - 1; i >= 0; i--){
      
      context.font = "13px Comic Sans MS";
      if(((i+1)%2)==0){
        context.fillStyle = 'white';
      }else{
        context.fillStyle = 'black';
      }
      context.textAlign = "center";

      var mdy=circulos[i];
      if(circulos[i-1] !=null){
        mdy = (circulos[i]-circulos[i-1])/2
      }
      context.fillText(temp_arr_puntajes[i], 1200/2, (720/2)-circulos[i]+mdy);
    }
    puntajes = temp_arr_puntajes;
    calcularProbabilidad();
    $("#btn_lanzar").removeAttr("disabled");
  }else{
    alert('La cantidad de puntajes no concuerda con la cantidad de circulos creados');
  }
});

$("#btn_lanzar").on('click', function(){
  lanzarDardo();
});

function lanzarDardo(){
  var x_min = (1200/2 - circulos[circulos.length-1]);
  var x_max = (1200/2 + circulos[circulos.length-1]);
  
  var y_min = (720/2 - circulos[circulos.length-1]);
  var y_max = (720/2 + circulos[circulos.length-1]);

  do{
    var y = Math.random() * (y_max - y_min) + y_min;
    var x = Math.random() * (x_max - x_min) + x_min;
    var distancia = distanciaPuntos(x, y);
  }while(circulos[circulos.length - 1] < distancia);
  
  dardos.push(distancia);
  asignarPuntaje();
  
  context.font = "20px Comic Sans MS";
  context.fillStyle = 'yellow';
  context.textAlign = "center";
  context.fillText("X", x, y);
}

function asignarPuntaje(){
  acum_puntajes = [];
  for (let i = 0; i < dardos.length; i++) {
    var dardo = dardos[i];
    for (let j = 0; j < circulos.length; j++) {
      var circulo = circulos[j];
      if(dardo > (circulos[j-1] != undefined ? circulos[j-1] : 0) && dardo < circulos[j]){
        var puntaje = parseFloat(puntajes[j]);
        acum_puntajes.push(puntaje);
      }
    }
  }

  cont_puntajes = [];
  for (let k = 0; k < puntajes.length; k++) {
    for (let h = 0; h < acum_puntajes.length; h++) {
      if(parseFloat(puntajes[k]) == acum_puntajes[h]){
        if(cont_puntajes[k] == undefined) { cont_puntajes[k] = 0; }
        cont_puntajes[k]++;
      }
    }
  }

  print = "";
  for (let g = 0; g < cont_puntajes.length; g++) {
    if(cont_puntajes[g] != undefined){
      print += "<b>" + puntajes[g] + " punto "+ ( puntajes[g] == 1 ? "s" : "" ) +" </b> acertado: " + cont_puntajes[g] + " veces <br>";
    }
  }
  print += "<b>dardos lanzados: </b>" + dardos.length + "<br>" ;
  $("#puntajes").html(print);
}

function distanciaPuntos(x, y){
  return Math.sqrt(Math.pow(x - 1200/2, 2) + Math.pow(y - 720/2, 2));
}

function calcularProbabilidad(){
  var print = "";
  var total_probabilidad = 0;
  var total_porcentaje = 0;
  var total_porcentaje_round = 0;
  var area_total = Math.PI*Math.pow(circulos[circulos.length-1],2);
  for (let i = 0; i < circulos.length; i++) {
    let area_anterior = (circulos[i-1] != undefined ? Math.PI*Math.pow(circulos[i-1],2) : 0);
    let area_actual = Math.PI*Math.pow(circulos[i],2);
    let area_favorable = parseFloat(area_actual) - parseFloat(area_anterior);
    let probabilidad = parseFloat(area_favorable)/parseFloat(area_total);
    let porcentaje = parseFloat(probabilidad) * 100;
    let porcentaje_round = parseFloat(porcentaje).toFixed(2);
    print += "<b>"+porcentaje_round+"%</b> de obtener " + puntajes[i] + " puntos. <br>";

    total_probabilidad += parseFloat(probabilidad);
    total_porcentaje += parseFloat(porcentaje);
    total_porcentaje_round += parseFloat(porcentaje_round);
  }
  total_porcentaje_round = total_porcentaje_round.toFixed(2);
  print += "<b>Total: </b> "+total_porcentaje_round+"%";
  $("#probabilidades").append(print);
}

function drawCircle(mousePos){
  var x = 1200; 
  var y = 720; 
  var px = x/2;
  var py = y/2;
  var radio = Math.sqrt( Math.pow((mousePos.x-px),2) + Math.pow((mousePos.y-py),2));
  if(radio <= 359){
    contador_circulos++;

    $("#count_clicks").html(cantidad_circulos - contador_circulos);

    
    circulos.push(radio);
    circulos.sort(function(a, b){return a-b});

    circle.beginPath();
    circle.arc(px,py,radio,0,radianes(360),true);
    circle.stroke();

    if(contador_circulos >= cantidad_circulos){
      $("#cont_clicks").remove();
      dibujar = false;
      $("#mdl_puntajes").modal('show');

      for (let i = circulos.length - 1; i >= 0; i--) {
        let tem_circle = circulos[i];
        
        circle.beginPath();
        circle.arc(px,py, tem_circle , 0,radianes(360),true);
        if(i == 0){ circle.fillStyle = 'red'; }else{
          if((i%2)==0){
            circle.fillStyle = 'white';
          }else{
            circle.fillStyle = 'black';
          }
        }
        circle.fill();
        circle.lineWidth = 1;
        if(i == 0){ circle.strokeStyle = '#FF0202'; }else{
          if((i%2)==0){
            circle.strokeStyle = '#FFF';
          }else{
            circle.strokeStyle = '#000';
          }
        }
        circle.stroke();
      }
    }
  }
}

function radianes(grados){
  var radianes = (Math.PI/180)*grados;
  return radianes;
}

function getMousePos(canvas, evt) {
  return {
    x: evt.clientX,
    y: evt.clientY
  };
}

function initCanvas(){
  circle = canvas.getContext('2d');
  context.lineWidth = 2;
  context.stroke();
}