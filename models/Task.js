const db = require("mongoose");

const task = db.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: "active"
    }
});

module.exports = db.model("Task", task, "Tasks");