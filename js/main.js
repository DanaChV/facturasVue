Number.prototype.formatMoney = function(c, d, t){
	var n = this,
		c = isNaN(c = Math.abs(c)) ? 2 : c,
		d = d == undefined ? "." : d,
		t = t == undefined ? "," : t,
		s = n < 0 ? "-" : "",
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
		j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

new Vue({
	el: '#app',
	data: {
		productos: [
			{
				'producto': 1,
				'descripcion': 'angular.js',
				'precio': '11391.86'
			},
			{
				'producto': 2,
				'descripcion': 'React.js',
				'precio': '9772.01'
			},
			{
				'producto': 3,
				'descripcion': 'Meteor.js',
				'precio': '16593.02'
			},
			{
				'producto': 4,
				'descripcion': 'Moment.js',
				'precio': '10418.63'
			},
			{
				'producto': 5,
				'descripcion': 'jQuery.js',
				'precio': '10312.71'
			},
			{
				'producto': 6,
				'descripcion': 'Foundation.js',
				'precio': '9840.61'
			},
			{
				'producto': 7,
				'descripcion': 'BackBone.js',
				'precio': '17706.35'
			},
			{
				'producto': 8,
				'descripcion': 'Modernizr',
				'precio': '18955.56'
			},
			{
				'producto': 9,
				'descripcion': 'Video.js',
				'precio': '16196.34'
			},
			{
				'producto': 10,
				'descripcion': 'Ember.js',
				'precio': '11802.00'
			}
		],
		usuarios: [
			{usuario: 'admin', contrasena: 'admin'},
			{usuario: 'rene', contrasena: 'mi5pacuando'}
		],
		tienda: {
			productoSeleccionado: {
				producto: '',
				cantidad: 1
			},
			productosAgregados: []
		},
		img: {
    		imagen: "https://images.pexels.com/photos/326424/pexels-photo-326424.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    		imagen2: "http://www.stickpng.com/assets/images/58482acecef1014c0b5e4a1e.png",
    		imagen3: "https://image.flaticon.com/icons/svg/306/306236.svg"
  		},
		login: {
			usuario: '',
			contrasena: '',
			validado: false,
			mensaje: {
				texto: 'Introduzca sus datos para ingresar',
				clase: 'default'
			}
		}
	},
	methods: {
		agregarLinea: function(){
			var productoSeleccionado = this.tienda.productoSeleccionado,
			existe = this.tienda.productosAgregados.find(function(el){
				return el.producto == productoSeleccionado.producto;
			});

			if(!existe){
				this.tienda.productosAgregados.push({
					producto: productoSeleccionado.producto,
					descripcion: productoSeleccionado.descripcion,
					precio: productoSeleccionado.precio,
					cantidad: productoSeleccionado.cantidad
				});
			}else{
				var lineaFactura = this.tienda.productosAgregados.find(function(el){
					if(el.producto == productoSeleccionado.producto){
						return el.cantidad;
					}
				});

				lineaFactura.cantidad = parseInt(lineaFactura.cantidad) +
					parseInt(productoSeleccionado.cantidad);
			}
		},
		infoProductoSeleccionado: function(){
			var producto = this.tienda.productoSeleccionado.producto;

			if(producto){
				info = this.productos.find(function(linea){
					if(linea.producto == producto){
						return linea;
					}
				});

				this.tienda.productoSeleccionado.descripcion = info.descripcion;
				this.tienda.productoSeleccionado.precio = info.precio;
			}
		},
		eliminarLinea: function(indice){
			this.tienda.productosAgregados.splice(indice, 1);

		},
		validarUsuario: function(){
			var login = this.login;

			var elUsuarioExiste = this.usuarios.find(function(el){
				if(el.usuario == login.usuario && el.contrasena == login.contrasena){
					return true;
				}
			});

			if(elUsuarioExiste){
				this.login.validado = true;
				this.login.mensaje.texto = 'Introduzca sus datos para ingresar';
				this.login.mensaje.clase = 'default';
			}else{
				this.login.mensaje.texto = 'Datos invalidos, verifique su usuario y/o contraseña';
				this.login.mensaje.clase = 'danger';
			}
		}
	},
	computed: {
		totalLineas: function(){
			var total = 0;

			this.tienda.productosAgregados.forEach(function(el){
				total += el.cantidad * el.precio;
			});

			return (total).formatMoney(2, '.', ',');
		}
	}
});

var taskApp = new Vue({
        el: '#taskApp',
        data: {
          tasks: [
            {
              title: 'Pasar Web',
              done: true
            },
            {
              title: 'Bañar a Zeus',
              done: false
            },
            {
              title: 'Comprar la comida de Michi',
              done: false
            }
          ]
        },
        methods: {
          addTask: function (e) {
            e.preventDefault();
            this.tasks.push({
              title: this.tasks.title,
              done: false
            });
          this.tasks.title = '';
          },
          deleteTask: function (task) {
            this.tasks.splice(
              this.tasks.indexOf(task),
              1
            )
          }
        }
      });