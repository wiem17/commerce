const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    image:
        {
            type: Array,
            required:true
        }
   
},{minimize:false}
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;