<template>
  <v-dialog v-model="dialog" max-width="700">
    <template v-slot:activator="{ on }">
      <v-icon
        v-if="withAdminOptions"
        v-on="on"
        color="green"
        size="22"
        @click="getMatchPoints(match.matchId)"
      >
        settings_applications
      </v-icon>
      <v-icon v-else v-on="on" size="22" @click="getMatchPoints(match.matchId)">
        search
      </v-icon>
    </template>
    <v-container class="grey lighted-5">
      <v-layout row>
        <v-flex xs12>
          <v-card tile class="pa-2 match-dateTime">
            <v-icon color="black">alarm</v-icon>
            <span style="margin-left: 4%;margin-right: 4%;">{{
              matchDateFormatted
            }}</span>
            <v-icon color="black">alarm</v-icon>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs4>
          <v-card tile class="pa-3 match-score-participant">
            <v-icon color="black" size="34px">people</v-icon>
            {{ match.homeTeamName }}
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card tile class="pa-2 match-score-score">
            {{ match.homeTeamPoints }} : {{ match.guestTeamPoints }}
          </v-card>
        </v-flex>
        <v-flex xs4>
          <v-card tile class="pa-3 match-score-participant">
            {{ match.guestTeamName }}
            <v-icon color="black" size="34px">people</v-icon>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-card class="pa-2 match-scorers-head" tile>
            Zdobywcy punktów
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex
          xs6
          v-for="matchScore in matchScores"
          :key="matchScore.pointsQty"
        >
          <v-data-table
            :headers="matchScoreTableHeaders"
            :items="matchScore"
            :hide-actions="true"
          >
            <template v-slot:items="score">
              <tr>
                <td class="text-xs-center bold">
                  {{ score.item.player.fName }} {{ score.item.player.lName }}
                </td>
                <td class="text-xs-center bold">{{ score.item.pointsQty }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <v-layout v-if="withAdminOptions" row>
        <v-flex xs12>
          <v-expansion-panel>
            <v-expansion-panel-content :hide-actions="true" class="pa-0">
              <template #header style="padding: 0">
                <v-card
                  class="pa-3 match-scorers-options"
                  tile
                  style="background-color: #96e697"
                  @added="getMatchPoints(matchId)"
                >
                  <v-icon color="green" size="20">add_box</v-icon>
                  DODAJ PUNKTUJĄCYCH GRACZY
                  <v-icon color="green" size="20">add_box</v-icon>
                </v-card>
              </template>
              <AddPointsForm :match="match" @added="onPointsAdded($event)">
              </AddPointsForm>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
      <v-layout v-if="withAdminOptions" row>
        <v-flex xs12>
          <v-card class="pa-1" color="#ffba8a">
            <v-btn
              block
              class="match-scorers-options elevation-0"
              color="#ffba8a"
              @click="onResetButtonClicked"
            >
              <v-icon color="red" size="20">undo</v-icon>
              RESETUJ PUNKTY
              <v-icon color="red" size="20">undo</v-icon>
            </v-btn>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import AddPointsForm from "./AddPointsForm";

export default {
  name: "MatchDetailsDialog",
  data() {
    return {
      dialog: false,
      matchScoreTableHeaders: [
        { text: "Gracz", value: "Player", align: "center", sortable: "false" },
        {
          text: "Punkty",
          value: "pointsQty",
          align: "center",
          sortable: "false"
        }
      ],
      matchScores: [[], []]
    };
  },
  props: {
    match: Object,
    withAdminOptions: Boolean
  },
  components: {
    AddPointsForm
  },
  computed: {
    matchDateFormatted: function() {
      return this.match.matchDateTime.replace("T", " ");
    },
    ...mapGetters(["apiUrl"])
  },
  methods: {
    getMatchPoints: function(matchId) {
      axios
        .get(`${this.apiUrl}/api/match/${matchId}/points`)
        .then(response => {
          if (response.status === 200) {
            this.matchScores = [[], []];
            response.data.forEach(d => {
              if (d.player.teamId === this.match.homeTeamId) {
                this.matchScores[0].push(d);
              } else if (d.player.teamId === this.match.guestTeamId) {
                this.matchScores[1].push(d);
              }
            });
          } else {
            alert("Nie udało się zdobyć informacji na temat punktów w meczu");
          }
        })
        .catch(err => console.log(err));
    },
    onPointsAdded: function(event) {
      this.getMatchPoints(event);
    },
    onResetButtonClicked: function() {
      if (confirm("Czy napewno chcesz zresetować punkty graczy w tym meczu?")) {
        axios
          .delete(`${this.apiUrl}/api/points/${this.match.matchId}`)
          .then(response => {
            if (response.status === 202) {
              alert("Poprawnie zresetowano punkty graczy dla tego meczu");
              this.matchScores = [[], []];
            } else if (response.status === 404) {
              alert("Mecz dla istnieje.");
            } else {
              alert(
                "Nieznany błąd podczas próby usuniecia punktów graczy dla tego meczu"
              );
            }
          })
          .catch(err => console.log(err));
      }
    }
  }
};
</script>

<style scoped lang="less">
.match-dateTime {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}
.match-score-participant {
  .match-dateTime();
  font-size: 34px;
}

.match-score-score {
  .match-dateTime();
  font-size: 45px;
}

.match-scorers-head {
  .match-dateTime();
  font-size: 16px;
  text-decoration: underline;
}

.match-scorers-options {
  .match-scorers-head();
  text-decoration: none;
  letter-spacing: 1.2px;
}

.v-expansion-panel__header {
  padding: 0 !important;
}
</style>
