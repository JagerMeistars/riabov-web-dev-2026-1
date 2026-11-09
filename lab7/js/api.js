// Адрес эмулятора из СДО; пустая строка означает текущий сервер.
const API_URL = "";
let dishes = [];

async function loadDishes() {
    try {
        const response = await fetch(API_URL + "/labs/api/dishes");
        if (!response.ok) {
            throw new Error("Меню недоступно");
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error("Некорректный ответ сервера");
        }
        for (const dish of data) {
            if (!dish || typeof dish.name !== "string" ||
                typeof dish.keyword !== "string" ||
                typeof dish.image !== "string" ||
                typeof dish.count !== "string" ||
                typeof dish.kind !== "string" ||
                !Number.isFinite(dish.price) || dish.price < 0) {
                throw new Error("Некорректные данные блюда");
            }
            if (dish.category === "main-course") {
                dish.category = "main";
            }
            if (dish.category === "beverages") {
                dish.category = "drink";
            }
            if (!["soup", "main", "salad", "drink", "dessert"].includes(
                dish.category)) {
                throw new Error("Неизвестная категория блюда");
            }
            const image = new URL(dish.image,
                API_URL || window.location.origin);
            if (image.protocol !== "http:" && image.protocol !== "https:") {
                throw new Error("Некорректный адрес изображения");
            }
            dish.image = image.href;
        }
        return data;
    } catch {
        showNotification("Не удалось загрузить меню. Попробуйте позже.");
        return null;
    }
}
