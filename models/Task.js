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
    completed: {
        type: Boolean,
        default: false,
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

module.exports = db.model("Task", task, "Tasks");