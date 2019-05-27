var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartSchema = new Schema({

    book_id: {
        type: String,
        ref: 'Book'
    },
    title: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    user: {
        type: String,
        //unique:true,
    },
    category: {
        type: String
    },
    quantity: {
        type: Number
    },
    status: {
        type: String,
        default: 'Confirmed'
    },
    offer: {
        type: String,
        default: "No Offer for this book"
    },
    item_return_request: {
        type: String,
        default: 'NO'
    }
});
module.exports = mongoose.model('Cart', cartSchema);