const feedbackForm = document.getElementById("feedback-form");
const feedbackResult = document.getElementById("feedback-result");

feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();
    feedbackResult.textContent =
        "Поля заполнены верно. Это учебная форма: сообщение не отправлено.";
});

feedbackForm.querySelector("button").disabled = false;
