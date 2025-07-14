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
      const producto = productosCargados.find(p => p.id === id);
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

// --------------------------------------------------- DATA --------------------------------------------
//Conexión a JSON
const URL = "./db/data.json"

function obtenerData()
{
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      productosCargados = data
      MostrarProductos(data)
      Paginar(data)
    })
    .catch((error) => {
      document.body.innerHTML = `<div class="container-fluid d-flex justify-content-center align-items-center vh-100">
                                    <div class="row text-center">
                                      <div class="col-12">
                                        <h1>ERROR 404</h1>
                                      </div>
                                      <div class="col-12">
                                        <p>PAGE NOT FOUND</p>
                                      </div>
                                    </div>
                                  </div>`;
    })
}

const carrito = new Carrito();
let paginaActual = 1;
const productosPorPagina = 12;

// --------------------------------------------------- MOSTRAR PRODUCTOS --------------------------------------------
obtenerData()
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
  const productosFiltrados = Filtrar(productosCargados, categoriaSeleccionada);
  paginaActual = 1;
  MostrarProductos(obtenerProductosPorPagina(productosFiltrados, paginaActual));
  Paginar(productosFiltrados);
});

// --------------------------------------------------- DETALLE PRODUCTO --------------------------------------------
//Funcion para mostrar el detalle del producto
function mostrarDetalle(id){
  const producto = productosCargados.find(p => p.id == id);
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
  console.log(id)
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
    Swal.fire({
      title: "Carrito Vacío",
      text: "Por favor agregue productos al carrito antes de finalizar su compra!",
      icon: "error",
      showClass: {
        popup: `
          animate__animated
          animate__zoomIn
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__zoomOut
        `
      },
      confirmButtonText: `<i class="bi bi-arrow-clockwise"></i> Volver`
    });
  }
  else
  {
    mostrarCompraFinal();
  }
}

//Funcion para mostrar formulario de pago
function mostrarCompraFinal(){
  const contenedorModalCompra = document.getElementById("modalContenidoCompra");
  contenedorModalCompra.innerHTML = "";

  contenedorModalCompra.innerHTML = `<div class="modal-header">
                                      <h1 class="modal-title fs-5" id="staticBackdropLabel">Datos de Pago</h1>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>

                                    <div class="modal-body">
                                      <!-- Formulario visual de pago -->
                                      <form id="formularioPago">
                                        <div class="mb-3">
                                          <label for="numeroTarjeta" class="form-label">Número de Tarjeta</label>
                                          <input type="text" class="form-control" id="numeroTarjeta" placeholder="1234 5678 9012 3456">
                                        </div>

                                        <div class="mb-3">
                                          <label for="nombreTitular" class="form-label">Nombre del Titular</label>
                                          <input type="text" class="form-control" id="nombreTitular" placeholder="Juan Pérez">
                                        </div>

                                        <div class="row">
                                          <div class="col-md-6 mb-3">
                                            <label for="vencimiento" class="form-label">Fecha de Vencimiento</label>
                                            <input type="month" class="form-control" id="vencimiento">
                                          </div>

                                          <div class="col-md-6 mb-3">
                                            <label for="codigoSeguridad" class="form-label">Código de Seguridad</label>
                                            <input type="password" class="form-control" id="codigoSeguridad" placeholder="123" maxlength="4">
                                          </div>
                                        </div>
                                      </form>
                                    </div>

                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                      <button type="button" class="btn btn-success" onclick="compraFinalizada()">Confirmar Pago</button>
                                    </div>

`

  const modal = new bootstrap.Modal(document.getElementById('modalFinalCompra'));
  modal.show();
}

function compraFinalizada()
{
  Swal.fire({
      title: "Su compra se ha realizado con éxito!!",
      icon: "success",
      showClass: {
        popup: `
          animate__animated
          animate__zoomIn
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__zoomOut
        `
      },
      confirmButtonText: `<i class="bi bi-check2"></i> Ok`
    });

    carrito.items = [];
    carrito.guardar();
    mostrarCarrito();
    actualizarContadorCarrito();

    const modalElemento = document.getElementById('modalFinalCompra');
    const modalBootstrap = bootstrap.Modal.getInstance(modalElemento);
    if (modalBootstrap) {
      modalBootstrap.hide();
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