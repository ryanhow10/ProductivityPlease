const express = require("express");
const Deadline = require("./../models/Deadline");
const router = express.Router();

router.get("/", async (req, res) => {
    try{
        let deadlines = await Deadline.find({status: "active"});
        res.json(deadlines);
    } catch(err){
        res.send({message: "Failed to get deadlines", error: err});
    }
});

router.post("/", async (req, res) => {
    const deadline = new Deadline({
        date: req.body.date,
        description: req.body.description
    });
    try{
        let newDeadline = await deadline.save();
        res.json(newDeadline);
    } catch(err){
        res.send({message: "Failed to add deadline", error: err});
    }
});

module.exports = router;