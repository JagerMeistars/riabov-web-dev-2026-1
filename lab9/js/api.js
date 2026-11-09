// Адрес эмулятора из СДО; пустая строка означает текущий сервер.
const API_URL = "";
const API_KEY = "";
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
            if (!dish || !Number.isInteger(dish.id) ||
                typeof dish.name !== "string" ||
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

async function requestOrders(method, id, data) {
    if (!API_KEY) {
        throw new Error("Сервис заказов пока не настроен");
    }
    let url = API_URL + "/labs/api/orders";
    if (id !== null) {
        url += "/" + id;
    }
    url += "?api_key=" + encodeURIComponent(API_KEY);
    const options = {method: method};
    if (data) {
        options.headers = {"Content-Type": "application/json"};
        options.body = JSON.stringify(data);
    }
    let response;
    let result;
    try {
        response = await fetch(url, options);
        result = await response.json();
    } catch {
        throw new Error("Не удалось связаться с сервисом заказов");
    }
    if (!result || typeof result !== "object") {
        throw new Error("Некорректный ответ сервиса заказов");
    }
    if (!response.ok || result.error) {
        throw new Error(result.error || "Не удалось выполнить запрос");
    }
    return result;
}
