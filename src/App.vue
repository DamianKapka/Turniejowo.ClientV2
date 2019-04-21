<template>
    <v-app>
      <v-content id="app">
          <router-view></router-view>
      </v-content>
    </v-app>
</template>

<script>
export default {
  name: 'Index',
  data(){
    return{

    }
  }
}
</script>

<style <style lang="less">
@import (css)url('https://fonts.googleapis.com/css?family=Play');

  #app { 
    background: url("./assets/Background.jpg") no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
</style>

