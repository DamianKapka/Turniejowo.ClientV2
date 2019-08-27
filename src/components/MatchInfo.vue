<template>
  <v-card class="elevation-10" style="margin-top: 2%;margin-bottom: 2%;">
    <v-card-title>
      <span class="bold">{{ Matches.dateTime.split("T")[0] }}</span>
    </v-card-title>
    <v-divider style="margin:0"></v-divider>
    <v-card-text>
      <v-data-table
        hide-actions
        :headers="tableHeaders"
        :items="Matches.matches"
      >
        <template v-slot:items="match">
          <tr>
            <td class="text-xs-center">
              {{ match.item.matchDateTime.split("T")[1].substring(0, 5) }}
            </td>
            <td class="text-xs-center">
              {{ match.item.homeTeamName }}
            </td>
            <td class="text-xs-center">
              {{ match.item.guestTeamName }}
            </td>
            <td class="text-xs-center">
              {{ match.item.homeTeamPoints }} : {{ match.item.guestTeamPoints }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "MatchInfo",
  props: {
    Matches: Object,
    WithAdminOptions: Boolean
  },
  data() {
    return {
      tableHeaders: [
        {
          text: "Godzina",
          value: "startHour",
          align: "center",
          width: 75,
          sortable: false
        },
        {
          text: "Druzyna A",
          value: "teamA",
          align: "center",
          sortable: false
        },
        {
          text: "Druzyna B",
          value: "teamB",
          align: "center",
          sortable: false
        },
        {
          text: "Wynik",
          value: "score",
          align: "center",
          width: 150,
          sortable: false
        }
      ]
    };
  },
  mounted() {
    console.log(this.Matches);
  }
};
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>
