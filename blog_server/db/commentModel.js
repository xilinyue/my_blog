const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let commentSchema = new Schema({
    
});

module.exports = mongoose.model('comment',commentSchema);