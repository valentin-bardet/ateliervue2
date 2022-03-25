<template>
  <div id="app">
    <mapVue  :center="center" />
  </div>
</template>

<script>
import mapVue from '../components/mapVue'
export default {
  name: 'app',
  components: {
    mapVue
    // Remove the HelloWorld.vue 
  },
  data() {
return {
    // we are this as prop to the mapVue component 
  center:{ 
    lat: 40.730610, 
    lng: -73.935242
    }
}
  
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>