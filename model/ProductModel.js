const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const products = new Schema({
    masp: { type: String, required: true },
    tensp: { type: String, required: true },
    gia: { type: Number, required: true },
    soluong: { type: Number, required: true }
});

module.exports = mongoose.models.Product || mongoose.model('Product', products);