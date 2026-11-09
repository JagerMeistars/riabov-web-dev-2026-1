const ORDER_STORAGE_KEY = "food-construct-order";

function restoreSelectedDishes() {
    for (const category in selectedDishes) {
        selectedDishes[category] = null;
    }
    let ids;
    try {
        ids = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || "[]");
    } catch {
        return;
    }
    if (!Array.isArray(ids)) {
        return;
    }
    for (const dish of dishes) {
        if (ids.includes(dish.id)) {
            selectedDishes[dish.category] = dish;
        }
    }
}

function saveSelectedDishes() {
    const ids = [];
    for (const category in selectedDishes) {
        if (selectedDishes[category]) {
            ids.push(selectedDishes[category].id);
        }
    }
    try {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(ids));
    } catch {
        showNotification("Не удалось сохранить выбранные блюда");
    }
}
