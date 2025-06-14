// --------------------------------------------------- CLASES --------------------------------------------
class Producto{
  constructor(id, nombre, descripcion, categoria, precio,imagen){
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.categoria = categoria;
      this.precio = precio;
      this.imagen = imagen;
  }
}

class Carrito {
  constructor() {
    this.items = [];
  }

  cargar() {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
    if (carritoStorage) {
      this.items = carritoStorage;
    }
  }

  guardar() {
    localStorage.setItem("carrito", JSON.stringify(this.items));
  }

  agregarProducto(id, cantidad) {
    const index = this.items.findIndex(p => p.producto.id == id);
    if (index != -1) {
      this.items[index].cantidad += cantidad;
    } else {
      const producto = productos.find(p => p.id === id);
      if (producto) {
        this.items.push({
          producto: producto,
          cantidad: cantidad
        });
      }
    }
    this.guardar();
  }
}

// --------------------------------------------------- VARIABLES --------------------------------------------
// Lista de productos
const productos = [
  // ---- PELOTAS ----
  new Producto(1, "Pelota Mikasa V200W", "Pelota oficial FIVB.", "pelota", 25000, ""),
  new Producto(2, "Pelota Molten V5M5000", "Pelota profesional de cuero sintético.", "pelota", 23000, ""),
  new Producto(3, "Pelota Wilson AVP", "Ideal para voley de playa.", "pelota", 21000, ""),
  new Producto(4, "Pelota Mikasa V330W", "Alta durabilidad y control.", "pelota", 19500, ""),
  new Producto(5, "Pelota Penalty MG 3600", "Diseño resistente para entrenamientos.", "pelota", 18000, ""),
  new Producto(6, "Pelota Molten V5M4000", "Excelente calidad-precio.", "pelota", 20000, ""),
  new Producto(7, "Pelota Adidas Court", "Para uso recreativo.", "pelota", 16000, ""),
  new Producto(8, "Pelota Nike Elite", "Liviana y precisa.", "pelota", 17000, ""),
  new Producto(9, "Pelota Baden Soft Touch", "Excelente para principiantes.", "pelota", 15500, ""),
  new Producto(10, "Pelota Gala Pro-Line BV5595S", "Uso profesional.", "pelota", 24500, ""),
  new Producto(11, "Pelota Tarmak V900", "Resistente al desgaste.", "pelota", 16500, ""),
  new Producto(12, "Pelota Molten Flistatec", "Innovadora tecnología de vuelo.", "pelota", 24000, ""),
  new Producto(13, "Pelota Kipsta V100", "Ideal para niños.", "pelota", 12000, ""),
  new Producto(14, "Pelota Voit Training", "Uso escolar o recreativo.", "pelota", 14000, ""),
  new Producto(15, "Pelota Mikasa V200W Replica", "Versión económica de la oficial.", "pelota", 19500, ""),
  new Producto(16, "Pelota Gala BV5591S", "Aprobada por federaciones.", "pelota", 23500, ""),
  new Producto(17, "Pelota Spalding Street VBall", "Uso urbano o outdoor.", "pelota", 15000, ""),
  new Producto(18, "Pelota Decathlon 100", "Bajo costo, buen rendimiento.", "pelota", 10000, ""),
  new Producto(19, "Pelota Mormaii Beach Vball", "Ideal para arena.", "pelota", 14500, ""),
  new Producto(20, "Pelota Puma Basic", "Buena para entrenamientos.", "pelota", 13000, ""),
  new Producto(21, "Pelota Penalty Volei Pro 8.0", "Alta precisión.", "pelota", 19000, ""),
  new Producto(22, "Pelota Umbro Street Vball", "Diseño moderno.", "pelota", 13500, ""),
  new Producto(23, "Pelota Reusch Beach", "Para playas y terrenos blandos.", "pelota", 11000, ""),
  new Producto(24, "Pelota Topper Vball Max", "Entrenamiento diario.", "pelota", 17500, ""),

  // ---- REDES ----
  new Producto(25, "Red Profesional Mikasa", "Uso oficial y federado.", "red", 45000, ""),
  new Producto(26, "Red Entrenamiento Penalty", "Resistente para entrenamientos.", "red", 35000, ""),
  new Producto(27, "Red Recreativa Decathlon", "Fácil de montar.", "red", 30000, ""),
  new Producto(28, "Red Molten ProNet", "Aprobada por federaciones.", "red", 42000, ""),
  new Producto(29, "Red de Playa Wilson", "Especial para outdoor.", "red", 32000, ""),
  new Producto(30, "Red Kipsta Pro", "Uso escolar o clubes.", "red", 28000, ""),
  new Producto(31, "Red Adidas Court", "Estabilidad y resistencia.", "red", 36000, ""),
  new Producto(32, "Red Gala Training", "Alta durabilidad.", "red", 37000, ""),
  new Producto(33, "Red Umbro Basic", "Fácil de transportar.", "red", 25000, ""),
  new Producto(34, "Red Puma Beach", "Uso en arena.", "red", 33000, ""),
  new Producto(35, "Red Spalding Pro", "Sistema reforzado.", "red", 39000, ""),
  new Producto(36, "Red Tarmak Entreno", "Económica y funcional.", "red", 29500, ""),
  new Producto(37, "Red Topper Max", "Diseño adaptable.", "red", 31500, ""),
  new Producto(38, "Red Penalty Pro", "Alta performance.", "red", 41000, ""),
  new Producto(39, "Red Voit Classic", "Para uso recreativo.", "red", 27000, ""),
  new Producto(40, "Red Wilson Competition", "Para campeonatos.", "red", 43000, ""),
  new Producto(41, "Red Gala Beach Pro", "Uso profesional en arena.", "red", 44000, ""),
  new Producto(42, "Red Mormaii Easy", "Montaje simple.", "red", 26000, ""),
  new Producto(43, "Red Nike Club", "Alta resistencia.", "red", 34000, ""),
  new Producto(44, "Red Baden Foldable", "Plegable y portátil.", "red", 30000, ""),
  new Producto(45, "Red Puma Competición", "Para torneos escolares.", "red", 35000, ""),
  new Producto(46, "Red Kipsta School", "Diseño para instituciones.", "red", 27000, ""),
  new Producto(47, "Red Mikasa Oficial", "Uso internacional.", "red", 46000, ""),
  new Producto(48, "Red Reusch Vball", "Material reforzado.", "red", 38000, ""),

  // ---- RODILLERAS ----
  new Producto(49, "Rodilleras Mizuno LR6", "Protección profesional.", "rodilleras", 12000, ""),
  new Producto(50, "Rodilleras Mikasa Elite", "Comodidad total.", "rodilleras", 11500, ""),
  new Producto(51, "Rodilleras Penalty Pro", "Uso diario.", "rodilleras", 11000, ""),
  new Producto(52, "Rodilleras Tarmak 500", "Gran absorción de impacto.", "rodilleras", 9000, ""),
  new Producto(53, "Rodilleras Adidas Match", "Diseño ergonómico.", "rodilleras", 10500, ""),
  new Producto(54, "Rodilleras Nike Court", "Flexibles y livianas.", "rodilleras", 9500, ""),
  new Producto(55, "Rodilleras Wilson Training", "Protección confiable.", "rodilleras", 9800, ""),
  new Producto(56, "Rodilleras Decathlon Easy", "Uso recreativo.", "rodilleras", 8700, ""),
  new Producto(57, "Rodilleras Topper Basic", "Buena relación precio/calidad.", "rodilleras", 8900, ""),
  new Producto(58, "Rodilleras Gala Soft", "Confort y resistencia.", "rodilleras", 10200, ""),
  new Producto(59, "Rodilleras Umbro Shield", "Alta protección lateral.", "rodilleras", 10800, ""),
  new Producto(60, "Rodilleras Puma Court", "Para entrenamientos.", "rodilleras", 9400, ""),
  new Producto(61, "Rodilleras Kipsta JR", "Talla juvenil.", "rodilleras", 8000, ""),
  new Producto(62, "Rodilleras Mormaii Pro", "Diseño anatómico.", "rodilleras", 9700, ""),
  new Producto(63, "Rodilleras Voit Extra", "Para superficies duras.", "rodilleras", 9200, ""),
  new Producto(64, "Rodilleras Spalding Vball", "Estilo profesional.", "rodilleras", 9900, ""),
  new Producto(65, "Rodilleras Reusch Strong", "Alta compresión.", "rodilleras", 9300, ""),
  new Producto(66, "Rodilleras Molten VCare", "Para jugadores frecuentes.", "rodilleras", 9600, ""),
  new Producto(67, "Rodilleras Puma Shield", "Antideslizante.", "rodilleras", 8900, ""),
  new Producto(68, "Rodilleras Kipsta Flex", "Diseño transpirable.", "rodilleras", 8700, ""),
  new Producto(69, "Rodilleras Adidas Training", "Versión ligera.", "rodilleras", 9100, ""),
  new Producto(70, "Rodilleras Nike Zoom", "Con refuerzos laterales.", "rodilleras", 10400, ""),
  new Producto(71, "Rodilleras Gala Advance", "Alta durabilidad.", "rodilleras", 11200, ""),
  new Producto(72, "Rodilleras Mikasa Training", "Diseño tradicional.", "rodilleras", 9800, ""),

  // ---- INDUMENTARIA ----
  new Producto(73, "Camiseta Adidas Vball Pro", "Tejido transpirable y liviano.", "indumentaria", 15000, ""),
  new Producto(74, "Short Nike Court Dry", "Secado rápido y gran comodidad.", "indumentaria", 13500, ""),
  new Producto(75, "Camiseta Mizuno Performance", "Ideal para partidos intensos.", "indumentaria", 14500, ""),
  new Producto(76, "Short Puma Flex", "Diseño deportivo con ajuste perfecto.", "indumentaria", 12500, ""),
  new Producto(77, "Calza Larga Penalty Compresiva", "Soporte muscular y elasticidad.", "indumentaria", 17000, ""),
  new Producto(78, "Camiseta Umbro Breath", "Mayor ventilación y confort.", "indumentaria", 12800, ""),
  new Producto(79, "Short Kipsta Pro", "Ligero y resistente al desgaste.", "indumentaria", 9800, ""),
  new Producto(80, "Top Deportivo Nike Vball", "Sujeción perfecta para entrenamiento.", "indumentaria", 11000, ""),
  new Producto(81, "Camiseta Gala Match Pro", "Diseño oficial de competición.", "indumentaria", 14200, ""),
  new Producto(82, "Short Mikasa Training", "Movilidad total y tela suave.", "indumentaria", 12000, ""),
  new Producto(83, "Musculosa Tarmak Summer", "Ideal para climas cálidos.", "indumentaria", 9500, ""),
  new Producto(84, "Camiseta Reusch AirFit", "Ligera, fresca y cómoda.", "indumentaria", 13200, ""),
  new Producto(85, "Short Topper Basic Vball", "Buen ajuste y precio accesible.", "indumentaria", 8900, ""),
  new Producto(86, "Buzo Adidas Training", "Abrigo liviano para entrada en calor.", "indumentaria", 17500, ""),
  new Producto(87, "Campera Nike WarmUp", "Ideal para antes y después del juego.", "indumentaria", 19500, ""),
  new Producto(88, "Pantalón Largo Puma Club", "Estilo urbano y deportivo.", "indumentaria", 16000, ""),
  new Producto(89, "Camiseta Decathlon Move", "Buena opción para principiantes.", "indumentaria", 9800, ""),
  new Producto(90, "Short Mormaii Sport", "Ligero, con bolsillos laterales.", "indumentaria", 9200, ""),
  new Producto(91, "Top Deportivo Kipsta Fit", "Transpirable y de secado rápido.", "indumentaria", 8700, ""),
  new Producto(92, "Calza Corta Nike Pro", "Ajuste perfecto, ideal para competencia.", "indumentaria", 11400, ""),
  new Producto(93, "Camiseta Voit Training", "Diseño moderno para entrenamientos.", "indumentaria", 10000, ""),
  new Producto(94, "Musculosa Spalding Light", "Para máxima libertad de movimiento.", "indumentaria", 9700, ""),
  new Producto(95, "Campera Gala Vball", "Abrigo técnico para días fríos.", "indumentaria", 18500, ""),
  new Producto(96, "Pantalón Kipsta Warm", "Calidez y confort para invierno.", "indumentaria", 14200, ""),
];

const carrito = new Carrito();
let paginaActual = 1;
const productosPorPagina = 12;

// --------------------------------------------------- MOSTRAR PRODUCTOS --------------------------------------------
//Funcion para mostrar productos
function MostrarProductos(lista) {
  //Obtengo el contenedor
  const divProducto = document.getElementById("divProductos");
  divProducto.innerHTML = "";

  //Por cada producto agrego un elemento div que contiene las cards
  lista.forEach(product => {
    const div = document.createElement("div");
    div.className = "col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4 d-flex justify-content-center text-center";

    div.innerHTML = `<div class="card h-100" style="width: 18rem;">
      <img src="${product.imagen}" class="card-img-top" alt="${product.nombre}">
      <div class="card-body">
        <h5 class="card-title">${product.nombre}</h5>
        <p class="card-text">$${product.precio}</p>
        <p class="text-muted">Código: ${product.id}</p>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProducto" onclick="mostrarDetalle(${product.id})">
          <i class="bi bi-cart-plus"></i>
          Agregar al Carrito
        </div>
      </div>
    </div>`;

    //Agrego la card al contenedor
    divProducto.appendChild(div);
  });

  actualizarContadorCarrito();
}

// --------------------------------------------------- DIVIDIR EN PAGINAS --------------------------------------------
//Funcion para filtrar los productos que van en cada página
function obtenerProductosPorPagina(productos, pagina) {
  const inicio = (pagina - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  return productos.slice(inicio, fin);
}

//Agrego las páginas
function Paginar(productos) {
  //Obtengo el elemento contenedor
  const contenedor = document.getElementById("paginacion");
  contenedor.innerHTML = "";

  //Calculo cuantas paginas tengo en total
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  //Por cada pagina, agrego un elemento li
  for (let i = 1; i <= totalPaginas; i++) {
    const pag = document.createElement("li");
    pag.className = `page-item ${i === paginaActual ? "active" : ""}`;
    pag.innerHTML = `<button class="page-link">${i}</button>`;

    //Creo un evento para que cada vez que hago click, vuelva a llamar a MostrarPorductos para mostrarlos y Paginar para modificar la pagina activa
    pag.addEventListener("click", () => {
      paginaActual = i;
      MostrarProductos(obtenerProductosPorPagina(productos, paginaActual));
      Paginar(productos);
    });

    //Agrego la pagina al contenedor
    contenedor.appendChild(pag);
  }
}

// --------------------------------------------------- FILTROS --------------------------------------------
//Creo funcion para filtrar por categoria
function Filtrar(productos, categoria) {
  if (categoria === "todos") {
    return productos;
  }

  return productos.filter(producto => producto.categoria === categoria);
}
//Agarro el select de las categorias
const filtroTipo = document.getElementById("filtro-tipo");
//Creo el evento para que cuando el usuario cambie la categoria, se filtren los productos
filtroTipo.addEventListener("change", () => {
  const categoriaSeleccionada = filtroTipo.value;
  const productosFiltrados = Filtrar(productos, categoriaSeleccionada);
  paginaActual = 1;
  MostrarProductos(obtenerProductosPorPagina(productosFiltrados, paginaActual));
  Paginar(productosFiltrados);
});

// --------------------------------------------------- DETALLE PRODUCTO --------------------------------------------
//Funcion para mostrar el detalle del producto
function mostrarDetalle(id){
  const producto = productos.find(p => p.id == id);
  const contenedorModal = document.getElementById("modalContenido");
  contenedorModal.innerHTML = "";

  contenedorModal.innerHTML = `<div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">${producto.categoria}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="col-md-12">
                      <img src="${producto.imagen}" class="img-fluid rounded" alt="${producto.nombre}">
                    </div>
                    <div class="col-md-12">
                      <h2>${producto.nombre}</h2>
                      <p class="text-muted">Código: ${producto.id}</p>
                      <h3 class="text-success">$${producto.precio}</h3>
                      <p class="mt-3">${producto.descripcion}</p>
                      <ul class="list-unstyled mb-4">
                        <li><i class="bi bi-truck"></i> Envío gratis a todo el país</li>
                        <li><i class="bi bi-arrow-repeat"></i> Devolución gratis</li>
                      </ul>
                    </div>
            
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
                </div>`

  const modal = new bootstrap.Modal(document.getElementById('modal'));
  modal.show();
}

// --------------------------------------------------- CARRITO --------------------------------------------
// Funcion para cerrar el modal y agregar los productos
function agregarAlCarrito(id) {
  carrito.agregarProducto(id, 1);
  mostrarCarrito();
  actualizarContadorCarrito();

  const modalElemento = document.getElementById('modalProducto');
  const modalBootstrap = bootstrap.Modal.getInstance(modalElemento);
  if (modalBootstrap) {
    modalBootstrap.hide();
  }
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("contadorCarrito");
  const totalProductos = carrito.items.length;

  if (totalProductos > 0) {
    contador.textContent = totalProductos;
    contador.style.display = "inline-block";
  } else {
    contador.textContent = "";
    contador.style.display = "none";
  }
}


//Funcion para sumar o disminuir producto del carrito
function cambiarCantidad(id, cambio) {
  const index = carrito.items.findIndex(p => p.producto.id == id);
  if (index != -1) {
    carrito.items[index].cantidad += cambio;

    if (carrito.items[index].cantidad <= 0) {
      carrito.items.splice(index, 1);
    }
  }
  carrito.guardar();
  mostrarCarrito();
  actualizarContadorCarrito();
}

//Funcion para calcular el total
function calcularTotal(){
  let total = 0;

  carrito.items.forEach(p => {
    total += p.producto.precio * p.cantidad;
  });

  return total;
}

//Funcion para finalizar compra
function finalizarCompra() {
  if(carrito.items.length == 0)
  {
    alert("Aun no ha agregado elementos al carrito");
  }
  else
  {
    alert("Gracias por tu compra!!");
    carrito.items = [];
    carrito.guardar();
    mostrarCarrito();
    actualizarContadorCarrito();
  }
}

//Funcion para mostrar los datos en el carrito
function mostrarCarrito(){
  const productos = JSON.parse(localStorage.getItem("productos"));

  if(productos != null)
  {
    productos.forEach(p => {
      carrito.items.push(p);
    });
  }

  const contenedorCarrito = document.getElementById("carritoContenido");
  contenedorCarrito.innerHTML = "";

  carrito.items.forEach(p => {
    const contenido = document.createElement("div");
    contenido.innerHTML = `
      <div class="card mb-3 position-relative" style="max-width: 100%;">
        <div class="row g-0">
          <div class="col-4 d-flex align-items-center">
            <img src="${p.producto.imagen}" class="img-fluid rounded-start" alt="${p.producto.nombre}" style="max-height: 80px; object-fit: contain;">
          </div>

          <div class="col-8">
            <div class="card-body py-2">
              <h6 class="card-title mb-1">${p.producto.nombre}</h6>

              <div class="d-flex align-items-center">
                <button class="btn btn-outline-secondary btn-sm me-2" onclick="cambiarCantidad(${p.producto.id}, -1)">−</button>
                <span class="me-2">${p.cantidad}</span>
                <button class="btn btn-outline-secondary btn-sm" onclick="cambiarCantidad(${p.producto.id}, 1)">+</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Botón eliminar -->
        <button type="button" class="btn btn-sm position-absolute top-0 end-0 m-2" onclick="cambiarCantidad(${p.producto.id},-${p.cantidad})">
          <i class="bi bi-trash"></i>
        </button>
      </div>`;

    contenedorCarrito.appendChild(contenido);
  });

   const total = document.createElement("div");
    total.className = "text-end fw-bold fs-5 my-3";
    total.textContent = `Total: $${calcularTotal()}`;
    contenedorCarrito.appendChild(total);

    // Botón finalizar compra
    const boton = document.createElement("button");
    boton.className = "btn w-100";
    boton.id = "botonFinalizarCompra";
    boton.textContent = "Finalizar compra";
    boton.onclick = finalizarCompra;
    contenedorCarrito.appendChild(boton);
}

// --------------------------------------------------- INICIALIZACION --------------------------------------------
carrito.cargar();
MostrarProductos(obtenerProductosPorPagina(productos, paginaActual));
Paginar(productos);