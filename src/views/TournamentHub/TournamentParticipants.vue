<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-data-table
    :headers="TableHeaders"
    :items="Players"
    :hide-actions="true"
    class="elevation-7"
  >
    <template v-slot:items="team">
      <td class="text-xs-center">{{ team.index + 1 }}</td>
      <td class="text-xs-center">{{ team.item.team.name }}</td>
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
                v-for="player in team.item.players"
                :key="player.PlayerId"
              >
                <v-list-tile-content>
                  {{ player.fName }} {{ player.lName }}
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
import { mapGetters } from "vuex";

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
  computed: mapGetters(["apiUrl"]),
  created() {
    axios
      .get(
        `${this.apiUrl}/api/tournament/${
          this.$route.params.id
        }/players?groupedbyteam=true`
      )
      .then(response => {
        switch (response.status) {
          case 200: {
            this.Players = response.data;
            break;
          }
          case 404: {
            alert("Błąd podczas pobierania graczy.");
            break;
          }
          default: {
            alert("Nieznany błąd podczas próby pobrania graczy");
            break;
          }
        }
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
  font-weight: bold;
}
</style>
