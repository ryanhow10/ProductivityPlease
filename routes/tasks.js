const express = require("express");
const Task = require("./../models/Task");
const router = express.Router();

router.get("/", (req, res) => {
    Task.find((err, data) => {
        if(!err){
            res.json(data);
        } else{
            res.send(err);
        }
    });
});

module.exports = router;