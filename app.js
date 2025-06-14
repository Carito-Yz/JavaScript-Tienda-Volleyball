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
  new Producto(1, "Pelota Mikasa V200W", "Pelota oficial FIVB.", "pelota", 25000, "./img/pelota-mikasa-v200w.png"),
  new Producto(2, "Pelota Molten V5M5000", "Pelota profesional de cuero sintético.", "pelota", 23000, "./img/pelota-molten- v5m5000.jpg"),
  new Producto(3, "Pelota Wilson AVP", "Ideal para voley de playa.", "pelota", 21000, "./img/pelota-wilson-avp.jpg"),
  new Producto(4, "Pelota Mikasa V330W", "Alta durabilidad y control.", "pelota", 19500, "./img/pelota-mikasa-v330w.jpg"),
  new Producto(5, "Pelota Molten Cocida MS500-P3S", "Diseño resistente para entrenamientos.", "pelota", 18000, "./img/pelota-molten-cocida-ms500-p3s.jpg"),
  new Producto(6, "Pelota Molten V5M4000", "Excelente calidad-precio.", "pelota", 20000, "./img/pelota-molten- v5m4000.jpg"),
  new Producto(7, "Pelota Reebok Soft Touch", "Para uso recreativo.", "pelota", 16000, "./img/pelota-rebook-soft-touch-2.jpg"),
  new Producto(8, "Pelota Nike Elite", "Liviana y precisa.", "pelota", 17000, "./img/pelota-nike-all-court.jpg"),
  new Producto(9, "Pelota Dribbling Soft Touch", "Excelente para principiantes.", "pelota", 15500, "./img/pelota-dribbling-soft-touch.jpg"),
  new Producto(10, "Pelota Gala Pro-Line BV5595S", "Uso profesional.", "pelota", 24500, "./img/pelota-gala-bv5595s.jpg"),

  // ---- RODILLERAS ----
  new Producto(11, "Rodilleras Mizuno LR6 Negras", "Protección profesional.", "rodilleras", 12000, "./img/rodilleras-mizuno-lr6-negras.jpg"),
  new Producto(12, "Rodilleras Mizuno LR6 Negras", "Comodidad total.", "rodilleras", 11500, "./img/rodilleras-mizuno-lr6-blancas.jpg"),
  new Producto(13, "Rodilleras Penalty Pro", "Uso diario.", "rodilleras", 11000, "./img/penalty-5.jpg"),
  new Producto(14, "Rodilleras DRB", "Gran absorción de impacto.", "rodilleras", 9000, "./img/rodilleras-drb.jpeg"),
  new Producto(15, "Rodilleras Adidas Match", "Diseño ergonómico.", "rodilleras", 10500, "./img/rodilleras-adidas-match.jpg"),
  new Producto(16, "Rodilleras Nike Court", "Flexibles y livianas.", "rodilleras", 9500, "./img/rodilleras-nike-court.jpg"),
  new Producto(17, "Rodilleras Wilson Training", "Protección confiable.", "rodilleras", 9800, "./img/rodilleras-wilson.jpg"),
  new Producto(18, "Rodilleras ALLSIX", "Uso recreativo.", "rodilleras", 8700, "./img/rodilleras-allsix.jpg"),
  new Producto(19, "Rodilleras Striker", "Buena relación precio/calidad.", "rodilleras", 8900, "./img/rodilleras-striker.png"),
  new Producto(20, "Rodilleras NassaU", "Confort y resistencia.", "rodilleras", 10200, "./img/rodilleras-nassau.jpg"),
  new Producto(21, "Rodilleras Proyec", "Comodidad total.", "rodilleras", 11500, "./img/rodilleras-proyec.jpg"),

  // ---- INDUMENTARIA ----
  new Producto(22, "Short Mizuno Mujer", "Tejido transpirable y liviano.", "indumentaria", 15000, "./img/short-mujer-mizuno.png"),
  new Producto(23, "Short Nike Court Dry", "Secado rápido y gran comodidad.", "indumentaria", 13500, "./img/short-nike-dry-7.jpg"),
  new Producto(24, "Camiseta Mizuno Performance", "Ideal para partidos intensos.", "indumentaria", 14500, "./img/camiseta-mizuno-performance.jpg"),
  new Producto(25, "Short Puma Flex", "Diseño deportivo con ajuste perfecto.", "indumentaria", 12500, "./img/short-puma-flex.jpeg"),
  new Producto(26, "Calza Larga Penalty Compresiva", "Soporte muscular y elasticidad.", "indumentaria", 17000, "./img/calza-larga-compresiva.png"),
  new Producto(27, "Camiseta High Runner", "Mayor ventilación y confort.", "indumentaria", 12800, "./img/camiseta-high-runner.png"),
  new Producto(28, "Camiseta Termica Montero", "Ligero y resistente al desgaste.", "indumentaria", 9800, "./img/camiseta-termica-montero.jpg"),
  new Producto(29, "Top Deportivo Nike Vball", "Sujeción perfecta para entrenamiento.", "indumentaria", 11000, "./img/top-deportivo-nike.png"),
  new Producto(30, "Musculosa Reusch Hombre", "Diseño oficial de competición.", "indumentaria", 14200, "./img/musculosa-reusch-hombre.png"),
  new Producto(31, "Short Mikasa Training", "Movilidad total y tela suave.", "indumentaria", 12000, "./img/short-mikasa.png"),
  new Producto(32, "Musculosa Nike Mujer", "Ideal para climas cálidos.", "indumentaria", 9500, "./img/musculosa-nike-mujer.png")
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
                    <div class="col-md-12 mb-4">
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