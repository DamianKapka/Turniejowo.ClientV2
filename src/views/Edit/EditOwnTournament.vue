<template>
  <v-container>
    <v-layout row>
      <v-flex xs8 offset-xs2>
        <v-card class="elevation-24 main-card">
          <v-flex xs12>
            <v-card class="tournament-header">
              #{{ tournamentId }} {{ tournament.name }}
            </v-card>
          </v-flex>
          <v-layout row>
            <v-flex xs3 v-for="navBar in navBarNames" v-bind:key="navBar.name">
              <router-link :to="{ name: navBar.routerName }">
                <v-card
                  class="maincard-nav-card"
                  v-bind:class="{ lel: currentPage === navBar.routerName }"
                >
                  {{ navBar.name }}
                </v-card>
              </router-link>
            </v-flex>
          </v-layout>
          <router-view v-if="!isFetching"></router-view>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "EditOwnTournament",
  data() {
    return {
      isFetching: true,
      tournamentId: Number,
      tournament: Object,
      currentPage: this.$route.name,
      navBarNames: [
        { name: "Edytuj Infofmacje", routerName: "EditGeneral" },
        { name: "Edytuj Uczestników", routerName: "EditParticipants" },
        { name: "Edytuj Przebieg", routerName: "EditProgress" },
        { name: "Cofnij", routerName: "MyTournaments" }
      ]
    };
  },
  created() {
    this.tournamentId = this.$route.params.id;

    axios
      .get(`https://localhost:5001/api/tournament/${this.tournamentId}`)
      .then(res => {
        console.log("SET");
        this.$store.state.currentlyEditedTournament = res.data;
        this.tournament = res.data;
        this.isFetching = false;
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    $route(to, from) {
      this.currentPage = to.name;
    }
  }
};
</script>

<style <style scoped>
.tournament-header {
  text-align: center;
  font-size: 48px;
}
</style>
