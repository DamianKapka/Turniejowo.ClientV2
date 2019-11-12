<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-data-table
    :headers="TableHeaders"
    :items="Statistics"
    class="elevation-7 table"
    :hide-actions="true"
    v-bind:pagination.sync="Pagination"
  >
    <template v-slot:items="team">
      <td
        class="text-xs-center table-entry"
        v-bind:class="getMedalColor(team.index + 1)"
      >
        {{ team.index + 1 }}
      </td>
      <td
        class="text-xs-center table-entry"
        v-bind:class="getMedalColor(team.index + 1)"
      >
        {{ team.item.player.fName }} {{ team.item.player.lName }}
      </td>
      <td
        class="text-xs-center table-entry"
        v-bind:class="getMedalColor(team.index + 1)"
      >
        {{ team.item.player.teamName }}
      </td>
      <td
        class="text-xs-center table-entry"
        v-bind:class="getMedalColor(team.index + 1)"
      >
        {{ team.item.pointsQty }}
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
        { text: "Punkty", value: "points", sortable: false, align: "center" }
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
      .get(`${this.apiUrl}/api/tournament/${this.$route.params.id}/points`)
      .then(response => {
        if (response.status === 200) {
          this.Statistics = response.data.content;
        } else if (response.status === 404) {
          alert("W tym turnieju nie rozegrane zostały jeszcze żadne mecze");
        } else {
          alert("Błąd podczas próby pobrania statystyk turnieju");
        }
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error));
  }
};
</script>

<style></style>
