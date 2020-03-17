const express = require("express");
const Task = require("./../models/Task");
const router = express.Router();

//Get all active tasks
router.get("/", async (req, res) => {
    try{
        let tasks = await Task.find({status: "active"});
        res.json(tasks);
    } catch(err){
        res.send({message: "Failed to retrieve tasks", error: err});
    }
});

//Get spcific task
router.get("/:taskId", async (req, res) => {
    try{
        let task = await Task.findById(req.params.taskId);
        res.json(task);
    } catch(err){
        res.send({message: "Failed to retrieve task", error: err});
    }
});

//Add task
router.post("/", async (req, res) => {
    let task = new Task({
        title: req.body.title,
        description: req.body.description,
        colour: req.body.colour
    });
    try{
        let newTask = await task.save();
        res.json(newTask);
    } catch(err){
        res.send({message: "Failed to add new task", error: err});
    }
});

//Update task (title and/or description)
router.put("/:postId/edit", async (req, res) => {
    try{
        let updatedTask = await Task.findByIdAndUpdate(req.params.postId, {title: req.body.title, description: req.body.description});
        res.json(updatedTask);
    } catch(err){
        res.send({message: "Failed to update task", error: err});
    }
});

//Update task completion to true
router.put("/:postId/:completed", async (req, res) => {
    try{
        let completedTask = await Task.findByIdAndUpdate(req.params.postId, {completed: req.params.completed});
        res.json(completedTask);
    } catch(err){
        res.send({message: "Failed to update task completion", error: err});
    }
});

//"Delete" task - set status to non-active
router.delete("/:postId", async (req, res) => {
    try{
        let deletedTask = await Task.findByIdAndUpdate(req.params.postId, {status: "non-active"});
        res.json(deletedTask);
    } catch(err){
        res.send({message: "Failed to delete task", error: err});
    }
});

module.exports = router;