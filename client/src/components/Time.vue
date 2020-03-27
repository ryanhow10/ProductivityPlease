<template>
    <div id="time">
        <VueClock></VueClock>
    </div>
</template>

<script>
import VueClock from '@dangvanthanh/vue-clock';

export default {
    name: "Time",
    components: {
        VueClock,
    }
}
</script>

<style>
#time {
    text-align: center;
    margin-top: 1em;
}
</style>
