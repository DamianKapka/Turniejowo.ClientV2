<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-flex xs10 offset-xs1>
    <v-list style="padding:5%">
      <template>
        <v-list-tile
          v-for="tournament in userTournaments"
          :key="tournament.name"
        >
          <TournamentOwnerInfo
            v-bind:tournament="tournament"
            @tournamentEdit="redirectToTournamentEdit($event)"
            @tournamentDeleted="reloadList()"
          ></TournamentOwnerInfo>
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
    this.fillUsersTournament();
  },
  updated(){
    this.fillUsersTournament();
  },
  components: {
    TournamentOwnerInfo: TournamentOwnerInfo
  },
  methods: {
    redirectToTournamentEdit(id){
      this.$router.push({name: "EditOwnTournament", params: {id: id}});
    },
    reloadList() {
      this.$forceUpdate();
    },
    fillUsersTournament(){
      let userTournamentsTemp = [];

      axios
      .get(`https://localhost:5001/api/user/${this.userID}/tournaments`)
      .then(res => {
        console.log(res);
        res.data.forEach(d => userTournamentsTemp.push(d));
        this.userTournaments = userTournamentsTemp;
      })
      .catch(err => {
        //TODO
        console.log(err);
      });
    }
  }
};
</script>

<style></style>
