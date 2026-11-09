let orders = [];
const orderFields = ["soup_id", "main_course_id", "salad_id", "drink_id",
    "dessert_id"];
const editFields = ["full_name", "email", "phone", "delivery_address",
    "delivery_type", "delivery_time", "comment"];
const editForm = document.getElementById("edit-order-form");
editForm.noValidate = true;

function getOrderDishes(order) {
    const result = [];
    for (const field of orderFields) {
        const dish = dishes.find(function(item) {
            return item.id === order[field];
        });
        if (dish) {
            result.push(dish);
        }
    }
    return result;
}

function getDeliveryText(order) {
    return order.delivery_type === "now"
        ? "Как можно скорее (с 7:00 до 23:00)"
        : order.delivery_time.slice(0, 5);
}

function showComposition(order, container) {
    container.replaceChildren();
    let total = 0;
    for (const dish of getOrderDishes(order)) {
        const paragraph = document.createElement("p");
        paragraph.textContent = `${dish.name} (${dish.price} ₽)`;
        container.append(paragraph);
        total += dish.price;
    }
    const price = document.createElement("p");
    price.className = "order-price";
    price.textContent = `Стоимость: ${total} ₽`;
    container.append(price);
}

function renderOrders() {
    const container = document.getElementById("orders-list");
    container.replaceChildren();
    orders.sort(function(first, second) {
        return new Date(second.created_at) - new Date(first.created_at);
    });
    document.getElementById("orders-empty").hidden = orders.length > 0;
    for (let index = 0; index < orders.length; index++) {
        const order = orders[index];
        const composition = getOrderDishes(order);
        const names = composition.map(function(dish) {
            return dish.name;
        });
        let total = 0;
        for (const dish of composition) {
            total += dish.price;
        }
        const row = document.createElement("tr");
        const values = [index + 1,
            new Date(order.created_at).toLocaleString("ru-RU"),
            names.join(", "), `${total} ₽`, getDeliveryText(order)];
        for (const value of values) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.append(cell);
        }
        const actions = document.createElement("td");
        const captions = {details: "Подробнее", edit: "Редактирование",
            delete: "Удаление"};
        for (const action in captions) {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = captions[action];
            button.dataset.action = action;
            button.dataset.id = order.id;
            actions.append(button);
        }
        row.append(actions);
        container.append(row);
    }
}

function showDetails(order) {
    const container = document.getElementById("details-content");
    container.replaceChildren();
    const fields = {
        "Дата оформления": new Date(order.created_at).toLocaleString("ru-RU"),
        "Имя получателя": order.full_name,
        "Адрес доставки": order.delivery_address,
        "Время доставки": getDeliveryText(order),
        "Телефон": order.phone,
        "Email": order.email
    };
    for (const label in fields) {
        const term = document.createElement("dt");
        term.textContent = label;
        const description = document.createElement("dd");
        description.textContent = fields[label];
        container.append(term, description);
    }
    document.getElementById("details-comment").textContent =
        order.comment || "Нет комментария";
    showComposition(order, document.getElementById("details-composition"));
    document.getElementById("details-dialog").showModal();
}

function showEdit(order) {
    for (const field of editFields) {
        editForm.elements[field].value = order[field] || "";
    }
    editForm.elements.delivery_time.value = order.delivery_time
        ? order.delivery_time.slice(0, 5) : "";
    document.getElementById("edit-created").textContent =
        new Date(order.created_at).toLocaleString("ru-RU");
    showComposition(order, document.getElementById("edit-composition"));
    prepareDeliveryTime(editForm);
    const dialog = document.getElementById("edit-dialog");
    dialog.dataset.id = order.id;
    dialog.showModal();
}

document.getElementById("orders-list").addEventListener("click",
    function(event) {
        if (!event.target.matches("button[data-action]")) {
            return;
        }
        const id = Number(event.target.dataset.id);
        const order = orders.find(function(item) {
            return item.id === id;
        });
        if (event.target.dataset.action === "details") {
            showDetails(order);
        } else if (event.target.dataset.action === "edit") {
            showEdit(order);
        } else {
            const dialog = document.getElementById("delete-dialog");
            dialog.dataset.id = order.id;
            dialog.showModal();
        }
    });

for (const button of document.querySelectorAll("[data-close]")) {
    button.addEventListener("click", function() {
        document.getElementById(button.dataset.close).close();
    });
}

editForm.addEventListener("change", function() {
    prepareDeliveryTime(editForm);
});

editForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    prepareDeliveryTime(editForm);
    if (!editForm.reportValidity()) {
        return;
    }
    const dialog = document.getElementById("edit-dialog");
    const id = Number(dialog.dataset.id);
    const data = Object.fromEntries(new FormData(editForm));
    const button = editForm.querySelector('button[type="submit"]');
    button.disabled = true;
    try {
        const result = await requestOrders("PUT", id, data);
        const order = orders.find(function(item) {
            return item.id === id;
        });
        Object.assign(order, result);
        renderOrders();
        dialog.close();
        showNotification("Заказ успешно изменён");
    } catch (error) {
        showNotification(error.message);
    } finally {
        button.disabled = false;
    }
});

document.getElementById("confirm-delete").addEventListener("click",
    async function(event) {
        const button = event.currentTarget;
        const dialog = document.getElementById("delete-dialog");
        const id = Number(dialog.dataset.id);
        button.disabled = true;
        try {
            await requestOrders("DELETE", id);
            orders = orders.filter(function(order) {
                return order.id !== id;
            });
            renderOrders();
            dialog.close();
            showNotification("Заказ успешно удалён");
        } catch (error) {
            showNotification(error.message);
        } finally {
            button.disabled = false;
        }
    });

loadDishes().then(async function(data) {
    if (!data) {
        return;
    }
    dishes = data;
    try {
        const result = await requestOrders("GET", null);
        if (!Array.isArray(result) || result.some(function(order) {
            return !order || !Number.isInteger(order.id) ||
                !Number.isFinite(Date.parse(order.created_at)) ||
                !["now", "by_time"].includes(order.delivery_type) ||
                (order.delivery_type === "by_time" &&
                    typeof order.delivery_time !== "string");
        })) {
            throw new Error("Некорректный список заказов");
        }
        orders = result;
        renderOrders();
    } catch (error) {
        showNotification(error.message);
    }
});
