function getComboError(order) {
    if (!order.soup && !order.main && !order.salad &&
        !order.drink && !order.dessert) {
        return "Ничего не выбрано. Выберите блюда для заказа";
    }
    if (order.soup && !order.main && !order.salad) {
        return "Выберите главное блюдо/салат/стартер";
    }
    if (order.salad && !order.soup && !order.main) {
        return "Выберите суп или главное блюдо";
    }
    if (!order.soup && !order.main && !order.salad) {
        return "Выберите главное блюдо";
    }
    if (!order.drink) {
        return "Выберите напиток";
    }
    return "";
}

function showNotification(message) {
    const dialog = document.createElement("dialog");
    dialog.className = "notification";
    dialog.setAttribute("aria-label", "Уведомление");
    const text = document.createElement("p");
    text.textContent = message;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Окей";
    button.addEventListener("click", function () {
        dialog.close();
    });
    dialog.addEventListener("close", function () {
        dialog.remove();
    });
    dialog.append(text, button);
    document.body.append(dialog);
    dialog.showModal();
}

function prepareDeliveryTime(form) {
    const time = form.elements.delivery_time;
    const byTime = form.elements.delivery_type.value === "by_time";
    time.disabled = !byTime;
    time.required = byTime;
    const now = new Date();
    const currentTime = String(now.getHours()).padStart(2, "0") + ":" +
        String(now.getMinutes()).padStart(2, "0");
    time.setCustomValidity(byTime && time.value && time.value < currentTime
        ? "Время доставки не должно быть раньше текущего времени" : "");
}
