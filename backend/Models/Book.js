var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    cate_id: {
        type: String,
        ref: 'Category'
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    pages: {
        type: String,
        required: true
    },
    isbn_13: {
        type: Number,
        required: true
    },
    isbn_10: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    // year: {
    //     type: Number,
    //     required: true
    // },
    desc: {
        type: String,
        required: true
    },
    offer: {
        type: String,
        default: "No Offer for this book"
    }
});
module.exports = mongoose.model('Book', bookSchema);