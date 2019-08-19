<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-flex xs10 offset-xs1 style="padding:5%">
    <v-data-table
      :headers="TableHeaders"
      :items="Matches"
      hide-actions
      class="elevation-0"
    >
      <template v-slot:items="item">
        <tr>
          <td class="text-xs-center">{{ item.item.homeTeamName }}</td>
          <td class="text-xs-center">{{ item.item.guestTeamName }}</td>
          <td class="text-xs-center">
            {{ item.item.homeTeamPoints }} : {{ item.item.guestTeamPoints }}
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-card class="elevation-0 new-result-main-card">
      <v-card-text class="new-result-main-card-text">
        Dodaj nowy wynik
      </v-card-text>
      <v-form ref="form" v-model="valid">
        <v-layout row>
          <v-flex xs6 offset-xs1>
            <v-combobox
              v-model="TeamAName"
              :items="TeamsNames"
              label="Drużyna A"
            >
            </v-combobox>
          </v-flex>
          <v-flex xs2 offset-xs2>
            <v-text-field v-model="TeamAScore" label="Wynik A"> </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs6 offset-xs1>
            <v-combobox
              v-model="TeamBName"
              :items="TeamsNames"
              label="Drużyna B"
            ></v-combobox>
          </v-flex>
          <v-flex xs2 offset-xs2>
            <v-text-field v-model="TeamBScore" label="Wynik B"> </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4 offset-xs4>
            <v-btn color="success" block @click="AddResult()"
              >Dodaj Wynik</v-btn
            >
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>
  </v-flex>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "EditProgress",
  data() {
    return {
      valid: false,
      TableHeaders: [
        { text: "Druzyna A", value: "A", sortable: false, align: "center" },
        { text: "Druzyna B", value: "B", sortable: false, align: "center" },
        { text: "Wynik", value: "W", sortable: false, align: "center" }
      ],
      Matches: [],
      Teams: [],
      TeamAName: "",
      TeamBName: "",
      TeamAScore: "",
      TeamBScore: ""
    };
  },
  created() {
    this.getTournamentMatches();
  },
  methods: {
    AddResult() {
      axios
        .post(`${this.apiUrl}/api/match/`, this.Model)
        .then(res => {
          if (res.status === 201) {
            alert("Mecz poprawnie dodany");
            this.clearForm();
            this.getTournamentMatches();
          }
        })
        .catch(err => console.log(err));
    },

    getMatchTeamsInfo(m) {
      const homeTeam = this.Teams.find(t => t.teamId === m.homeTeamId);

      const guestTeam = this.Teams.find(t => t.teamId === m.guestTeamId);

      const matchInfo = {
        homeTeamName: homeTeam.name,
        guestTeamName: guestTeam.name,
        homeTeamPoints: m.homeTeamPoints,
        guestTeamPoints: m.guestTeamPoints
      };

      return matchInfo;
    },

    findTeamIdBasedOnName(name) {
      const team = this.Teams.find(t => t.name === name);
      return team.teamId;
    },

    getTournamentMatches() {
      axios
        .get(
          `${this.apiUrl}/api/tournament/${
            this.$store.getters.currentlyEditedTournament.tournamentId
          }/teams`
        )
        .then(res => {
          this.Teams = [];
          res.data.forEach(element => {
            this.Teams.push(element);
          });

          return axios.get(
            `${this.apiUrl}/api/tournament/${
              this.currentlyEditedTournament.tournamentId
            }/matches`
          );
        })
        .then(res => {
          this.Matches = [];

          res.data.forEach(m => this.Matches.push(this.getMatchTeamsInfo(m)));
        })

        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },

    clearForm() {
      this.TeamAName = "";
      this.TeamBName = "";
      this.TeamAScore = "";
      this.TeamBScore = "";
    }
  },
  computed: {
    TeamsNames: function() {
      let teamNames = [];
      this.Teams.forEach(element => {
        teamNames.push(element.name);
      });
      return teamNames;
    },

    Model: function() {
      return {
        homeTeamId: this.findTeamIdBasedOnName(this.TeamAName),
        guestTeamId: this.findTeamIdBasedOnName(this.TeamBName),
        homeTeamPoints: this.TeamAScore,
        guestTeamPoints: this.TeamBScore
      };
    },
    ...mapGetters(["apiUrl","currentlyEditedTournament"])
  }
};
</script>

<style scoped>
.new-result-form-card {
  font-size: 14px;
  text-align: center;
  text-decoration: underline;
  padding: 1%;
}

.new-result-main-card {
  border: 1px solid black;
  margin-top: 3%;
}

.new-result-main-card-text {
  font-size: 16px;
  text-decoration: underline;
  text-align: center;
}
</style>
