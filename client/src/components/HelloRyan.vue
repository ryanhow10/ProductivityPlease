<template>
    <div id="helloRyan">
        <p id="welcome">Hello Ryan</p>
        <p id="quote">Today's Quote: "{{quote.text}}" - {{quote.author}}</p>
    </div>
</template>

<script>
export default {
    name: "HelloRyan",
    props: {
        quote: Object
    }
}
</script>

<style>
#helloRyan {
    text-align: left;
}

#welcome {
    font-size: 3.25em;
    font-weight: bold;
    margin-bottom: 0;
}

#quote {
    font-size: 1.25em;
    margin-top: 0;
}
</style>
