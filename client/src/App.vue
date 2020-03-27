<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-9">
        <HelloRyan v-bind:quote="quote"></HelloRyan>
      </div>
      <div class="col-3">
        <Time></Time>
      </div>
    </div>
    <div class="row bordered">
      <div class="col-3 bordered-right">
       <Deadlines></Deadlines>
      </div>
      <div class="col-6 bordered-right">
        <Tasks></Tasks>
      </div>
      <div class="col-3">
        <Weather></Weather>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import HelloRyan from './components/HelloRyan.vue'
import Time from './components/Time.vue'
import Deadlines from './components/Deadlines.vue'
import Tasks from './components/Tasks.vue'
import Weather from './components/Weather.vue'

export default {
  name: 'App',
  components: {
    HelloRyan,
    Time,
    Deadlines,
    Tasks,
    Weather
  },
  mounted: function() {
    this.getQuotes();
  },
  data: function() {
    return {
      quotes: [],
      quote: "",
    }
  },
  methods: {
    getQuotes: function() {
      axios.get('https://type.fit/api/quotes')
        .then(resp => {
          this.quotes = resp.data;
          this.quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        })
        .catch(err => {
          console.log("Error retrieving quotes: " + err);
        })
      }
  }

}
</script>

<style>
#app {
  font-family: 'Source Sans Pro', sans-serif;
  color: #2c3e50;
  background: #f9e4b7;
}

.bordered {
  border-top: 0.05em solid #2c3e50;
}

.bordered-right{
  border-right: 0.05em solid #2c3e50;
}
</style>
