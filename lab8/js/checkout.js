const selectedDishes = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};
const orderForm = document.getElementById("order-form");
orderForm.noValidate = true;

function updateCheckout() {
    const container = document.getElementById("order-dishes");
    container.replaceChildren();
    let total = 0;
    for (const category in selectedDishes) {
        const dish = selectedDishes[category];
        const emptyText = category === "main" ? "Не выбрано" : "Не выбран";
        document.getElementById(`${category}-order`).textContent = dish
            ? `${dish.name} ${dish.price} ₽` : emptyText;
        document.getElementById(`${category}-input`).value = dish
            ? dish.id : "";
        if (dish) {
            total += dish.price;
            container.append(createDishCard(dish, "Удалить"));
        }
    }
    document.getElementById("empty-order").hidden =
        container.children.length > 0;
    document.getElementById("total-price").textContent = `${total} ₽`;
}

document.getElementById("order-dishes").addEventListener("click",
    function(event) {
        if (!event.target.matches("button[data-id]")) {
            return;
        }
        const id = Number(event.target.dataset.id);
        const dish = dishes.find(function(item) {
            return item.id === id;
        });
        selectedDishes[dish.category] = null;
        saveSelectedDishes();
        updateCheckout();
    });

orderForm.addEventListener("change", function() {
    prepareDeliveryTime(orderForm);
});

orderForm.addEventListener("reset", function() {
    window.setTimeout(function() {
        prepareDeliveryTime(orderForm);
        updateCheckout();
    }, 0);
});

orderForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const message = getComboError(selectedDishes);
    if (message) {
        showNotification(message);
        return;
    }
    prepareDeliveryTime(orderForm);
    if (!orderForm.reportValidity()) {
        return;
    }
    const data = Object.fromEntries(new FormData(orderForm));
    for (const field of ["soup_id", "main_course_id", "salad_id",
        "drink_id", "dessert_id"]) {
        if (data[field]) {
            data[field] = Number(data[field]);
        } else {
            delete data[field];
        }
    }
    data.subscribe = orderForm.elements.subscribe.checked ? 1 : 0;
    const button = orderForm.querySelector('button[type="submit"]');
    button.disabled = true;
    try {
        await requestOrders("POST", null, data);
        localStorage.removeItem(ORDER_STORAGE_KEY);
        for (const category in selectedDishes) {
            selectedDishes[category] = null;
        }
        orderForm.reset();
        updateCheckout();
        showNotification("Заказ успешно оформлен");
    } catch (error) {
        showNotification(error.message);
    } finally {
        button.disabled = false;
    }
});

prepareDeliveryTime(orderForm);
loadDishes().then(function(data) {
    if (data) {
        dishes = data;
        restoreSelectedDishes();
        updateCheckout();
    }
});
