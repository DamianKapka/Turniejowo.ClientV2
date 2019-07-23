<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-data-table
    :headers="TableHeaders"
    :items="Statistics"
    class="elevation-7"
    :hide-actions="true"
    v-bind:pagination.sync="Pagination"
  >
    <template v-slot:items="item">
      <td class="text-xs-center" v-bind:class="getMedalColor(item.index + 1)">
        {{ item.index + 1 }}
      </td>
      <td class="text-xs-center" v-bind:class="getMedalColor(item.index + 1)">
        {{ item.item.name }}
      </td>
      <td class="text-xs-center" v-bind:class="getMedalColor(item.index + 1)">
        {{ item.item.team }}
      </td>
      <td class="text-xs-center" v-bind:class="getMedalColor(item.index + 1)">
        {{ item.item.points }}
      </td>
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
  created() {
    axios
      .get(
        `${this.$store.getters.apiUrl}/api/tournament/${
          this.$route.params.id
        }/players`
      )
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
  },
  methods: {
    getMedalColor: function(index) {
      switch (index) {
        case 1: {
          return "gold";
        }
        case 2: {
          return "silver";
        }
        case 3: {
          return "bronze";
        }
        default: {
          return;
        }
      }
    }
  }
};
</script>

<style>
.gold {
  background-color: gold;
}
.silver {
  background-color: silver;
}
.bronze {
  background-color: saddlebrown;
}
</style>
