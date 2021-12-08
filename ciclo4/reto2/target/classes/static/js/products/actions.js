$(document).ready(function () {
    initialize();
    getZorrilloProducts();
});

/**
 * initialize - initialize products view
 */
async function initialize() {
    if (existsSession()) {
        let productsButton = $(".product");
        productsButton.addClass("active");
    } else {
        window.location.href = "./index.html";
    }
}

/**
 * getZorrilloProducts - creates a table with products info from MongoDB
 */
async function getZorrilloProducts() {
    let products = await getProducts();
    let productRows = [];

    let table = document.createElement("table");
    table.classList.add("table");
    table.classList.add("table-dark");

    if (products.length > 0) {
        table.innerHTML = `
    <thead>
        <tr>
            <th>Referencia</th>
            <th>Disponibilidad</th>
            <th>Marca</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Presentación</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Imagen</th>
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
    $(".inventory").html(table);

    products.forEach((product) => {
        let productRow = `
        <tr>
            <td>
                <input disabled class="${product.reference}" value="${product.reference}"/>
            </td>
            <td>
                <select class="${product.reference}" disabled>
                    <option value="">Disponibilidad</option>
                    <option ${product.availability ? "selected" : ""} value="true">SI</option>
                    <option ${!product.availability ? "selected" : ""} value="false">NO</option>
                </select>
            </td>
            <td>
                <input disabled class="${product.reference}" value="${product.brand}"/>
            </td>
            <td>
                <input disabled class="${product.reference}" value="${product.category}"/>
            </td>
            <td>
                <input disabled class="${product.reference}" value="${product.description}"/>
            </td>
            <td>
                <input disabled class="${product.reference}" value="${product.presentation}"/>
            </td>
            <td>
                <input disabled class="${product.reference}" value="${product.price}"/>
            </td>
            <td>
                <input disabled class="${product.reference}" value="${product.quantity}"/>
            </td>
            <td>
                <img src="${product.photography}" />
            </td>
            <td>
                <button id="${product.reference}"
                    class="btn btn-warning editButton" onclick="enableEdit('${product.reference}')">Actualizar</button>
                <button id="update${product.reference}"
                    class="btn btn-warning updateButton" onclick="updateProduct('${product.reference}')">Guardar</button>
                <button class="btn btn-danger" onclick="deleteProduct('${product.reference}')">Eliminar</button>
            </td>
        </tr>`;
        productRows.push(productRow);
    });

    $(".table_content").html(productRows.join(""));
}

function createProduct() {
    if (isValid()) {
        const body = {
            reference: $("#reference").val(),
            brand: $("#brand").val(),
            category: $("#category").val(),
            presentation: $("#presentation").val(),
            description: $("#description").val(),
            availability: $("#availability").val() === "true" ? true : false,
            price: $("#price").val(),
            quantity: $("#quantity").val(),
            photography: $("#photography").val(),
        };

        saveProduct(body);
    } else {
        alert("Diligencie todos los campos, todos los campos son obligatorios");
    }
}

function enableEdit(reference) {
    $(`.${reference}`).removeAttr("disabled");
    $(`#${reference}`).hide();
    $(`#update${reference}`).show();
}

function updateProduct(reference) {
    let updateFields = $(`.${reference}`);

    let updatedBody = {
        reference: $(updateFields[0]).val(),
        availability: $(updateFields[1]).val() === "true" ? true : false,
        brand: $(updateFields[2]).val(),
        category: $(updateFields[3]).val(),
        presentation: $(updateFields[4]).val(),
        description: $(updateFields[5]).val(),
        price: $(updateFields[6]).val(),
        quantity: $(updateFields[7]).val(),
    };

    updateFragance(updatedBody);
    $(`#${reference}`).show();
    $(`#update${reference}`).hide();
}

function deleteProduct(reference) {
    removeProduct(reference);
}

function isValid() {
    return (
        $("#reference").val() != "" &&
        $("#brand").val() != "" &&
        $("#category").val() != "" &&
        $("#presentation").val() != "" &&
        $("#description").val() != "" &&
        $("#availability").val() != "" &&
        $("#price").val() != "" &&
        $("#quantity").val() != "" &&
        $("#photography").val() != ""
    );
}
