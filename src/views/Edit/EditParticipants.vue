<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-expansion-panel expand>
    <v-layout row>
      <v-flex xs6 offset-xs3 style="padding: 5% 0">
        <v-expansion-panel-content v-for="team in Teams" :key="team.teamName">
          <template v-slot:header>
            <v-card class="header-card elevation-0">{{ team.teamName }}</v-card>
          </template>
          <v-card
            v-for="player in team.players"
            :key="player.value"
            class="text-xs-center elevation-0"
            style="padding:2%;"
          >
            {{ player.fName }} {{ player.lName }}
          </v-card>
          <AddNewPlayer
            v-bind:teamId="team.teamId"
            @PlayerAdded="getParticipants()"
          ></AddNewPlayer>
        </v-expansion-panel-content>

        <AddNewTeam @TeamAdded="getParticipants()"> </AddNewTeam>
      </v-flex>
    </v-layout>
  </v-expansion-panel>
</template>

<script>
import axios from "axios";
import AddNewTeam from "@/components/AddNewTeam";
import AddNewPlayer from "@/components/AddNewPlayer";

export default {
  name: "EditParticipants",
  data() {
    return {
      Teams: []
    };
  },
  created() {
    this.getParticipants();
  },

  components: {
    AddNewTeam: AddNewTeam,
    AddNewPlayer: AddNewPlayer
  },
  methods: {
    getParticipants() {
      const id = this.$route.params.id;

      axios
        .get(
          `${
            this.$store.getters.apiUrl
          }/api/tournament/${id}/players?groupedbyteam=true`
        )
        .then(response => {
          this.Teams = [];

          response.data.forEach(element => {
            this.Teams.push({
              teamName: element.team.name,
              teamId: element.team.teamId,
              players: element.players
            });
          });
        })
        .catch();
    },
  }
};
</script>

<style>
.header-card {
  font-size: 22px;
  font-weight: bold;
  padding: 2% 2% 2% 5%;
}
</style>
