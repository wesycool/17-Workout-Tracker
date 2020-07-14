const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    type: String,
    name: String,
    duration: Number,
    distance:Number,
    weight: Number,
    reps: Number,
    sets: Number
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;