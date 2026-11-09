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
        const emptyText = category === "drink"
            ? "Напиток не выбран" : "Блюдо не выбрано";
        const text = dish ? `${dish.name} ${dish.price} ₽` : emptyText;
        document.getElementById(`${category}-order`).textContent = text;
        document.getElementById(`${category}-input`).value = dish
            ? dish.keyword : "";
        if (dish) {
            total += dish.price;
            hasDish = true;
        }
    }
    document.getElementById("empty-order").hidden = hasDish;
    document.getElementById("chosen-dishes").hidden = !hasDish;
    document.getElementById("order-total").hidden = !hasDish;
    document.getElementById("total-price").textContent = `${total} ₽`;
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
    updateOrder();
});

document.getElementById("order-form").addEventListener("reset", function() {
    for (const category in selectedDishes) {
        selectedDishes[category] = null;
    }
    updateOrder();
});

updateOrder();
