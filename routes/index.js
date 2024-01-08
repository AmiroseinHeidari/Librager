var express = require("express");
var router = express.Router();
const library = require("../models/Library.js");
const Book = require("../models/Book.js");
const Member = require("../models/Member.js");

router.route("/addBook").post(function (req, res, next) {
    try {
        library.addBook(
            new Book(req.body.author, req.body.title, req.body.isbn)
        );
        res.json("success");
    } catch (err) {
        res.status(404).json(err.message);
    }
});

router.route("/books").get(function (req, res) {
    res.json(
        library.books.map((book) => {
            return { isbn: book.isbn, info: book.info() };
        })
    );
});

router.route("/register").post(function (req, res, next) {
    try {
        library.register(new Member(req.body.membershipID, req.body.name, []));
        res.json("success");
    } catch (err) {
        res.status(404).json(err.message);
    }
});

router.route("/borrowBook").post(function (req, res) {
    try {
        library.record(req.body.membershipID, req.body.isbn, "borrow");
        const member = library.members.find(
            (member) => member.membershipID == req.body.membershipID
        );
        const book = library.books.find((book) => book.isbn == req.body.isbn);
        member.borrow(book);
        res.json("success");
    } catch (err) {
        res.status(404).json(err.message);
    }
});

router.route("/returnBook").post(function (req, res) {
    try {
        library.record(req.body.membershipID, req.body.isbn, "return");
        const member = library.members.find(
            (member) => member.membershipID == req.body.membershipID
        );
        const book = library.books.find((book) => book.isbn == req.body.isbn);
        member.giveBack(book);
        res.json("success");
    } catch (err) {
        res.status(404).json(err.message);
    }
});

router.route("/member/:id").get(function (req, res) {
    try {
        const a = library.borrowHistory(req.params.id);
        res.json(a);
    } catch (err) {
        res.status(404).json(err.message);
    }
});

router.route("/hasMember/:id").get(function (req, res) {
    const condition = library.hasMember(req.params.id);
    if (condition) res.status(200).json("success");
    else {
        res.status(404).json("no such a member");
    }
});

router.route("/history").get(function (req, res) {
    try {
        res.json(library.searchHistory(req.body?.membershipID, req.body?.isbn));
    } catch (err) {
        res.status(404).json(err.message);
    }
});
module.exports = router;
