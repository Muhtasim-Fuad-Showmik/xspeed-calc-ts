const mongoose = require("mongoose");

const mathResultSchema = {
    title: String,
    solution: Number,
    filePath: String
}

const mathResultSchema = mongoose.model("mathResult", mathResultSchema);

module.exports = mathResult;