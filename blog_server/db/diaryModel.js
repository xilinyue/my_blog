const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let diarySchema = new Schema({
    title: {type: String, required: true},
    date: {type: Date, default: Date.now},
    content: {type: String, required: true},
    imgArr: [String]
});

let diaryModel = mongoose.model('diary',diarySchema);

module.exports = diaryModel;