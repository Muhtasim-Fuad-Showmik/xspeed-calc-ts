const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mathResultSchema = new Schema({
    title: String,
    solution: Number,
    filePath: String
});

module.exports = mongoose.model("MathResult", mathResultSchema);