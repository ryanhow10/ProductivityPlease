<template>
    <div id="weather">
        <div class="row">
            <div class="col-8">
                <p id="forecast">Weather Forecast</p>
            </div>
            <div class="col-4">
                <select id="location" v-model="location" v-on:change="getForecast">
                    <option value="waterloo">Waterloo</option>
                    <option value="markham">Markham</option>
                </select>
            </div>
        </div>
        <div class="row" id="currentWeather">
            <div class="col-3" id="currentTemperature">
                {{ Math.floor(currentWeather.temperature) }} °C
                <p id="currentSummary">{{ currentWeather.summary }}</p>
            </div>
            <div class="col-">
                <div class="row-fluid">{{ (new Date(hourlyWeather[3].time * 1000)).toString().split(" ")[4].slice(0,5) }} <i id="hourlyWeather" class="fas fa-thermometer-half"></i> {{ Math.floor(hourlyWeather[3].temperature) }}°C </div>
                <div class="row-fluid">{{ (new Date(hourlyWeather[6].time * 1000)).toString().split(" ")[4].slice(0,5) }} <i id="hourlyWeather" class="fas fa-thermometer-half"></i> {{ Math.floor(hourlyWeather[6].temperature) }}°C</div>
                <div class="row-fluid">{{ (new Date(hourlyWeather[9].time * 1000)).toString().split(" ")[4].slice(0,5) }} <i id="hourlyWeather" class="fas fa-thermometer-half"></i> {{ Math.floor(hourlyWeather[9].temperature) }}°C</div>
            </div>
            <div class="col-5">
                <div class="row-fluid" id="weatherDetails">Wind: {{ currentWeather.windSpeed }} km/h</div>
                <div class="row-fluid" id="weatherDetails">Humidity: {{ Math.floor(currentWeather.humidity * 100) }}%</div>
                <div class="row-fluid" id="weatherDetails">Precipitation: {{ Math.floor(currentWeather.precipProbability * 100) }}%</div>
            </div>
        </div>
        <div class="row overflow">
            <div class="col">
                <DailyWeather v-for="weather in dailyWeather" v-bind:key="weather.time" v-bind:weather="weather"></DailyWeather>
            </div>
       </div>
    </div>    
</template>

<script>
import Vue from 'vue'
import VueSkycons from 'vue-skycons'
import DailyWeather from './DailyWeather.vue'
import axios from 'axios'

Vue.use(VueSkycons)

export default {
    name: "Weather",
    components: {
        DailyWeather
    },
    data: function() {
        return {
            cors: "https://cors-anywhere.herokuapp.com/",
            root: "https://api.darksky.net/forecast/8dedd8ab66dc08a26bbf6e00c273781d",
            latitude: "43.466667",
            longitude: "-80.516670",
            wLatitude: "43.466667",
            wLongitude: "-80.516670",
            mLatitude: "43.856098",
            mLongitude: "-79.337021",
            location: "waterloo",
            currentWeather: {},
            hourlyWeather: [],
            dailyWeather: []
        }
    },
    mounted: function() {
        this.getForecast();
    },
    methods: {
        getForecast: function() {
            if(this.location == "waterloo") {
                this.latitude = this.wLatitude;
                this.longitude = this.wLongitude
            } else{
                this.latitude = this.mLatitude;
                this.longitude = this.mLongitude
            }
            axios.get(this.cors + this.root + '/' + this.latitude + ',' + this.longitude + '?units=ca&exclude=[minutely,alerts,flags]')
                .then(resp => {
                    this.currentWeather = resp.data.currently;
                    this.hourlyWeather = resp.data.hourly.data;
                    this.dailyWeather = resp.data.daily.data;
                })
                .catch(err => {
                    console.log("Error retriving weather forecast. " + err);
                });
        }
    }
}
</script>

<style>
#forecast {
    margin-top: 0.5em;
    margin-bottom: 0;
    font-size: 1.25em;
    font-weight: bold;
}

#location {
    margin-top: 0.9em;
    margin-bottom: 0;
}

#weatherDetails {
    float: right;
}

#currentWeather {
    margin-top: 0.5em;
}

#currentTemperature {
    font-size: 1.5em;
    font-weight: bolder;
    text-align: center;
}

#currentSummary {
    font-size: 0.5em;
    text-align: center;
}

#hourlyWeather {
    margin-left: 1.75em;
}
</style>
