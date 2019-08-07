<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-data-table
    :headers="TableHeaders"
    :items="Players"
    :hide-actions="true"
    class="elevation-7"
  >
    <template v-slot:items="item">
      <td class="text-xs-center">{{ item.index + 1 }}</td>
      <td class="text-xs-center">{{ item.item.teamName }}</td>
      <td class="text-xs-center">
        <v-expansion-panel>
          <v-expansion-panel-content>
            <template v-slot:header>
              <div class="text-xs-center">
                Wyświetl zawodników
              </div>
            </template>
            <v-list>
              <v-list-tile
                v-for="item in item.item.players"
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
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";

export default {
  name: "TournamentParticipants",
  data() {
    return {
      Players: [],
      TableHeaders: [
        {
          text: "Nr",
          value: "number",
          sortable: false,
          align: "center"
        },
        {
          text: "Drużyna",
          value: "team",
          sortable: false,
          align: "center"
        },
        {
          text: "Zawodnicy",
          value: "players",
          sortable: false,
          align: "center"
        }
      ]
    };
  },
  methods: {},
  created() {
    axios
      .get(
        `${this.$store.getters.apiUrl}/api/tournament/${
          this.$route.params.id
        }/players?groupedbyteam=true`
      )
      .then(response => {
        response.data.forEach(element => {
          this.Players.push({
            teamName: element.team.name,
            players: element.players
          });
        });
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error));
  }
};
</script>

<style>
.v-list__tile__content {
  font-size: 14px;
  align-items: center;
}
</style>
