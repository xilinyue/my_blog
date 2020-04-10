const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let visitorSchema = new Schema({
    username: {type: String, required: true},
    avatar: {type: String, required: true},
    date: {type: Date,default: Date.now}
});

let visitorModel = mongoose.model('visitor',visitorSchema);

module.exports = visitorModel;