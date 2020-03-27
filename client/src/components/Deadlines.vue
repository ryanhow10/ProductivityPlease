<template>
    <div id="deadlines">
        <b-modal id="addDeadline" title="Add Deadline" class="modal-backdrop" hide-footer=true centered>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Date</span>
                </div>
                <input type="text" class="form-control" placeholder="Deadline date" v-model="deadlineDate">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Description</span>
                </div>
                <input type="text" class="form-control" placeholder="Deadline description" v-model="deadlineDescription">
            </div>
            <div id="applyOrCancel">
                <button type="button" class="btn lightGreen" v-on:click="addDeadline">Save</button>
                <button type="button" class="btn salmon" v-on:click="cancelNewDeadline">Cancel</button>
            </div>
        </b-modal>
        <b-modal id="editIndividualDeadline" title="Edit Deadline" class="modal-backdrop" hide-footer=true centered>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Date</span>
                </div>
                <input type="text" class="form-control" placeholder="Deadline date" v-model="editedDate">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">Description</span>
                </div>
                <input type="text" class="form-control" placeholder="Deadline description" v-model="editedDescription">
            </div>
            <div id="applyOrCancel">
                <button type="button" class="btn lightGreen" v-on:click="saveDeadlineEdit">Save</button>
                <button type="button" class="btn salmon" v-on:click="cancelDeadlineEdit">Cancel</button>
            </div>
        </b-modal>
        <div class="row">
            <div class="col-7">
                <p id="deadlineHeader">Upcoming Deadlines</p>
            </div>
            <div class="col-5">
                <button type="button" class="btn salmon btn-sm" v-on:click="newDeadline">New Deadline</button>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <Deadline v-for="deadline in deadlines" v-bind:key="deadline._id" v-bind:deadline="deadline" v-on:refreshDeadlines="getDeadlines" v-on:editIndividualDeadline="editIndividualDeadline"></Deadline>
            </div>
        </div>
    </div>
</template>

<script>
import Deadline from './Deadline.vue'
import Vue from 'vue'
import BModal from 'bootstrap-vue'
import VModal from 'vue-js-modal'
import axios from 'axios'

 
Vue.use(VModal)
Vue.use(BModal)

export default {
    name: "Deadlines",
    components: {
        Deadline
    },
    data: function() {
        return {
            root: "http://localhost:3000",
            deadlines: [],
            colours: [
                "#DBB5F7",
                "#F8C2CE",
                "#FDF4AB",
                "#C2F39F",
                "#98DEF3",
                "#AAB3F3"
            ],
            deadlineDate: "",
            deadlineDescription: "",
            editedDeadlineId: "",
            editedDate: "",
            editedDescription: "",
        }
    },
    mounted: function() {
        this.getDeadlines();
    },
    methods: {
        getDeadlines: function() {
            axios.get(this.root + "/deadlines")
                .then(resp => {
                    this.deadlines = resp.data;
                })
                .catch(err => {
                    console.log("Error retrieving deadlines: " + err);
                });
        },
        newDeadline: function() {
            this.$bvModal.show('addDeadline');
        },
        addDeadline: function() {
            axios.post(this.root + "/deadlines", {
                date: this.deadlineDate,
                description: this.deadlineDescription,
                colour: this.colours[Math.floor(Math.random() * this.colours.length)]
            })
                .then(resp => {
                    console.log("Successfully added new deadline. " + resp.data);
                    this.deadlineDate = "";
                    this.deadlineDescription = "";
                    this.getDeadlines();
                    this.$bvModal.hide('addDeadline');
                })
                .catch(err => {
                    console.log("Error adding new deadline. " + err);
                });
        },
        cancelNewDeadline: function() {
            this.deadlineDate = "";
            this.deadlineDescription = "";
            this.$bvModal.hide('addDeadline');
        },
        editIndividualDeadline: function(deadline) {
            this.editedDeadlineId = deadline._id;
            this.editedDate = deadline.date;
            this.editedDescription = deadline.description;
            this.$bvModal.show('editIndividualDeadline');
        },
        saveDeadlineEdit: function() {
            axios.put(this.root + '/deadlines/' + this.editedDeadlineId + '/edit', {
                date: this.editedDate,
                description: this.editedDescription
            })
                .then(resp => {
                    console.log("Successfully updated deadline. " + resp.data);
                    this.getDeadlines();
                    this.$bvModal.hide('editIndividualDeadline');
                })
                .catch(err => { 
                    console.log("Failed to update deadline. " + err);
                });
        },
        cancelDeadlineEdit: function() {
            this.$bvModal.hide('editIndividualDeadline');
        }
    }
}
</script>

<style>
#deadlineHeader {
    margin-top: 0.5em;
    margin-bottom: 0;
    font-size: 1.25em;
    font-weight: bold; 
}

#newDeadline {
    margin-top: 1em;
    margin-bottom: 0;
    border: 0.05em solid #2c3e50;
    border-radius: 0.5em;
    padding: 0.5em;
}

.salmon {
    margin-top: 0.75em;
    margin-bottom: 0;
    margin-left: 0.5em;
    background: #ff7883;
    color: white;
}

.lightGreen {
    margin-top: 0.75em;
    margin-bottom: 0;
    margin-left: 0.5em;
    border: 0.05em solid #2c3e50;;
    background: #7aeb7a;
    color: white;
}

#addOrCancel {
    text-align: right;
}

#applyOrCancel {
    text-align: right;
}

.modal-backdrop {
    opacity: 0.25 !important;
}
</style>
