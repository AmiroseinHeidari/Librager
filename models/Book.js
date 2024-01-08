class Book {
    constructor(author, title, isbn) {
        this.author = String(author);
        this.title = String(title);
        this.isbn = String(isbn);
    }
    info() {
        return (
            '"' + this.title + '",' + ' a book written by "' + this.author + '"'
        );
    }
}
module.exports = Book;
