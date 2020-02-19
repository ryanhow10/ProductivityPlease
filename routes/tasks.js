const express = require("express");
const Task = require("./../models/Task");
const router = express.Router();

//Get all tasks
router.get("/", (req, res) => {
    Task.find({status: "active"}, (err, data) => {
        if(!err){
            res.json(data);
        } else{
            res.send(err);
        }
    });
});

//Get spcific task
router.get("/:taskId", (req, res) => {
    Task.findById(req.params.taskId, (err, data) => {
        if(!err){
            res.json(data);
        } else{
            res.send(err);
        }
    }); 
});

//Add task
router.post("/", (req, res) => {
    let task = new Task({
        title: req.body.title,
        description: req.body.description
    });
    task.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.send(err);
        });
});

//Update task completion to true
router.put("/:postId", (req, res) => {
    Task.findByIdAndUpdate(req.params.postId, {completed: true}, (err, data) => {
        if(!err){
            res.json(data);
        } else{
            res.send(err);
        }
    });
});

//"Delete" task - set status to non-active
router.delete("/:postId", (req, res) => {
    Task.findByIdAndUpdate(req.params.postId, {status: "non-active"}, (err, data) => {
        if(!err){
            res.json(data);
        } else{
            res.send(err);
        }
    });
});

module.exports = router;