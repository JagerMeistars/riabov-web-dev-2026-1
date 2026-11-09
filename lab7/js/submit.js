const orderForm = document.getElementById("order-form");
orderForm.noValidate = true;

orderForm.addEventListener("submit", function(event) {
    const message = getComboError(selectedDishes);
    if (message) {
        event.preventDefault();
        showNotification(message);
    } else if (!orderForm.reportValidity()) {
        event.preventDefault();
    }
});
