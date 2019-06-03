<template>
  <h1>{{ tournamentId }}</h1>
</template>

<script>
import axios from "axios";

export default {
  name: "EditOwnTournament",
  data() {
    return {
      tournamentId: ""
    };
  },
  created() {
    this.tournamentId = this.$route.params.id;

    axios
      .get(`https://localhost:5001/api/tournament/${this.tournamentId}`)
      .then(res => {
        console.log(res.data.creatorId);
        console.log(this.$store.getters.loggedUserId);

        if (this.$store.getters.loggedUserId === res.data.creatorId) {
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style></style>
