const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let commentSchema = new Schema({
    user: {type: Schema.ObjectId,ref: 'user',required: true},
    content: {type: String, required: true},
    date: {type: Date,default: Date.now},
    children: [
        {
            user: {type: Schema.Types.ObjectId, ref: 'user',required: true},
            content: {type: String, required: true},
            atUserName: {type: String,required: true},
            date: {type: Date,default: Date.now}
        }
    ]
});

module.exports = mongoose.model('comment',commentSchema);