const express = require("express");
const db = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const tasks = require("./routes/tasks");
const deadlines = require("./routes/deadlines");
require("dotenv/config");
const app = express();

app.use(cors());

app.use(bodyParser());

app.use("/tasks", tasks);
app.use("/deadlines", deadlines);

db.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () => {
    console.log("Connected to DB");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});

