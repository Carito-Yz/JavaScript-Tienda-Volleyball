// Clase Producto
class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
}

// Clase Carrito
class Carrito {
  constructor() {
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

    //Muestro movimiento por consola
    console.log(`${cantidad} x ${producto.nombre} fue agregado al carrito.`);
  }

  //Funcion para eliminar producto
  eliminarProducto(idProducto, cantidad) {
    // Busco producto
    const item = this.items.find(item => item.producto.id === idProducto);

    // Si no está, tiro error
    if (!item) {
      alert("Ese producto no está en el carrito.");
      return;
    }

    // Verifico si la cantidad a eliminar es mayor a la agregada al carrito y tiro error
    if (cantidad > item.cantidad) {
      alert(`Error: solo tenés ${item.cantidad} unidad(es) de "${item.producto.nombre}" en el carrito.`);
      return;
    }

    // Si la cantidad a eliminar es igual a la del carrito, elimino el producto del carrito
    if (cantidad === item.cantidad) {
      const index = this.items.findIndex(i => i.producto.id === idProducto);
      if (index !== -1) {
        this.items.splice(index, 1);
        alert(`Se eliminó completamente "${item.producto.nombre}" del carrito.`);
      }
    } 
    // Si no, le resto la cantidad deseada
    else {
      item.cantidad -= cantidad;
      alert(`Se eliminaron ${cantidad} unidad(es) de "${item.producto.nombre}".`);
    }
  }

  //Funcion para calcular el total de compra
  calcularTotal() {
    let total = 0;
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      total += item.producto.precio * item.cantidad;
    }
    return total;
  }

  //Funcion para mostrar los datos de la compra
  mostrarResumen() {
    //Verifico si el carrito esta vacio
    if (this.items.length === 0) {
      return "Tu carrito está vacío.";
    }

    //Si no, muestro el resumen
    let resumen = "Productos en tu carrito:\n";
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      resumen += `${i + 1}. ${item.producto.nombre} - $${item.producto.precio} x ${item.cantidad} = $${item.producto.precio * item.cantidad}\n`;
    }
    resumen += `\nTotal: $${this.calcularTotal()}`;
    return resumen;
  }
}

// Lista de productos
const productos = [
  new Producto(1, "Pelota Mikasa", 25000),
  new Producto(2, "Red profesional", 45000),
  new Producto(3, "Rodilleras Mizuno", 12000)
];

// Carrito
const carrito = new Carrito();

// Mostrar productos
function mostrarProductos() {
  let mensaje = "Catálogo de productos:\n";
  for (let i = 0; i < productos.length; i++) {
    const p = productos[i];
    mensaje += `${p.id}. ${p.nombre} - $${p.precio}\n`;
  }
  mensaje += "\nElegí un producto por su número:";
  return mensaje;
}

// Iniciar compra
function iniciarCompra() {
  let continuar = true;
  while (continuar) {
    const accion = prompt("¿Qué querés hacer?\n1. Agregar producto\n2. Eliminar producto\n3. Finalizar compra");

    //Accion añadir producto
    if (accion == "1") {
      const input = prompt(mostrarProductos());
      //Busco el producto
      const prod = productos.find(p => p.id == parseInt(input));

      //Si lo encuentro, continuo con la compra
      if (prod != null) {
        const cantidad = parseInt(prompt(`¿Cuántas unidades de "${prod.nombre}" querés comprar?`));
        //Verifico que la cantidad ingresada sea válida
        if (!isNaN(cantidad) && cantidad > 0) {
          carrito.agregarProducto(prod, cantidad);
        } else {
          alert("Cantidad inválida.");
        }
      } else {
        alert("Producto no encontrado.");
      }
    }

    //Accion eliminar producto
    else if (accion == "2") {
      //Verifico si el carrito esta vacío
      if (carrito.items.length == 0) {
        alert("El carrito está vacío.");
      } 
      else {
        const inputId = parseInt(prompt(carrito.mostrarResumen() + "\n\n¿Qué producto querés eliminar? Ingresá el ID:"));
        //Busco el producto
        const product = carrito.items.find(p => p.producto.id === inputId);
        //Si lo encuentro continuo
        if (product != null && !isNaN(inputId)) {
          const cantidad = parseInt(prompt("¿Cuántas unidades querés eliminar?"));

          //Verifico que la cantidad ingresada sea válida
          if (!isNaN(cantidad) && cantidad > 0) {
            carrito.eliminarProducto(product.producto.id, cantidad);
          } 
          else {
            alert("Cantidad inválida");
          }
          } 
          else {
          alert("Datos inválidos.");
          }
        }
    }

    //Accion finalizar compra, salgo del while
    else if (accion == "3") {
      continuar = false;
    }

    //Verifico que se ingrese una opcion válida
    else {
      alert("Opción no válida.");
    }
  }

  //Muestro el resumen de la compra y pido confirmacion o rechazo
  alert(carrito.mostrarResumen());
  if (carrito.items.length > 0) {
    const confirmarCompra = confirm("¿Querés confirmar la compra?");
    if (confirmarCompra) {
      alert("¡Gracias por tu compra!");
    } else {
      alert("Compra cancelada.");
    }
  }
}

//Llamo la función
iniciarCompra();