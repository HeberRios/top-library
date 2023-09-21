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
}

const newBook = new Book("The DOOM Slayer", "Samur", 666, false);
const newBook3 = new Book("The DOOM Slayer", "Samur", 666, false);
const newBook4 = new Book("The DOOM Slayer", "Samur", 666, false);
const newBook5 = new Book("The DOOM Slayer", "Samur", 666, false);
const newBook2 = new Book(
    "The DOOM Slayesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssr",
    "Samur",
    666,
    false
);

// booksArray.push(newBook);
// booksArray.push(newBook2);
// booksArray.push(newBook3);
// booksArray.push(newBook4);
// booksArray.push(newBook5);
// console.log(booksArray);
// console.log(newBook.title);

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
    removeBookBtn.dataset.position = `${bookIndex}`;

    // ADDING THE CONTENT
    bookTitle.textContent = newBook.title;
    bookAuthor.textContent = newBook.author;
    bookPages.textContent = newBook.numberOfPages + " pages";

    //CHECKING THE READING STATUS
    if (newBook.readStatus) {
        bookStatusBtn.classList.add("read");
        bookStatusBtn.textContent = readStatusMessage;
    } else {
        bookStatusBtn.classList.add("not-read");
        bookStatusBtn.textContent = notReadStatusMessage;
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
    addRemoveBookEvent();
}

function addRemoveBookEvent() {
    const removeBtns = document.querySelectorAll(".remove-book");

    removeBtns.forEach((removeBtn) => {
        removeBtn.addEventListener("click", function (removeBtn) {
            booksArray.splice(
                +removeBtn.target.getAttribute("data-position"),
                1
            );
            console.log(booksArray);
            displayBookArray();
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
