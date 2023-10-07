//import Producto from '..Models/Producto';

// INSTANCIAR ELEMENTOS
var productos = [];


productos.push( new Producto("Producto 1", "Descripción del producto 1", 99.99, "/BYE/Images/Img1.jpg",10));
productos.push( new Producto("Producto 2", "libny te amo", 79.99, "/BYE/Images/Img2.jpg",8));
productos.push( new Producto("Producto 2", "libny te amo", 79.99, "/BYE/Images/Img3.jpg",8));
productos.push( new Producto("Producto 2", "libny te amo", 79.99, "/BYE/Images/Img4.jpg",8));
productos.push( new Producto("Producto 2", "libny te amo", 79.99, "/BYE/Images/Img5.jpg",8));
productos.push( new Producto("Producto 2", "libny te amo", 79.99, "/BYE/Images/Img6.jpg",8));
productos.push( new Producto("Producto 2", "libny te amo", 79.99, "/BYE/Images/Img7.jpg",8));
productos.push( new Producto("Producto 2", "libny te amo", 79.99, "/BYE/Images/Img8.jpg",8));
productos.push( new Producto("Producto 2", "libny te amo", 79.99, "/BYE/Images/Img9.jpg",8));
productos.push( new Producto("Producto 2", "libny te amo", 79.99, "/BYE/Images/Img10.jpg",8));

document.addEventListener("DOMContentLoaded", function () {
    const productosContainer = document.getElementById("productosContainer");

    // Itera sobre los productos y agrégalos al contenedor
    productos.forEach((producto) => {
        const productHTML = `
        <div class="product-card">
                <img src="${producto.imagenURL}" alt="">
                <div class="product-info">
                    <div>
                        <p class="card-title">${producto.nombre}</p>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="card-text">${producto.precio.toFixed(2)}</p>
                        <div class="cantidad">
                            <p class="card-text">cantidad:</p>
                            <p class="card-text">${producto.cantidad}</p>
                        </div>
                    </div>
                    <figure>
                        <button class="btn btn-primary" id="addToCartButton">
                            Agregar al carrito
                        </button>
                    </figure>
                </div>
            </div>
        `;
        productosContainer.innerHTML += productHTML;
    });
});

// Variables para el carrito
const carrito = [];
const cartLink = document.getElementById("cartLink");
const cartDropdown = document.getElementById("cartDropdown");
const cartItemsList = document.getElementById("cartItems");
const checkoutBtn = document.getElementById("checkoutBtn");

// Función para actualizar el número de elementos en el carrito
function actualizarCantidadCarrito() {
    cartLink.textContent = `Carrito (${carrito.length})`;
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarCantidadCarrito();
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    cartItemsList.innerHTML = "";

    carrito.forEach((producto, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${producto.nombre} - Cantidad: ${producto.cantidad}
            <button class="btn btn-sm btn-danger" data-index="${index}">Eliminar</button>
        `;
        cartItemsList.appendChild(listItem);
    });

    // Agregar un evento de clic para eliminar productos del carrito
    const deleteButtons = cartItemsList.querySelectorAll(".btn-danger");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            carrito.splice(index, 1);
            mostrarCarrito();
            actualizarCantidadCarrito();
        });
    });
}

// Agregar un evento de clic para los botones "Agregar al carrito"
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-primary")) {
        const productoIndex = event.target.parentElement.parentElement.dataset.index;
        const producto = productos[productoIndex];

        // Verificar si el producto ya está en el carrito
        const carritoIndex = carrito.findIndex((item) => item.nombre === producto.nombre);

        if (carritoIndex !== -1) {
            const cantidad = prompt(`Cantidad actual en el carrito: ${carrito[carritoIndex].cantidad}\nNueva cantidad:`);
            if (!isNaN(cantidad)) {
                const nuevaCantidad = parseInt(cantidad);
                if (nuevaCantidad > 0 && nuevaCantidad <= producto.cantidad) {
                    carrito[carritoIndex].cantidad = nuevaCantidad;
                } else {
                    alert("La cantidad ingresada no es válida.");
                }
            } else {
                alert("La cantidad ingresada no es un número válido.");
            }
        } else {
            const cantidad = prompt(`Cantidad actual en el carrito: 0\nNueva cantidad:`);
            if (!isNaN(cantidad)) {
                const nuevaCantidad = parseInt(cantidad);
                if (nuevaCantidad > 0 && nuevaCantidad <= producto.cantidad) {
                    producto.cantidad = nuevaCantidad;
                    agregarAlCarrito(producto);
                } else {
                    alert("La cantidad ingresada no es válida.");
                }
            } else {
                alert("La cantidad ingresada no es un número válido.");
            }
        }

        mostrarCarrito();
    }
});

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-primary")) {
        const productoIndex = event.target.parentElement.parentElement.dataset.index;
        const producto = productos[productoIndex];

        // Verificar si el producto ya está en el carrito
        const carritoIndex = carrito.findIndex((item) => item.nombre === producto.nombre);

        if (carritoIndex !== -1) {
            const cantidad = prompt(`Cantidad actual en el carrito: ${carrito[carritoIndex].cantidad}\nNueva cantidad:`);
            if (!isNaN(cantidad)) {
                const nuevaCantidad = parseInt(cantidad);
                if (nuevaCantidad > 0 && nuevaCantidad <= producto.cantidad) {
                    carrito[carritoIndex].cantidad = nuevaCantidad;
                    producto.cantidad -= nuevaCantidad; // Restar la cantidad del inventario
                } else {
                    alert("La cantidad ingresada no es válida.");
                }
            } else {
                alert("La cantidad ingresada no es un número válido.");
            }
        } else {
            const cantidad = prompt(`Cantidad actual en el carrito: 0\nNueva cantidad:`);
            if (!isNaN(cantidad)) {
                const nuevaCantidad = parseInt(cantidad);
                if (nuevaCantidad > 0 && nuevaCantidad <= producto.cantidad) {
                    producto.cantidad -= nuevaCantidad; // Restar la cantidad del inventario
                    agregarAlCarrito(new Producto(producto.nombre, producto.descripcion, producto.precio, producto.imagenURL, nuevaCantidad));
                } else {
                    alert("La cantidad ingresada no es válida.");
                }
            } else {
                alert("La cantidad ingresada no es un número válido.");
            }
        }

        mostrarCarrito();
    }
});
