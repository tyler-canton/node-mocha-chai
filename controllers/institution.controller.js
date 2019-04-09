const { Institution } = require('../models');
const { to, ReE, ReS } = require('../services/utilities/jsend');

const create = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let err, institution;
    let user = req.user;

    let institution_info = req.body;
    institution_info.users = [{ user: user._id }];

    [err, institution] = await to(Institution.create(institution_info));
    if (err) return ReE(res, err, 422);

    return ReS(res, { institution: institution.toWeb() }, 201);
}
module.exports.create = create;

const getAll = async function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, institutions;
    [err, institutions] = await to(user.Institutions());

    let institutions_json = []
    for (let i in institutions) {
        let institution = institutions[i];
        institutions_json.push(institution.toWeb())
    }
    return ReS(res, { institutions: institutions_json });
}
module.exports.getAll = getAll;

const get = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let institution = req.institution;
    return ReS(res, { institution: institution.toWeb() });
}
module.exports.get = get;

const update = async function (req, res) {
    let err, institution, data;
    institution = req.user;
    data = req.body;
    institution.set(data);

    [err, institution] = await to(institution.save());
    if (err) {
        return ReE(res, err);
    }
    return ReS(res, { institution: institution.toWeb() });
}
module.exports.update = update;

const remove = async function (req, res) {
    let institution, err;
    institution = req.institution;

    [err, institution] = await to(institution.remove());
    if (err) return ReE(res, 'error occured trying to delete the institution');

    return ReS(res, { message: 'Deleted Institution' }, 204);
}
module.exports.remove = remove;