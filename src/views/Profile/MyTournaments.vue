<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-flex xs8 offset-xs2>
    <v-list style="padding:5%">
        <template>
        <v-list-tile v-for="tournament in userTournaments" :key="tournament.name" >            
            <TournamentOwnerInfo v-bind:tournament="tournament"></TournamentOwnerInfo>
        </v-list-tile>
        </template>
    </v-list>
    </v-flex>
</template>

<script>
import axios from "axios";
import TournamentOwnerInfo from "@/components/TournamentOwnerInfo";

export default {
  name: "MyTournaments",
  data() {
    return {
      userID: "",
      userTournaments: []
    };
  },
  created() {
    this.userID = this.$store.getters.loggedUserId;
    let userTournamentsTemp = [];

    axios
      .get(`https://localhost:5001/api/user/${this.userID}/tournaments`)
      .then(res => {
        res.data.forEach(d => userTournamentsTemp.push(d));

        this.userTournaments = userTournamentsTemp;
      })
      .catch(err => {
          console.log(err)
      });
  },
  components: {
    TournamentOwnerInfo: TournamentOwnerInfo
  }
};
</script>

<style>

</style>
