class Persona{

  constructor(genero, generacion){
    this.genero = genero;
    this.generacion = generacion;
  }
};

padre = new Persona("Masculino", 1);
madre = new Persona("Femenino", 1);

console.log(padre.genero);
console.log(madre.genero);