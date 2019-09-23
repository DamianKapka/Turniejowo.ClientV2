<template>
  <v-app>
    <v-content id="app">
      <router-view></router-view>
    </v-content>
    <v-footer style="justify-content: center;">
      Turniejowo.pl {{ version }} Copyright &copy; 2019 Damian Kapka. All rights
      reserved
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      version: 0.8
    };
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
</style>
