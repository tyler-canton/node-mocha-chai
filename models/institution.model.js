const mongoose = require('mongoose');
const validate = require('mongoose-validator');

let InstitutionSchema = mongoose.Schema({
    email: {
        type: String, lowercase: true, trim: true, index: true, unique: true, sparse: true,
        validate: [validate({
            validator: 'isEmail',
            message: 'Not a valid email.',
        }),]
    },
    name: { type: String },
    domain: { type: String }
}, { toJSON: { virtuals: true } });

InstitutionSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'instId',
    justOne: false // set true for one-to-one relationship
});

InstitutionSchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'instId',
    justOne: false // set true for one-to-one relationship
});
<<<<<<< HEAD
=======
InstitutionSchema.set('toObject', { virtuals: true });
InstitutionSchema.set('toJSON', { virtuals: true });
>>>>>>> Init application with auth/jwt/test

InstitutionSchema.methods.toWeb = function () {
    let json = this.toJSON();
    json.id = this._id;//this is for the front end
    return json;
};

module.exports = mongoose.model('Institution', InstitutionSchema);

