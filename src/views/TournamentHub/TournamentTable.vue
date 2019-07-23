<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-data-table
    :headers="tableHeaders"
    :items="tableEntries"
    :hide-actions="true"
  >
    <template v-slot:items="item">
      <td class="text-xs-center" v-bind:class="getMedalColor(item.index + 1)">
        {{ item.index + 1 }}
      </td>
      <td class="text-xs-center" v-bind:class="getMedalColor(item.index + 1)">
        {{ item.item.name }}
      </td>
      <td class="text-xs-center" v-bind:class="getMedalColor(item.index + 1)">
        {{ item.item.wins }}
      </td>
      <td class="text-xs-center" v-bind:class="getMedalColor(item.index + 1)">
        {{ item.item.loses }}
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
  name: "TournamentTable",
  data() {
    return {
      tableEntries: [],
      tableHeaders: [
        { text: "Miejsce", value: "place", align: "center", sortable: false },
        { text: "Drużyna", value: "team", align: "center", sortable: false },
        { text: "Zwyciestwa", value: "wins", align: "center", sortable: false },
        { text: "Porazki", value: "loses", align: "center", sortable: false },
        { text: "Pynkty", value: "points", align: "center", sortable: false }
      ]
    };
  },
  methods: {
    SortAndAssign(array) {
      return array.sort((a, b) =>
        a.points > b.points ? -1 : b.points > a.points ? 1 : 0
      );
    },
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
  },
  created() {
    axios
      .get(
        `${this.$store.getters.apiUrl}/api/tournament/${
          this.$route.params.id
        }/teams`
      )
      .then(response => {
        // eslint-disable-next-line no-console
        this.tableEntries = this.SortAndAssign(response.data);
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error));
  }
};
</script>

<style></style>
