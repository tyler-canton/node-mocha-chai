const Institution = require('../models/institution.model');
const { to, ReE } = require('../services/utilities/jsend');

let institution = async function (req, res, next) {
    let institution_id, err, institution;
    institution_id = req.params.institution_id;

    [err, institution] = await to(Institution.findOne({ _id: institution_id }));
    if (err) return ReE(res, "err finding institution");

    if (!institution) return ReE(res, "Institution not found with id: " + institution_id);
    let user, users_array;
    user = req.user;
    users_array = institution.users.map(obj => String(obj.user));

    if (!users_array.includes(String(user._id))) return ReE(res, "User does not have permission to read app with id: " + app_id);

    req.institution = institution;
    next();
}
module.exports.institution = institution;