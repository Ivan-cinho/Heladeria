

class Producto {
    constructor (id, tamaño, precio) {
        this.id = id;
        this.tamaño = tamaño;
        this.precio = precio;
        // this.cantidad = 1;
    }
}

// const cuarto = new Producto (1, "Cuarto de kg", 1200);
// const medio = new Producto (2, "Medio kg", 2000);
// const kilo = new Producto (3, "1 kg", 3600);

// const productos = [cuarto, medio, kilo]

const productos = [ {id: 1, tamaño: "Cuarto de kg", precio: 1200, cantidad: 1},
                    {id: 2, tamaño: "Medio kg", precio: 2200, cantidad: 1},
                    {id: 3, tamaño: "1 kg", precio: 3600, cantidad: 1}
];

let pedido = [];

// cargar pedido de local storage

if(localStorage.getItem("pedido")) {
    pedido = JSON.parse(localStorage.getItem("pedido"));
}

const contenedorProductos = document.querySelector("#contenedorProductos");

const mostrarProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML =   `<div>
                                <div>
                                    <h3>${producto.tamaño}</h3>
                                    <p>${producto.precio}</p>
                                    <button class="btn botonAgregar" id="agregar${producto.id}">Agregar al pedido</button>
                                </div>
                            </div>`
        contenedorProductos.appendChild(card);
        const boton = document.getElementById(`agregar${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlPedido(producto.id)
            console.log(pedido)
        })
    })
}
mostrarProductos()

const agregarAlPedido = (id) => {
    const productoEnPedido = pedido.find(producto => producto.id === id);
    if(productoEnPedido) {
        productoEnPedido.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        pedido.push(producto);
    }
    calcularTotal();
    mostrarPedido()
    // localstorage
    localStorage.setItem("pedido", JSON.stringify(pedido))
}

// pedido

const contenedorPedido = document.getElementById("contenedorPedido");
const vaciarPedido = document.querySelector(".vaciarPedido");
const verPedido = document.querySelector(".verPedido")


const mostrarPedido = () => {
    contenedorPedido.innerHTML = "";
    pedido.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML =   `<div>
                                <div>
                                    <h3>${producto.tamaño}</h3>
                                    <p>${producto.precio}</p>
                                    <p>${producto.cantidad}</p>
                                    <button class="btn botonAgregar" id="eliminar${producto.id}">Eliminar del pedido</button>
                                </div>
                            </div>`
        contenedorPedido.appendChild(card)
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelPedido(producto.id);
        })
    })
    calcularTotal();
}

// const eliminarDelPedido = (id) => {
//     const producto = pedido.find(producto => producto.id === id);
//     const indice = pedido.indexOf(producto);
//     pedido.splice(indice, 1);
//     producto.cantidad = 1;
//     mostrarPedido();
//     calcularTotal();
//     // localstorage
//     localStorage.setItem("pedido", JSON.stringify(pedido));
// }

const eliminarDelPedido = (id) => {
    const producto = pedido.find(producto => producto.id === id);
    if(producto.cantidad >= 2) {
        producto.cantidad--;
        mostrarPedido();
        calcularTotal();
    } else {
        const indice = pedido.indexOf(producto);
        pedido.splice(indice, 1);
        producto.cantidad = 1;
        mostrarPedido();
        calcularTotal();
    }
    // localstorage
    localStorage.setItem("pedido", JSON.stringify(pedido));
}



// total compra

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    pedido.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `$${totalCompra}`
}

// vaciar pedido

const vaciarDelPedido = document.getElementById("vaciarPedido");

vaciarDelPedido.addEventListener("click", () => {
    vaciarTodoElPedido();
})

const vaciarTodoElPedido = () => {
    productos.cantidad = 1;
    pedido = [];
    mostrarPedido();
    calcularTotal();
    // localStorage
    localStorage.clear();
}

// confirmar pedido

const confirmarPedido = document.querySelector("#confirmarPedido");

confirmarPedido.addEventListener("click", () => {
    confirmarTodoElPedido();
})

const confirmarTodoElPedido = () => {

}