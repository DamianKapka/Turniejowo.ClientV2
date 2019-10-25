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
            <td v-if="match.item.isFinished" class="text-xs-center">
              {{ match.item.homeTeamPoints }} : {{ match.item.guestTeamPoints }}
            </td>
            <td v-else class="text-xs-center">
              - : -
            </td>
            <td v-if="WithAdminOptions" class="text-xs-center">
              <UpdateResultDialog
                @updated="$emit('matchUpdated')"
                :match="match.item"
              ></UpdateResultDialog>
            </td>
            <td v-else class="text-xs-center">
              <MatchDetailsDialog :match="match.item">
              </MatchDetailsDialog>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import UpdateResultDialog from "./UpdateResultDialog";
import MatchDetailsDialog from "./MatchDetailsDialog";

export default {
  name: "MatchInfo",
  props: {
    Matches: Object,
    WithAdminOptions: Boolean
  },
  data() {
    return {};
  },
  computed: {
    tableHeaders: function() {
      if (this.WithAdminOptions === true) {
        return [
          {
            text: "Godzina",
            value: "startHour",
            align: "center",
            width: 50,
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
            width: 90,
            sortable: false
          },
          {
            text: "Akcje",
            value: "actions",
            align: "center",
            width: 100,
            sortable: false
          },
        ];
      }
      return [
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
        },
        {
          text: "Szczegóły",
          value: "score",
          align: "center",
          width: 150,
          sortable: false
        }
      ];
    }
  },
  components: {
    UpdateResultDialog,
    MatchDetailsDialog
  }
};
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>
