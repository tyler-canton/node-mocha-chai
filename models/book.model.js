const mongoose = require('mongoose');
const Schema = mongoose.Schema

const validate = require('mongoose-validator');

let BookSchema = mongoose.Schema({
    instId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: { type: String },
    role: { enum: ['student', 'academic', 'administrator'], },
    phone: {
        type: String, lowercase: true, trim: true, index: true, unique: true, sparse: true,//sparse is because now we have two possible unique keys that are optional
        validate: [validate({
            validator: 'isNumeric',
            arguments: [7, 20],
            message: 'Not a valid phone number.',
        })]
    },
    email: {
        type: String, lowercase: true, trim: true, index: true, unique: true, sparse: true,
        validate: [validate({
            validator: 'isEmail',
            message: 'Not a valid email.',
        }),]
    },
    password: { type: String },
}, { toJSON: { timestamps: true } });

BookSchema.methods.Institutions = async function () {
    let err, institutions;
    [err, institutions] = await to(Institution.find({ 'book': this._id }));
    if (err) TE('err getting institutions');
    return institutions;
};

module.exports = mongoose.model('Book', BookSchema);
