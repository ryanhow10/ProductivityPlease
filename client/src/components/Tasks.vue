<template>
    <div id="tasks">
        <b-modal id="addTask" title="Add Task" class="modal-backdrop" hide-footer=true centered>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Title</span>
                </div>
                <input type="text" class="form-control" placeholder="Task title" v-model="taskTitle">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Description</span>
                </div>
                <input type="text" class="form-control" placeholder="Task description" v-model="taskDescription">
            </div>
            <div id="applyOrCancel">
                <button type="button" class="btn lightGreen" v-on:click="addTask">Save</button>
                <button type="button" class="btn salmon" v-on:click="cancelNewTask">Cancel</button>
            </div>
        </b-modal>
        <b-modal id="editIndividualTask" title="Edit Task" class="modal-backdrop" hide-footer=true centered>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Title</span>
                </div>
                <input type="text" class="form-control" placeholder="Task title" v-model="editedTitle">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Description</span>
                </div>
                <input type="text" class="form-control" placeholder="Task description" v-model="editedDescription">
            </div>
            <div id="applyOrCancel">
                <button type="button" class="btn lightGreen" v-on:click="saveTaskEdit">Save</button>
                <button type="button" class="btn salmon" v-on:click="cancelTaskEdit">Cancel</button>
            </div>
        </b-modal>
        <div class="row">
            <div class="col-10">
                <p id="task">Tasks</p>
            </div>
            <div class="col-2">
                <button type="button" class="btn salmon btn-sm" v-on:click="newTask">New Task</button>
            </div>
        </div>
        <div class="row">
                <Task v-for="task in tasks" v-bind:key="task._id" v-bind:task="task" v-on:refreshTasks="getTasks" v-on:editIndividualTask="editIndividualTask"></Task>
        </div>
    </div>
</template>

<script>
import Task from './Task.vue'
import axios from 'axios'

export default {
    name: "Tasks",
    components: {
        Task
    },
    data: function() {
        return {
            root: "http://localhost:3000",
            tasks: [],
            colours: [
                "#DBB5F7",
                "#F8C2CE",
                "#FDF4AB",
                "#C2F39F",
                "#98DEF3",
                "#AAB3F3"
            ],
            taskTitle: "",
            taskDescription: "",
            editedTaskId: "",
            editedTitle: "",
            editedDescription: ""
        }
    },
    mounted: function() {
        this.getTasks();
    },
    methods: {
        getTasks: function() {
            axios.get(this.root + '/tasks')
                .then(resp => {
                    this.tasks = resp.data;
                })
                .catch(err => {
                    console.log("Error retrieving tasks: " + err)
                })
        },
        newTask: function() {
            this.$bvModal.show('addTask');
        },
        addTask: function() {
            axios.post(this.root + '/tasks', {
                title: this.taskTitle,
                description: this.taskDescription,
                colour: this.colours[Math.floor(Math.random() * this.colours.length)]
            })
                .then(resp => {
                    console.log("Successfully added new task. " + resp.data);
                    this.taskTitle = "";
                    this.taskDescription = "";
                    this.getTasks();
                    this.$bvModal.hide('addTask');
                })
                .catch(err => {
                    console.log("Error adding new task. " + err);
                });
        },
        cancelNewTask: function() {
            this.taskTitle = "";
            this.taskDescription = "";
            this.$bvModal.hide('addTask');
        },
        editIndividualTask: function(task) {
            this.editedTaskId = task._id;
            this.editedTitle = task.title;
            this.editedDescription = task.description;
            this.$bvModal.show('editIndividualTask');
        },
        saveTaskEdit: function() {
            console.log(this.editedTitle);
            axios.put(this.root + '/tasks/' + this.editedTaskId + '/edit', {
                title: this.editedTitle,
                description: this.editedDescription
            })
                .then(resp => {
                    console.log("Successfully updated task. " + resp.data);
                    this.getTasks();
                })
                .catch(err => { 
                    console.log("Failed to update task. " + err);
                });
            this.$bvModal.hide('editIndividualTask');
        },
        cancelTaskEdit: function() {
            this.$bvModal.hide('editIndividualTask');
        }
    }
}
</script>

<style>
#task {
    margin-top: 0.5em;
    margin-bottom: 0;
    font-size: 1.25em;
    font-weight: bold;
}

.salmon {
    margin-top: 0.75em;
    margin-bottom: 0;
    margin-left: 0.5em;
    border: 0.05em solid #2c3e50;
    background: #ff7883;
    color: white;
}

#newTask {
    margin-top: 1em;
    margin-bottom: 0;
    border: 0.05em solid #2c3e50;
    border-radius: 0.5em;
    padding: 0.5em;
}

</style>
