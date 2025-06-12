//Clases
class Producto{
  constructor(id, nombre, descripcion, precio,imagen){
      this.id = id;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.precio = precio;
      this.imagen = imagen;
  }
}

class Carrito{
  constructor(){
    this.items = [];
  }

  //Funcion para agregar producto
  agregarProducto(producto, cantidad) {
    //Verifico existencia
    const existente = this.items.find(item => item.producto.id == producto.id);
    //Si existe sumo las cantidades
    if (existente) {
      existente.cantidad += cantidad;
    }
    //Si no existe, añado producto al carrito 
    else {
      this.items.push({ producto, cantidad });
    }
  }

  // //Funcion para eliminar producto
  // eliminarProducto(idProducto, cantidad) {
  //   // Busco producto
  //   const item = this.items.find(item => item.producto.id === idProducto);

  //   // Si no está, tiro error
  //   if (!item) {
  //     alert("Ese producto no está en el carrito.");
  //     return;
  //   }

  //   // Verifico si la cantidad a eliminar es mayor a la agregada al carrito y tiro error
  //   if (cantidad > item.cantidad) {
  //     alert(`Error: solo tenés ${item.cantidad} unidad(es) de "${item.producto.nombre}" en el carrito.`);
  //     return;
  //   }

  //   // Si la cantidad a eliminar es igual a la del carrito, elimino el producto del carrito
  //   if (cantidad === item.cantidad) {
  //     const index = this.items.findIndex(i => i.producto.id === idProducto);
  //     if (index !== -1) {
  //       this.items.splice(index, 1);
  //       alert(`Se eliminó completamente "${item.producto.nombre}" del carrito.`);
  //     }
  //   } 
  //   // Si no, le resto la cantidad deseada
  //   else {
  //     item.cantidad -= cantidad;
  //     alert(`Se eliminaron ${cantidad} unidad(es) de "${item.producto.nombre}".`);
  //   }
  // }
}

// Lista de productos
const productos = [
  new Producto(1, "Pelota Mikasa", "descripcion", 25000, ""),
  new Producto(2, "Red profesional", "descripcion", 45000, ""),
  new Producto(3, "Rodilleras Mizuno", "descripcion", 12000, ""),
  new Producto(3, "Rodilleras Mizuno", "descripcion", 12000, ""),
  new Producto(3, "Rodilleras Mizuno", "descripcion", 12000, ""),
  new Producto(3, "Rodilleras Mizuno", "descripcion", 12000, ""),
  new Producto(3, "Rodilleras Mizuno", "descripcion", 12000, ""),
  new Producto(3, "Rodilleras Mizuno", "descripcion", 12000, ""),
  new Producto(3, "Rodilleras Mizuno", "descripcion", 12000, ""),
  new Producto(3, "Rodilleras Mizuno", "descripcion", 12000, ""),
  new Producto(3, "Rodilleras Mizuno", "descripcion", 12000, ""),
  new Producto(3, "Rodilleras Mizuno", "descripcion", 12000, ""),
  new Producto(3, "Rodilleras Mizuno", "descripcion", 12000, ""),
  new Producto(3, "Rodilleras Mizuno", "descripcion", 12000, ""),
  new Producto(3, "Rodilleras Mizuno", "descripcion", 12000, ""),
  new Producto(3, "Rodilleras Mizuno", "descripcion", 12000, ""),
  new Producto(3, "Rodilleras Mizuno", "descripcion", 12000, "")
];

const carrito = new Carrito();
let paginaActual = 1;
const productosPorPagina = 12;

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
        <a href="#" class="btn btn-primary">Agregar al carrito</a>
      </div>
    </div>`;

    //Agrego la card al contenedor
    divProducto.appendChild(div);
  });
}

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

MostrarProductos(obtenerProductosPorPagina(productos, paginaActual));
Paginar(productos);