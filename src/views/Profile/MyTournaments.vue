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
import { mapGetters } from "vuex";
import getLoggedUserIdMixin from "../../mixins/getLoggedUserIdMixin";

export default {
  name: "MyTournaments",
  data() {
    return {
      userID: "",
      userTournaments: []
    };
  },
  mounted() {
    this.userID = this.getLoggedUserId();
    this.fillUsersTournament();
  },
  components: {
    TournamentOwnerInfo
  },
  methods: {
    reloadList() {
      this.userTournaments = [];
      this.fillUsersTournament();
    },
    fillUsersTournament() {
      axios
        .get(`${this.apiUrl}/api/user/${this.userID}/tournaments`)
        .then(res => {
          this.userTournaments = res.data;
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  },
  mixins: [getLoggedUserIdMixin],
  computed: mapGetters(["apiUrl"])
};
</script>

<style></style>
