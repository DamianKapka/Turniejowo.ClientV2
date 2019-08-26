<template>
  <v-card class="elevation-10">
    <v-card-title>
      <span class="bold">24.09.2019</span>
    </v-card-title>
    <v-divider style="margin:0"></v-divider>
    <v-card-text>
      <v-data-table
        hide-actions
        :headers="tableHeaders"
        :items="tableItemsDummy"
      >
        <template v-slot:items="match">
          <tr>
            <td class="text-xs-center">{{ match.item.startHour }}</td>
            <td class="text-xs-center">{{ match.item.teamA }}</td>
            <td class="text-xs-center bold">{{ match.item.teamB }}</td>
            <td class="text-xs-center">{{ match.item.score }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "MatchInfo",
  props: ["Matches", "WithAdminOptions"],
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
      ],
      tableItemsDummy: [
        { startHour: "15:00", teamA: "XD", teamB: "XP", score: "0:5" }
      ]
    };
  }
};
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>
