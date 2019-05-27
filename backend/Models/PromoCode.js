var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var promocodeSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    amount: {
        type: Number,
        required: true  //minimum amount to apply promocode
    },
    description: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('PromoCode', promocodeSchema);