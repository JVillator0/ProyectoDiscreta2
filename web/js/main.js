Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var app = new Vue({
    el: "#app",
    data: {
        simulacion_iniciada: false,
        parqueos: {}
    },
    mounted() {
        this.crearParqueo();
    },
    methods: {
        crearParqueo: function(){
            var abajo = {identidad: 'parqueo', imagen: null, bg: 'parqueo-abajo.png'};
            var calle = {identidad: 'calle', imagen: null, bg: 'calle.png'};
            var arriba = {identidad: 'parqueo', imagen: null, bg: 'parqueo-arriba.png'};

            var coche_abajo = {identidad: 'coche', imagen: 'coche-abajo.png', bg: 'parqueo-abajo.png'};

            for (let i = 0; i < 12; i++) {
                this.$set(this.parqueos, Object.size(this.parqueos), abajo);
            }
            
            for (let i = 0; i < 12; i++) {
                this.$set(this.parqueos, Object.size(this.parqueos), calle);
            }
            
            this.$set(this.parqueos, Object.size(this.parqueos), calle);
            for (let i = 0; i < 10; i++) {
                this.$set(this.parqueos, Object.size(this.parqueos), arriba);
            }
            this.$set(this.parqueos, Object.size(this.parqueos), calle);

            this.$set(this.parqueos, 1, coche_abajo);
            this.$set(this.parqueos, 3, coche_abajo);
            this.$set(this.parqueos, 6, coche_abajo);
            this.$set(this.parqueos, 10, coche_abajo);
            
        },

        verificar: function(identidad){
            return identidad == 'coche';
        },
    },
});