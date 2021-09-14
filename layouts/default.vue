<template>
  <div id="background">
    <nuxt />
  </div>
</template>

<script>
export default {
}
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

html {
  font-family: 'Open Sans', sans-serif;
  margin-top: 20px;
}
h1 {
  text-align: center;
}
button {
  margin-bottom: 10px
}

#background {
  /* background: url('https://source.unsplash.com/1920x1080/?shopping') no-repeat center center/cover; */
  height: 100vh;
}

.container {
  opacity: 1;
}
</style>