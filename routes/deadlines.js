const express = require("express");
const Deadline = require("./../models/Deadline");
const router = express.Router();

//Get all active deadlines
router.get("/", async (req, res) => {
    try{
        let deadlines = await Deadline.find({status: "active"});
        res.json(deadlines);
    } catch(err){
        res.send({message: "Failed to retrieve deadlines", error: err});
    }
});

//Get specific deadline
router.get("/:deadlineId", async (req, res) => {
    try{
        let deadline = await Deadline.findById(req.params.deadlineId);
        res.json(deadline);
    } catch(err){
        res.send({message: "Failed to retrieve deadline", error: err});
    }
});

//Create new deadline
router.post("/", async (req, res) => {
    const deadline = new Deadline({
        date: req.body.date,
        description: req.body.description,
        colour: req.body.colour
    });
    try{
        let newDeadline = await deadline.save();
        res.json(newDeadline);
    } catch(err){
        res.send({message: "Failed to add deadline", error: err});
    }
});

//Update deadline details
router.put("/:deadlineId/edit", async (req, res) => {
    try{
        let updatedDeadline = await Deadline.findByIdAndUpdate(req.params.deadlineId, {date: req.body.date, description: req.body.description});
        res.json(updatedDeadline);
    } catch(err){
        res.send({message: "Failed to update deadline", error: err});
    }
});

//Delete deadline
router.delete("/:deadlineId", async (req, res) => {
    try{
        let deletedDeadline = await Deadline.findByIdAndUpdate(req.params.deadlineId, {status: "non-active"});
        res.json(deletedDeadline);
    } catch(err){
        res.send({message: "Failed to delete deadline", error: err});
    }
});

module.exports = router;