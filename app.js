const express = require("express");
const db = require("mongoose");
const bodyParser = require("body-parser");
const tasks = require("./routes/tasks");
require("dotenv/config");
const app = express();

app.use("/tasks", tasks);

db.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () => {
    console.log("Connected to DB");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
