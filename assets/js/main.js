"use strict";

// ELEMENTS --------------------------------------------------------------
const addBookBtn = document.getElementById("add-book");
const addBookForm = document.getElementById("add-book-form");
const overlay = document.getElementById("overlay");

// FUNCTIONS -------------------------------------------------------------
function toggleBookForm() {
    addBookForm.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
}

// EVENT LISTENERS -------------------------------------------------------

// TOGGLE BOOK FORM
addBookBtn.addEventListener("click", toggleBookForm);
overlay.addEventListener("click", toggleBookForm);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !addBookForm.classList.contains("hidden")) {
        toggleBookForm();
    }
});
