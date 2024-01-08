membershipID = sessionStorage.getItem("currentLogin");
const url = "http://86.57.17.229:3000";

console.log("current login: ", membershipID);
addBookForm = document.getElementById("addBookForm");
inventory = document.getElementById("inventory");

addBookForm.addEventListener("submit", addBook);
addBookForm.addEventListener("submit", showInventory);

showInventory();
showHistory();

function addBook(event) {
    event.preventDefault();

    const author = document.getElementById("author-addBookForm").value;
    const title = document.getElementById("title-addBookForm").value;
    const isbn = document.getElementById("ISBN-addBookForm").value;
    fetch(url + "/addBook", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            author: author,
            title: title,
            isbn: isbn,
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            if (response == "this book has already been added!") {
                alert(response);
                return response;
            }
            console.log(response);
        })
        .catch((error) => console.log(error));
}

function showHistory() {
    console.log(membershipID);
    fetch(url + "/member/" + membershipID)
        .then((response) => response.json())
        .then((response) => {
            if (response.length > 0) {
                console.log(response);
                document.getElementById("historySection").innerHTML = response
                    .map(
                        (record) =>
                            `<li>isbn: ${record.isbn} borrowed at ${record.borrowDate}</li>`
                    )
                    .join("");
            } else {
                document.getElementById(
                    "historySection"
                ).innerHTML = `<li>Nothing to Return</li>`;
            }
        })
        .catch((error) => console.log(error));
}

function showInventory() {
    fetch(url + "/books")
        .then((response) => response.json())
        .then((response) => {
            if (response.length > 0) {
                inventory.innerHTML = response
                    .map(
                        (book) => `<li>${book.info}</li>
                <form id="${book.isbn}Form">
                <button id="${book.isbn}BorrowButton">borrow</button>
                <button id="${book.isbn}ReturnButton">return</button>
                </form>`
                    )
                    .join("");
            } else {
                inventory.innerHTML = "<li>Inventory is Empty..</li>";
            }
            return response;
        })
        .then((response) => {
            response.forEach((book) => {
                document
                    .getElementById(book.isbn + "Form")
                    .addEventListener("submit", (event) => {
                        event.preventDefault();
                        if (event.submitter.id == book.isbn + "BorrowButton")
                            borrowBook(book.isbn);
                        if (event.submitter.id == book.isbn + "ReturnButton")
                            returnBook(book.isbn);
                    });
            });
        })
        .catch((error) => console.log(error));
}

function borrowBook(isbn) {
    fetch(url + "/borrowBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            isbn: isbn,
            membershipID: membershipID,
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            if (
                response == "You must first register!" ||
                response == "this book is already borrowed by a member!" ||
                response == "No such book in this library!"
            ) {
                alert(response);
                return;
            }
            console.log(response);
        })
        .catch((error) => console.log(error));
    showHistory();
}

function returnBook(isbn) {
    fetch(url + "/returnBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            isbn: isbn,
            membershipID: membershipID,
        }),
    })
        .then((response) => response.json())
        .then((response) => {
            if (
                response == "No such book in this library!" ||
                response == "You must first register!" ||
                response == "this book is already in the library!" ||
                response ==
                    "you are not the member who borrowed this book, so you cannot return it either"
            ) {
                alert(response);
                return response;
            }
            console.log(response);
        })
        .catch((error) => console.log(error));
    showHistory();
}
