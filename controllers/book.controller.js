const { Institution, Book } = require('../models');
const { authService } = require('../services/auth.service');

const { to, ReE, ReS } = require('../services/utilities/jsend');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, book;
    let book_info = req.body;
    // Validate and create book
    [err, book] = await to(authService.authBook(book_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { book: book.toWeb() }, 201);
}
module.exports.create = create;

const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, books, user = req.user;

    [err, books] = await to(Book.UserInstitutionBooks(user));
    if (err) return ReE(res, err, 422);

    let books_json = []
    for (let i in books) {
        let book = books[i];
        books_json.push(book.toWeb())
    }
    return ReS(res, { books: books_json });
}
module.exports.getAll = getAll;

const get = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let book = req.book;
    return ReS(res, { book: book.toWeb() });
}
module.exports.get = get;

const update = async function (req, res) {
    let err, book, data;
    book = req.user;
    data = req.body;
    book.set(data);

    [err, book] = await to(book.save());
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, { book: book.toWeb() });
}
module.exports.update = update;

const remove = async function (req, res) {
    let book, err;
    book = req.book;

    [err, book] = await to(book.remove());
    if (err) return ReE(res, 'error occured trying to delete the book');

    return ReS(res, { message: 'Deleted Institution' }, 204);
}
module.exports.remove = remove;