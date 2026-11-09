const selectedDishes = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

function updateOrder() {
    let total = 0;
    let hasDish = false;
    for (const category in selectedDishes) {
        const dish = selectedDishes[category];
        if (dish) {
            total += dish.price;
            hasDish = true;
        }
    }
    document.getElementById("checkout-panel").hidden = !hasDish;
    document.getElementById("total-price").textContent = `${total} ₽`;
    const link = document.getElementById("checkout-link");
    const isValid = getComboError(selectedDishes) === "";
    link.setAttribute("aria-disabled", String(!isValid));
    if (isValid) {
        link.href = "checkout.html";
        link.removeAttribute("tabindex");
    } else {
        link.removeAttribute("href");
        link.tabIndex = -1;
    }
    for (const card of document.querySelectorAll(".dish")) {
        const dish = dishes.find(function(item) {
            return item.keyword === card.dataset.dish;
        });
        const isSelected = selectedDishes[dish.category] === dish;
        card.classList.toggle("selected", isSelected);
    }
}

document.querySelector("main").addEventListener("click", function(event) {
    if (!event.target.matches(".dish button")) {
        return;
    }
    const keyword = event.target.closest(".dish").dataset.dish;
    const dish = dishes.find(function(item) {
        return item.keyword === keyword;
    });
    selectedDishes[dish.category] = dish;
    saveSelectedDishes();
    updateOrder();
});

loadDishes().then(function(data) {
    if (data) {
        dishes = data;
        restoreSelectedDishes();
        renderDishes();
        updateOrder();
    }
});
