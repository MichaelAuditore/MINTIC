let container;
let user;
$(document).ready(function () {
    initialize();
    container = $(".container");
});

const COORD_PROFILE = "COORD";
const ADMIN_PROFILE = "ADMIN";

/**
 * initialize - initialize orders view
 */
async function initialize() {
    if (existsSession()) {
        let ordersButton = $(".orders");
        ordersButton.addClass("active");
        user = getSession();
        if (user.type === COORD_PROFILE) {
            getCoordinatorView();
        } else {
            getAsistantView();
        }
    } else {
        window.location.href = "./index.html";
    }
}

async function getCoordinatorView() {
    await getOrdersByZone(user.zone);
}

async function getAsistantView() {
    await getOrdersFilterByAsistant();
}


function drawView(data) {
    drawData(data);
}

function drawData(orders) {
    let orderRows = [];
    let table = document.createElement("table");
    table.classList.add("table");
    table.classList.add("table-dark");

    if (orders.length > 0) {
        table.innerHTML = `
    <thead>
        <tr>
            <th>Fecha Registro</th>
            <th>Estado</th>
            <th>Vendedor</th>
            <th>Productos Vendidos</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody class="table_content">
    </tbody>
  `;
    } else {
        table.innerHTML = `
    <td>Actualmente no hay registros</td>
    `;
    }
    $(".orders").html(table);

    orders.forEach((order) => {
        let orderRow = `
        <tr>
            <td>
                <input type="date" disabled class="${order.id}" value="${order.registerDay.split("T")[0]}" /> 
            </td>
            <td>
                <input disabled class="${order.id}" value="${order.status}"/>
            </td>
            <td>
                <select disabled class="${order.id}" value="${order.salesMan.id}">
                    <option value="${order.salesMan.id}">${order.salesMan.name}</option>
                </select>
            </td>
            <td class="productsIncluded${order.id}">
            </td>
            <td>
                <button class="btn btn-danger" onclick="deleteOrder('${order.id}')">Eliminar</button>
            </td>
        </tr>`;
        orderRows.push(orderRow);
    });

    $(".table_content").html(orderRows.join(""));
    drawProducts(orders);
}

function drawProducts(orders) {
    lengthOrders = orders.length;
    orders.forEach((order, idx) => {
        let productsOrder = Object.values(order.products);
        productsOrder.forEach((product) => {
            let data;
            if (idx <= lengthOrders) {
                data = `${product.reference}<br>${product.brand}<br>${product.price}<hr>`
            } else {
                data = `${product.reference}<br>${product.brand}<br>${product.price}`
            }
            $(`.productsIncluded${order.id}`).append(data);
        })
    })

}

function deleteOrder(id) {
    removeOrder(id);
}
