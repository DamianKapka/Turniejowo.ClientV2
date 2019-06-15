<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-flex xs10 offset-xs1 style="padding:5%">
    <v-data-table
      :headers="TableHeaders"
      :items="matches"
      hide-actions
      class="elevation-0"
    >
      <template v-slot:items="item">
        <tr>
          <td class="text-xs-center">{{ item.item.teamOne }}</td>
          <td class="text-xs-center">{{ item.item.teamTwo }}</td>
          <td class="text-xs-center">
            {{ item.item.teamOneScore }} : {{ item.item.teamTwoScore }}
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
            <v-text-field v-model="TeamAScore" label="Wynik A">
            </v-text-field>
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
      matches: [
      ],
      Teams: [],
      TeamAName: "",
      TeamBName: "",
      TeamAScore: "",
      TeamBScore: ""
    };
  },
  created() {
    axios
      .get(
        `https://localhost:5001/api/tournament/${this.$route.params.id}/teams`
      )
      .then(res => {
        res.data.forEach(element => {
          this.Teams.push(element);
        });
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  },
  methods: {
    AddResult() {
      this.matches.push({
        teamOne: this.TeamAName,
        teamTwo: this.TeamBName,
        teamOneScore: this.TeamAScore,
        teamTwoScore: this.TeamBScore
      });
    }
  },
  computed: {
    TeamsNames: function() {
      let teamNames = [];
      this.Teams.forEach(element => {
        teamNames.push(element.name);
      });
      return teamNames;
    }
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
