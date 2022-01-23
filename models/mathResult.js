const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mathResultSchema = new Schema({
    title: String,
    solution: Number,
    inputContent: String,
    filePath: String,
    index: Number
});

module.exports = mongoose.model("MathResult", mathResultSchema);