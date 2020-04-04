const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const message = mongoose.model('message',new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    content: {type: String, required: true},
    date: {type: Date, default: Date.now},
    children: [
        {
            user: {type: Schema.Types.ObjectId, ref: 'user',required: true},
            content: {type: String, required: true},
            atUserName: {type: String,required: true},
            date: {type: Date,default: Date.now}
        }
    ]
}));

module.exports = message;