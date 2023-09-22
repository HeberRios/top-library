"use strict";

// VARIABLES -------------------------------------------------------------
const booksArray = [];

// BOOK CLASS ------------------------------------------------------------

class Book {
    constructor(title, author, numberOfPages, readStatus) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.readStatus = readStatus;
    }

    changeReadStatus() {
        if (this.readStatus) {
            this.readStatus = false;
        } else {
            this.readStatus = true;
        }
    }
}

// ELEMENTS --------------------------------------------------------------
const booksCardsContainer = document.querySelector(".books-container");
const addBookBtn = document.getElementById("add-book");
const addBookForm = document.getElementById("add-book-form");
const overlay = document.getElementById("overlay");
const bookForm = document.getElementById("add-book-form");
const bookTitle = document.getElementById("book-title");
const bookAuthor = document.getElementById("book-author");
const bookPages = document.getElementById("book-pages");
const bookStatusCheckBox = document.getElementById("book-read-status");
const createBookBtn = document.getElementById("create-book-card-btn");

// FUNCTIONS -------------------------------------------------------------
function toggleBookForm() {
    addBookForm.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
}

function createNewBookCard(newBook, bookIndex) {
    //VARIABLES
    const readStatusMessage = "read";
    const notReadStatusMessage = "not read";

    // CREATING THE ELEMENTS
    const bookCard = document.createElement("div");
    const bookTitle = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const bookButtonsContainer = document.createElement("div");
    const bookStatusBtn = document.createElement("button");
    const bookStatusText = document.createElement("span");
    const readStatusIcon = document.createElement("img");
    const removeBookBtn = document.createElement("button");
    const removeBookIcon = document.createElement("img");

    // ADDING CLASSES
    bookCard.classList.add("book-card");
    bookTitle.classList.add("book-title");
    bookAuthor.classList.add("book-author");
    bookPages.classList.add("book-pages");
    bookButtonsContainer.classList.add("book-buttons-container");
    bookStatusBtn.classList.add("btn", "book-status");
    readStatusIcon.classList.add("read-status-icon");
    removeBookBtn.classList.add("btn", "remove-book");
    removeBookIcon.classList.add("remove-book-icon");

    // ADDING ATTRIBUTES
    bookStatusBtn.dataset.position = `${bookIndex}`;
    removeBookBtn.dataset.position = `${bookIndex}`;

    // ADDING THE CONTENT
    bookTitle.textContent = newBook.title;
    bookAuthor.textContent = newBook.author;
    bookPages.textContent = newBook.numberOfPages + " pages";

    //CHECKING THE READING STATUS
    if (newBook.readStatus) {
        bookStatusBtn.classList.add("read");
        bookStatusText.textContent = readStatusMessage;
    } else {
        bookStatusBtn.classList.add("not-read");
        bookStatusText.textContent = notReadStatusMessage;
    }

    removeBookBtn.textContent = "remove";

    // ADDING SRC ATTRIBUTE TO THE IMAGES
    if (bookStatusBtn.classList.contains("read")) {
        readStatusIcon.src = "assets/icons/read.svg";
    } else if (bookStatusBtn.classList.contains("not-read")) {
        readStatusIcon.src = "assets/icons/not-read.svg";
    }

    removeBookIcon.src = "assets/icons/book-remove.svg";

    // APPENDING ELEMENTS
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookButtonsContainer);
    bookButtonsContainer.appendChild(bookStatusBtn);
    bookButtonsContainer.appendChild(removeBookBtn);
    bookStatusBtn.appendChild(bookStatusText);
    bookStatusBtn.appendChild(readStatusIcon);
    removeBookBtn.appendChild(removeBookIcon);
    booksCardsContainer.appendChild(bookCard);
}

function createNewBookObject() {
    const title = bookTitle.value;
    const author = bookAuthor.value;
    const pages = +bookPages.value;
    const readStatus = bookStatusCheckBox.checked;
    const newBook = new Book(title, author, pages, readStatus);
    booksArray.push(newBook);
    return newBook;
}

function clearFormInputs() {
    bookTitle.value = "";
    bookAuthor.value = "";
    bookPages.value = null;
    bookStatusCheckBox.checked = false;
}

function clearBooksContainer() {
    booksCardsContainer.replaceChildren();
}

function displayBookArray() {
    clearBooksContainer();
    booksArray.forEach((book, bookIndex) => {
        createNewBookCard(book, bookIndex);
    });
    addChangeReadStatusEvent();
    addRemoveBookEvent();
}

function addRemoveBookEvent() {
    const removeBtns = document.querySelectorAll(".remove-book");

    removeBtns.forEach((removeBtn) => {
        removeBtn.addEventListener("click", () => {
            booksArray.splice(+removeBtn.getAttribute("data-position"), 1);
            displayBookArray();
        });
    });
}

function changeReadStatusClass(btn) {
    if (btn.classList.contains("not-read")) {
        btn.classList.remove("not-read");
        btn.classList.add("read");
        btn.firstElementChild.textContent = "read";
        btn.lastElementChild.src = "assets/icons/read.svg";
    } else if (btn.classList.contains("read")) {
        btn.classList.remove("read");
        btn.classList.add("not-read");
        btn.firstElementChild.textContent = "not read";
        btn.lastElementChild.src = "assets/icons/not-read.svg";
    }
}

function addChangeReadStatusEvent() {
    const bookStatusBtns = document.querySelectorAll(".book-status");
    bookStatusBtns.forEach((bookStatusBtn) => {
        bookStatusBtn.addEventListener("click", () => {
            booksArray[
                +bookStatusBtn.getAttribute("data-position")
            ].changeReadStatus();
            changeReadStatusClass(bookStatusBtn);
        });
    });
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

// FORM SUBMIT

bookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    createNewBookObject();
    displayBookArray();
    clearFormInputs();
    toggleBookForm();
});
