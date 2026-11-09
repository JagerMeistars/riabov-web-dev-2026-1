function renderDishes() {
    dishes.sort(function(first, second) {
        return first.name.localeCompare(second.name, "ru");
    });

    for (const dish of dishes) {
        const card = document.createElement("div");
        card.className = "dish";
        card.dataset.dish = dish.keyword;
        card.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p class="dish-price">${dish.price} ₽</p>
            <p class="dish-name">${dish.name}</p>
            <p class="dish-count">${dish.count}</p>
            <button type="button">Добавить</button>
        `;
        const selector = `[data-category="${dish.category}"] .dishes`;
        document.querySelector(selector).append(card);
    }
}

renderDishes();
