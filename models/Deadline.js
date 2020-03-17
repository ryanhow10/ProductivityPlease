const db = require("mongoose");

const deadline = db.Schema({
    date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "active",
        required: true
    },
    colour: {
        type: String,
        required: true
    }
});

module.exports = db.model("Deadline", deadline, "Deadlines");