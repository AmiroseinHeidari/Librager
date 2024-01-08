const myLibrary = {
    books: [],
    members: [],
    history: [],

    hasBook(isbn) {
        return this.books.find((libraryBook) => isbn == libraryBook.isbn)
            ? true
            : false;
    },

    addBook(book) {
        if (!this.hasBook(book.isbn)) {
            this.books.push(book);
        } else {
            throw new Error("this book has already been added!");
        }
    },

    hasMember(membershipID) {
        return this.members.find(
            (libraryMember) => membershipID == libraryMember.membershipID
        )
            ? true
            : false;
    },
    register(member) {
        if (!this.hasMember(member.membershipID)) {
            this.members.push(member);
        } else {
            throw new Error("you already have registered!");
        }
    },

    search(isbn) {
        return this.books.find((book) => book.isbn == isbn).info();
    },

    record(membershipID, isbn, action) {
        if (!this.hasBook(isbn)) {
            throw new Error("No such book in this library!");
        }
        if (!this.hasMember(membershipID)) {
            throw new Error("You must first register!");
        }
        const rec = this.history.find(
            (record) => record.isbn == isbn && record.returnDate == null
        );
        if (action == "borrow") {
            if (!rec) {
                this.history.push({
                    membershipID: membershipID,
                    isbn: isbn,
                    borrowDate: new Date(),
                    returnDate: null,
                });
            } else {
                throw new Error("this book is already borrowed by a member!");
            }
        }
        if (action == "return") {
            if (rec) {
                if (rec.membershipID == membershipID)
                    rec.returnDate = new Date();
                else
                    throw new Error(
                        "you are not the member who borrowed this book, so you cannot return it either"
                    );
            } else {
                throw new Error("this book is already in the library!");
            }
        }
    },

    borrowHistory(membershipID) {
        if (!this.hasMember(membershipID))
            throw new Error("this member does not exist!");
        let recs = this.history;
        recs = recs.filter((record) => record.membershipID == membershipID);
        recs = recs.filter((record) => record.returnDate == null);
        return recs;
    },

    searchHistory(membershipID, isbn) {
        let recs = this.history;
        if (this.hasMember(membershipID))
            recs.filter((record) => record.membershipID == membershipID);
        if (this.hasBook(isbn)) {
            recs = recs.filter((record) => record.isbn == isbn);
        }
        return recs;
    },
};

module.exports = myLibrary;
