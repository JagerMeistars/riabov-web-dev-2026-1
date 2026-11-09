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

for (const button of document.querySelectorAll(".filters button")) {
    button.addEventListener("click", function() {
        const section = button.closest(".menu-section");
        const wasActive = button.classList.contains("active");
        for (const filter of section.querySelectorAll(".filters button")) {
            filter.classList.remove("active");
        }
        if (!wasActive) {
            button.classList.add("active");
        }
        for (const card of section.querySelectorAll(".dish")) {
            const dish = dishes.find(function(item) {
                return item.keyword === card.dataset.dish;
            });
            card.hidden = !wasActive && dish.kind !== button.dataset.kind;
        }
    });
}
