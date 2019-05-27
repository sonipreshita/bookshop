var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderitemSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    order: {
        type: Array,
        required: true
    },
    promocode_id: {
        type: String,
        ref: 'PromoCode'
    },
    totalPrice: {
        type: String
    },
    return_request: {
        type: String,
        default: 'NO'
    }
});
module.exports = mongoose.model('OrderItem', orderitemSchema);