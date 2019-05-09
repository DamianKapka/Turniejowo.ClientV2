<template>
  <v-container>
    <v-layout row>
      <v-flex xs2 />
      <v-flex xs8>
        <v-card :dark="false" class="elevation-24 main-card" Height="100%">
          <v-layout row>
            <v-flex xs4>
              <router-link :to="{ path: 'login' }" replace>
                <v-card
                  class="elevation-7 maincard-nav-card"
                  v-bind:class="{ lel: currentPage === 'login' }"
                  >LOGIN</v-card
                >
              </router-link>
            </v-flex>

            <v-flex xs4>
              <router-link :to="{ path: 'register' }" replace>
                <v-card
                  class="elevation-7 maincard-nav-card"
                  v-bind:class="{ lel: currentPage === 'register' }"
                  >REGISTER</v-card
                >
              </router-link>
            </v-flex>

            <v-flex xs4>
              <router-link :to="{ path: 'find' }" replace>
                <v-card
                  class="elevation-7 maincard-nav-card"
                  v-bind:class="{ lel: currentPage === 'find' }"
                  >FIND</v-card
                >
              </router-link>
            </v-flex>
          </v-layout>
          <router-view></router-view>
        </v-card>
      </v-flex>
      <v-flex xs2 />
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Start",

  data() {
    return {
      currentPage: this.$route.name
    };
  },

  watch: {
    $route(to, from) {
      this.currentPage = to.name;
    }
  },
  methods: {},
  components: {}
};
</script>

<style>
a {
  text-decoration: none;
}

.start-div {
  padding: 5%;
}

.start-buttons-div {
  padding-top: 5%;
}

.start-div v-btn {
  font-weight: bold;
}
</style>
