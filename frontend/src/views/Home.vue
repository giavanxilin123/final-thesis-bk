<template>
  <div class="home">
    <div class="carousel">

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  // components: {
  //   HelloWorld
  // }

}
</script>

<style scoped>
  .carousel {
    background: url(../assets/carousel.jpeg);
    height: 300px;
    background-size: cover;
    background-position: center;
    width: 100%;
  }
</style>
