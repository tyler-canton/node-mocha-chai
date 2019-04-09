const { User, Institution } = require('../models');
const validator = require('validator');
const { to, TE } = require('./utilities/jsend');

const getUniqueKeyFromBody = function (body) {// this is so they can send in 3 options unique_key, email, or phone and it will work
    let unique_key = body.unique_key;

    if (typeof body.email != 'undefined') {
        unique_key = body.email
    } else if (typeof body.phone != 'undefined') {
        unique_key = body.phone
    } else {
        unique_key = null;
    }


    return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createUser = async function (userInfo) {
    let unique_key, auth_info, err;

    auth_info = {}
    auth_info.status = 'create';

    unique_key = getUniqueKeyFromBody(userInfo);
    if (!unique_key) TE('An email or phone number was not entered.');

    if (validator.isEmail(unique_key)) {
<<<<<<< HEAD

        let domain_name = unique_key.split('@').pop();
        [err, institutions] = await to(Institution.find({ 'domain': domain_name }));
        if (institutions.length === 0) TE('User not affiliated with institutions', true);

=======
        // Get unique_key to find Institution and populate instId into the User
        let domain_name = unique_key.split('@').pop();
        [err, institutions] = await to(Institution.find({ 'domain': domain_name }));
        if (institutions.length === 0) TE('User not affiliated with institutions', true);
        userInfo.instId = institutions._id
>>>>>>> Init application with auth/jwt/test
        auth_info.method = 'email';
        userInfo.email = unique_key;

        [err, user] = await to(User.create(userInfo));
        if (err) TE('user already exists with that email');

        return user;

    } else {
        TE('A valid email or phone number was not entered.');
    }
}
module.exports.createUser = createUser;

const authUser = async function (userInfo) {//returns token
    let unique_key;
    let auth_info = {};
    auth_info.status = 'signin';
    unique_key = getUniqueKeyFromBody(userInfo);

    if (!unique_key) TE('Please enter an email or phone number to signin');


    if (!userInfo.password) TE('Please enter a password to signin');

    let user;
    if (validator.isEmail(unique_key)) {
        auth_info.method = 'email';

        [err, user] = await to(User.findOne({ email: unique_key }));
        if (err) TE(err.message);

    } else if (validator.isMobilePhone(unique_key, 'any')) {//checks if only phone number was sent
        auth_info.method = 'phone';

        [err, user] = await to(User.findOne({ phone: unique_key }));
        if (err) TE(err.message);

    } else {
        TE('A valid email or phone number was not entered');
    }

    if (!user) TE('Not registered');

    [err, user] = await to(user.comparePassword(userInfo.password));

    if (err) TE(err.message);

    return user;

}
module.exports.authUser = authUser;

const authBook = async function (bookInfo) {
    let book;
    const { isbn, title, author } = bookInfo;
    if (validator.isISBN(isbn)) {
        [err, book] = await to(Book.findOne({ isbn: isbn }));
        if (err) TE('Book already saved for this institution', true);
        [err, book] = await to(Book.create(book_info));
        if (err) return ReE(res, err, 422);
    }
    return book;
}
module.exports.authBook = authBook;

