function renderDishes() {
    dishes.sort(function(first, second) {
        return first.name.localeCompare(second.name, "ru");
    });

    for (const dish of dishes) {
        const card = document.createElement("div");
        card.className = "dish";
        card.dataset.dish = dish.keyword;
        const image = document.createElement("img");
        image.src = dish.image;
        image.alt = dish.name;
        const price = document.createElement("p");
        price.className = "dish-price";
        price.textContent = dish.price + " ₽";
        const name = document.createElement("p");
        name.className = "dish-name";
        name.textContent = dish.name;
        const count = document.createElement("p");
        count.className = "dish-count";
        count.textContent = dish.count;
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Добавить";
        card.append(image, price, name, count, button);
        const sectionSelector = `[data-category="${dish.category}"]`;
        const section = document.querySelector(sectionSelector);
        const filter = section.querySelector(".filters .active");
        card.hidden = filter !== null && filter.dataset.kind !== dish.kind;
        const selector = `[data-category="${dish.category}"] .dishes`;
        document.querySelector(selector).append(card);
    }
}


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
