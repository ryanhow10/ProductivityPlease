<template>
    <div id="individualTask" v-bind:style="{background: task.colour}">
        <div class="row-fluid" id="header" v-bind:style="[task.completed ? {'text-decoration': 'line-through'} : '']">{{ task.title }}</div>
        <div class="row-fluid" id="taskDescription" v-bind:style="[task.completed ? {'text-decoration' : 'line-through'} : '']">{{ task.description }}</div>
        <div class="row-fluid" id="edit">
            <label for="completed">Completed</label>
            <input type="checkbox" v-model="completed" id="completed" v-on:change="updateCompleteness">
            <i class="fas fa-edit" v-on:click="editTask"></i>
            <i class="fa fa-trash" id="trash" aria-hidden="true" v-on:click="deleteTask"></i>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Task",
    props: {
        task: Object
    },
    data: function() {
        return {
            root: "http://localhost:3000",
            completed: this.task.completed
        }
    },
    methods: {
        deleteTask: function () {
            axios.delete(this.root + '/tasks/' + this.task._id)
                .then(resp => {
                    console.log("Successfully delete task. " + resp.data);
                    this.$emit('refreshTasks');
                })
                .catch(err => {
                    console.log("Error deleting task. " + err)
                })
        },
        updateCompleteness: function() {
            axios.put(this.root + '/tasks/' + this.task._id + '/' + this.completed)
                .then(resp => {
                    console.log("Successfully updated task completeness. " + resp.data);
                    this.$emit('refreshTasks');
                })
                .catch(err => {
                    console.log("Error updating task completeness. " + err);
                });
        },
        editTask: function() {
            this.$emit('editIndividualTask', this.task);
        }
    }
}
</script>

<style>
#individualTask {
    margin: 1em;
    border: 0.05em solid #2c3e50;
    border-radius: 0.5em;
}

#header {
    font-weight: bolder;
    border-bottom: 0.05em solid #2c3e50;
    padding-left: 0.5em;
    padding-right: 0.5em;
}

#taskDate {
    text-align: right;
}

#taskDescription {
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    padding-left: 0.5em;
    padding-right: 0.5em;
}

#edit {
    text-align: right;
}

#completed {
    margin: 0.5em;
    vertical-align: 0.075em;
}
</style>
