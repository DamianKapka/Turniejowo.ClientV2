<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-data-table :headers="TableHeaders" :items="Teams" :hide-actions="true">
    <template v-slot:items="team">
      <td class="text-xs-center">{{ team.index + 1 }}</td>
      <td>
        {{ team.item.teamName }}
      </td>
      <td style="padding: 0">
        <v-expansion-panel>
          <v-expansion-panel-content>
            <template v-slot:header>
              <div class="text-xs-center">
                Zawodnicy
              </div>
            </template>
            <v-list>
              <v-list-tile
                v-for="item in team.item.players"
                :key="item.PlayerId"
              >
                <v-list-tile-content>
                  {{ item.fName }} {{ item.lName }}
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </td>
      <td>
        <v-layout row>
          <v-flex xs4 class="toi-icon toi-add">
            <font-awesome-icon icon="user-plus"></font-awesome-icon>
          </v-flex>
          <v-flex xs4 class="toi-icon toi-edit">
            <font-awesome-icon icon="edit"></font-awesome-icon>
          </v-flex>
          <v-flex xs4 class="toi-icon toi-delete">
            <font-awesome-icon icon="trash-alt"></font-awesome-icon>
          </v-flex>
        </v-layout>
      </td>
    </template>
  </v-data-table>

  <!--<v-expansion-panel expand>
    <v-layout row>
      <v-flex xs8 offset-xs2 style="padding: 3% 0">
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
  </v-expansion-panel>-->
</template>

<script>
import axios from "axios";
import AddNewTeam from "@/components/AddNewTeam";
import AddNewPlayer from "@/components/AddNewPlayer";

export default {
  name: "EditParticipants",
  data() {
    return {
      TableHeaders: [
        {
          text: "Nr",
          value: "Number",
          sortable: true,
          align: "center"
        },
        { text: "Team", value: "Team", sortable: true, align: "left" },
        { text: "Players", value: "Players", sortable: true, align: "left" },
        { text: "Actions", value: "Actions", sortable: true, align: "left" }
      ],
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
    }
  }
};
</script>

<style>
.toi-icon {
  text-align: center;
}

.toi-add {
  color: limegreen;
}

.toi-edit {
  color: goldenrod;
}

.toi-delete {
  color: firebrick;
}
</style>
