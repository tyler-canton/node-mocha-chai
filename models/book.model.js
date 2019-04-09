const mongoose = require('mongoose');
const Schema = mongoose.Schema

let BookSchema = mongoose.Schema({
    instId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: { type: String },

}, { timestamps: { createdAt: 'created_at' } });

BookSchema.set('toObject', { virtuals: true });
BookSchema.set('toJSON', { virtuals: true });

BookSchema.methods.UserInstitutionBooks = async function () {
    let err, institutions;
    [err, institutions] = await to(Institution.find({ 'user': this._id }).populate('books'));
    if (err) TE('err getting institutions');
    console.log(`Booking and Gooking baby ${institutions}`);
    
    return institutions;
};
module.exports = mongoose.model('Book', BookSchema);
