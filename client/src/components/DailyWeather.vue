<template>
    <div id="dailyWeather">
        <div class="row" id="dailyDisplay">
            <div class="col-3" id="day">
                {{ (new Date(weather.time * 1000)).toString().split(" ")[0] }}
            </div>
            <div class="col-3" id="skycon">
                <skycon v-bind:condition="weather.icon" width="54" height="54"></skycon>
            </div>
            <div class="col-3">
                <i class="fas fa-arrow-up" id="tempHigh"></i> {{ Math.floor(weather.temperatureHigh) }}°C
            </div>
            <div class="col-3">
                <i class="fas fa-arrow-down" id="tempLow"></i> {{ Math.floor(weather.temperatureLow )}}°C
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueSkycons from 'vue-skycons'

Vue.use(VueSkycons)

export default {
    name: 'DailyWeather',
    props: {
        weather: Object
    }
}
</script>

<style>
#dailyDisplay {
    display: flex;
    align-items: center;
}

#tempHigh {
    color: #7aeb7a
}

#tempLow {
    color: #ff7883
}

#day {
    text-align: center;
    font-weight: bold;
}
</style>
