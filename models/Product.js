const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        transform: function(doc, ret) {
            delete ret._id;
            delete ret.__v;

            // Change the default date string formating to the required format
            ret.dateCreated = ret.dateCreated.toString();
        }
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;