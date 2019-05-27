var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wishListSchema = new Schema({
    book_id: {
        type: String,
        unique: true,
        ref: 'Book'
    },
    user_id: {
        type: String,
        ref: 'User'
    },
});
module.exports = mongoose.model('WishList', wishListSchema);