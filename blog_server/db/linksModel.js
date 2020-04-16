const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let linksSchema = new Schema({
    icon: {type: String, required: true},
    name: {type: String, required: true},
    desc: {type: String, required: true},
    webLink: {type: String, required: true},
    date: {type: Date, default: Date.now},
});

let linksModel = mongoose.model('links',linksSchema);

module.exports = linksModel;