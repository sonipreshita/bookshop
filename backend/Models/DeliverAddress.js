var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    is_deleted: {
        type: String,
        default: 'false'
    }
});
module.exports = mongoose.model('Addresses', addressSchema);