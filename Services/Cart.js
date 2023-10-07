document.addEventListener("DOMContentLoaded", function () {
    const carritoItemsList = document.getElementById("carritoItems");

    // Mostrar los productos en el carrito
    carrito.forEach((producto) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${producto.nombre} - Cantidad: ${producto.cantidad}
        `;
        carritoItemsList.appendChild(listItem);
    });
});