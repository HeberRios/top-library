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
const newBook2 = new Book(
    "The DOOM Slayesssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssr",
    "Samur",
    666,
    false
);
booksArray.push(newBook);
console.log(booksArray);
console.log(newBook.title);

// ELEMENTS --------------------------------------------------------------
const booksCardsContainer = document.querySelector(".books-container");
const addBookBtn = document.getElementById("add-book");
const addBookForm = document.getElementById("add-book-form");
const overlay = document.getElementById("overlay");

// FUNCTIONS -------------------------------------------------------------
function toggleBookForm() {
    addBookForm.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
}

function createNewBookCard(newBook) {
    //VARIABLES
    let readStatus = false;
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

    // ADDING THE CONTENT
    bookTitle.textContent = newBook.title;
    bookAuthor.textContent = newBook.author;
    bookPages.textContent = newBook.numberOfPages;

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

// EVENT LISTENERS -------------------------------------------------------

// TOGGLE BOOK FORM
addBookBtn.addEventListener("click", toggleBookForm);
overlay.addEventListener("click", toggleBookForm);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !addBookForm.classList.contains("hidden")) {
        toggleBookForm();
    }
});

createNewBookCard(newBook);
createNewBookCard(newBook2);
