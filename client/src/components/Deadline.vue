<template>
    <div id="deadline" v-bind:style="{background: deadline.colour}">
        <div class="row-fluid" id="deadlineDate" v-bind:contentEditable="edit">{{ deadline.date }}</div>
        <div class="row-fluid" id="deadlineDescription" v-bind:contentEditable="edit">{{ deadline.description }}</div>
        <div class="row-fluid" id="edit">
            <i class="fas fa-edit" id="editDeadline" v-on:click="editDeadline"></i>
            <i class="fa fa-trash" id="trash" v-on:click="deleteDeadline"></i>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Deadline",
    props: {
        deadline: Object
    },
    data: function() {
        return {
            root: "http://localhost:3000"
        }
    },
    methods: {
        deleteDeadline: function() {
            axios.delete(this.root + '/deadlines/' + this.deadline._id)
                .then(resp => {
                    console.log("Successfully deleted deadline. " + resp.data);
                    this.$emit('refreshDeadlines');
                })
                .catch(err => {
                    console.log("Error deleting deadline. " + err);
                })
        },
        editDeadline: function() {
            this.$emit('editIndividualDeadline', this.deadline);
        }
    }
}
</script>

<style>
#deadline {
    margin-top: 1em;
    border: 0.05em solid #2c3e50;
    border-radius: 0.5em;
}

#deadlineDate {
    font-weight: bolder;
    border-bottom: 0.05em solid #2c3e50;
    padding-left: 0.5em;
}

#deadlineDescription {
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    padding-left: 0.5em;
    padding-right: 0.5em;
}

#edit {
    text-align: right;
}

#edit:hover {
    cursor: pointer;
}

#trash {
    margin: 0.5em;
}

#trash:hover {
    cursor: pointer;
}

#editDeadline:hover {
    cursor: pointer;
}

#cancelEdit {
    margin: 0.5em;
}

#cancelEdit:hover {
    cursor: pointer;
}

#applyEdit:hover {
    cursor: pointer;
}
</style>
