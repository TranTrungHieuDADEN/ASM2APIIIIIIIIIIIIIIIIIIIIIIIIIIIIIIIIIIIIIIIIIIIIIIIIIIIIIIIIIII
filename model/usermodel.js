const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    name: { type: String, required: true },
    pass: { type: String, required: true },
    age: { type: Number, required: true },
});

module.exports = mongoose.models.Login || mongoose.model('Login', loginSchema);