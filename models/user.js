const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    titles: [{type: Schema.Types.ObjectId, ref:'Title'}],
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);