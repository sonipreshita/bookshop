var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ratingSchema = new Schema({
    book_id: {
        type: String,
    },
    user_id: {
        type: String,
        ref: "User"
    },
    rate: {
        type: Number,
        //required: true
    },
    comment: {
        type: String,
        //required: true
    },
    title: {
        type: String,
        //required: true
    }
});
module.exports = mongoose.model('BookRating', ratingSchema);