<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-data-table
    :headers="TableHeaders"
    :items="Statistics"
    class="elevation-7 table"
    :hide-actions="true"
    v-bind:pagination.sync="Pagination"
  >
    <template v-slot:items="team">
      <td class="text-xs-center" v-bind:class="getMedalColor(team.index + 1)">
        {{ team.index + 1 }}
      </td>
      <td class="text-xs-center" v-bind:class="getMedalColor(team.index + 1)">
        {{ team.item.name }}
      </td>
      <td class="text-xs-center" v-bind:class="getMedalColor(team.index + 1)">
        {{ team.item.team }}
      </td>
      <td class="text-xs-center" v-bind:class="getMedalColor(team.index + 1)">
        {{ team.item.points }}
      </td>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import getMedalColorMixin from "../../mixins/getMedalColorMixin";

export default {
  name: "TournamentStats",
  data() {
    return {
      TableHeaders: [
        {
          text: "Miejsce",
          value: "position",
          sortable: false,
          align: "center"
        },
        { text: "Gracz", value: "player", sortable: false, align: "center" },
        { text: "Drużyna", value: "team", sortable: false, align: "center" },
        { text: "Punkty", value: "points", sortable: true, align: "center" }
      ],
      Pagination: {
        descending: true,
        sortBy: "points",
        rowsPerPage: 10
      },
      Statistics: []
    };
  },
  computed: mapGetters(["apiUrl"]),
  mixins: [getMedalColorMixin],
  created() {
    axios
      .get(`${this.apiUrl}/api/tournament/${this.$route.params.id}/players`)
      .then(response => {
        response.data.forEach(element => {
          this.Statistics.push({
            name: `${element.fName} ${element.lName}`,
            team: element.team.name,
            points: element.points
          });
        });
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error));
  }
};
</script>

<style></style>
