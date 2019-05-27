
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    payment: {
        type: String
    },
    date: {
        type: String,
        default: Date()
    },
    // totalprice: {
    //     type: Number,
    //     required: true
    // },
    user_id: {
        type: String,
        required: true,
        ref: 'User'
    },
    deliver_id: {
        type: String,
        required: true,
        ref: 'Addresses'
    },
    order_Item: {
        //type: Array,
        type: String,
        required: true,
        ref: 'OrderItem',
        default: null
    },
    charge_id: {
        type: String
    },
    promocode_id: {
        type: String,
        ref: 'PromoCode',
        default: null
    },
    
});
module.exports = mongoose.model('Order', orderSchema);