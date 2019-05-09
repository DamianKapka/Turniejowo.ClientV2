<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-data-table
    :headers="TableHeaders"
    :items="Statistics"
    class="elevation-7"
    :hide-actions="true"
    v-bind:pagination.sync="Pagination"
  >
    <template v-slot:items="item">
      <td class="text-xs-center">{{ item.item.name }}</td>
      <td class="text-xs-center">{{ item.item.team }}</td>
      <td class="text-xs-center">{{ item.item.points }}</td>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";

export default {
  name: "TournamentStats",
  data() {
    return {
      TableHeaders: [
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
  created() {
    axios
      .get(
        `https://localhost:5001/api/tournament/${this.$route.params.id}/players`
      )
      .then(response => {
        let statisticsTemp = [];

        response.data.forEach(element => {
          statisticsTemp.push({
            name: `${element.fName} ${element.lName}`,
            team: element.team.name,
            points: element.points
          });
        });

        this.Statistics = statisticsTemp;
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error));
  }
};
</script>

<style></style>
