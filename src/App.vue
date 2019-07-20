<template>
  <v-app>
    <v-content id="app">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {};
  }
};
</script>

<style lang="less">
@import (css) url("https://fonts.googleapis.com/css?family=Play");

#app {
  background: url("./assets/Background.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  font-family: "Play", sans-serif !important;
}

.main-card {
  border-radius: 4px;
  margin: 7% 0;
  opacity: 0.9;
}

.maincard-nav-card {
  text-align: center;
  padding: 5%;
  font-size: 18px;
  font-weight: bold;
  border: 2px solid wheat;
}

.maincard-nav-card:hover {
  background-color: #ff9933;
  transform: scale(1.2, 1.2);
  z-index: 999;
}

.lel {
  border: 3px solid #ff9933 !important;
  padding: 5% !important;
  background-color: #ffb984 !important;
}
</style>
