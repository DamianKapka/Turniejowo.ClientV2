<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-data-table
    :headers="tableHeaders"
    :items="tableEntries"
    :hide-actions="true"
    class="elevation-7 table"
  >
    <template v-slot:items="item">
      <td class="text-xs-center" v-bind:class="getMedalColor(item.index + 1)">
        {{ item.index + 1 }}
      </td>
      <td class="text-xs-center" v-bind:class="getMedalColor(item.index + 1)">
        {{ item.item.teamName }}
      </td>
      <td class="text-xs-center" v-bind:class="getMedalColor(item.index + 1)">
        {{ item.item.matches }}
      </td>
      <td class="text-xs-center" v-bind:class="getMedalColor(item.index + 1)">
        {{ item.item.wins }}
      </td>
      <td class="text-xs-center" v-bind:class="getMedalColor(item.index + 1)">
        {{ item.item.draws }}
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
import { mapGetters } from "vuex";
import getMedalColorMixin from "../../mixins/getMedalColorMixin";

export default {
  name: "TournamentTable",
  data() {
    return {
      tableEntries: [],
      tableHeaders: [
        {
          text: "Miejsce",
          value: "place",
          align: "center",
          width: 10,
          sortable: false
        },
        { text: "Drużyna", value: "team", align: "center", sortable: false },
        {
          text: "Mecze",
          value: "matches",
          align: "center",
          width: 10,
          sortable: false
        },
        {
          text: "Zwyciestwa",
          value: "wins",
          align: "center",
          width: 10,
          sortable: false
        },
        {
          text: "Remisy",
          value: "draws",
          align: "center",
          width: 10,
          sortable: false
        },
        {
          text: "Porazki",
          value: "loses",
          align: "center",
          width: 10,
          sortable: false
        },
        {
          text: "Pynkty",
          value: "points",
          align: "center",
          width: 10,
          sortable: false
        }
      ]
    };
  },
  computed: mapGetters(["apiUrl"]),
  mixins: [getMedalColorMixin],
  created() {
    axios
      .get(`${this.apiUrl}/api/tournament/${this.$route.params.id}/table`)
      .then(response => {
        if (response.status === 200) {
          this.tableEntries = response.data.tableData;
        } else if (response.status === 404) {
          this.$swal.fire({
            type: "info",
            title: "Informacja",
            //confirmButtonColor: "#cb4154",
            text: "W tym turnieju nie rozegrane zostały jeszcze żadne mecze",
            showConfirmButton: true,
            timer: 4000
          });
        } else {
          this.$swal.fire({
            type: "error",
            title: "Błąd",
            confirmButtonColor: "#cb4154",
            text: "Błąd podczas próby pobrania meczów",
            showConfirmButton: true,
            timer: 4000
          });
        }
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error));
  }
};
</script>

<style></style>
