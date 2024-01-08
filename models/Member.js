class Member {
    constructor(membershipID, name, borrowedBooks = []) {
        this.membershipID = membershipID;
        this.name = name;
        this.borrowedBooks = borrowedBooks;
    }
    borrow(book) {
        this.borrowedBooks.push(book.isbn);
    }
    giveBack(book) {
        const idx = this.borrowedBooks.indexOf(book.isbn);
        if (idx >= 0) {
            this.borrowedBooks.splice(idx, 1);
        }
    }
}

module.exports = Member;
