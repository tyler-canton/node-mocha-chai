const mongoose = require('mongoose');

let CompanySchema = mongoose.Schema({
    name: { type: String },
    users: [{ user: { type: mongoose.Schema.ObjectId, ref: 'User' }, permissions: [{ type: String }] }],
}, { timestamps: true });

CompanySchema.methods.toWeb = function () {
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

module.exports = mongoose.model('Company', CompanySchema);

