<template>
  <v-container class="pa-5">
    <v-layout row>
      <v-flex
        v-for="round in rounds"
        :key="round.name"
        :class="bracketFlexClasses(rounds.length)"
      >
        <v-card
          :style="bracketCardStyle(rounds.indexOf(round))"
          v-for="match in round.matches"
          :key="match.id"
          class="bracket-match-card"
        >
          <v-card :class="bracketCardEntryClasses(match, `A`)">
            <v-layout row>
              <v-flex xs10>{{ match.homeTeamName || "-" }}</v-flex>
              <v-flex xs2 style="border: 1px solid black"
                ><strong>{{ match.isFinished ? match.homeTeamPoints : "-" }}</strong></v-flex
              >
            </v-layout>
          </v-card>
          <v-card :class="bracketCardEntryClasses(match, `B`)">
            <v-layout row>
              <v-flex xs10>{{ match.guestTeamName || "-" }}</v-flex>
              <v-flex xs2 style="border: 1px solid black"
                ><strong>{{ match.isFinished ? match.guestTeamPoints : "-" }}</strong></v-flex
              >
            </v-layout>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "Bracket",
  data() {
    return {
      rounds: []
    };
  },
  created() {
    this.getTournamentBracket();
  },
  computed: mapGetters(["apiUrl"]),
  methods: {
    bracketFlexClasses: function(roundsLenght) {
      return [`xs${12 / roundsLenght}`, "text-xs-left"];
    },
    bracketCardStyle: function(roundIndex) {
      const layerMarginTop = this.countMarginTopForRound(roundIndex);
      const leyerMatginBottom = this.countMarginBottomForRound(roundIndex);

      return [
        { margin: `${layerMarginTop}px 1px ${leyerMatginBottom}px 1px` },
        { border: `1px solid black` },
        { height: `70px` },
        { padding: `0px` }
      ];
    },
    bracketCardEntryClasses(match, teamId) {
      if (!match.isFinished) {
        return ["bracketCardEntryUndefinedStyle"];
      } else if (
        (match.homeTeamPoints > match.guestTeamPoints && teamId === "A") ||
        (match.guestTeamPoints > match.homeTeamPoints && teamId === "B")
      ) {
        return ["bracketCardEntryWinnerStyle"];
      } else {
        return ["bracketCardEntryLoserStyle"];
      }
    },
    countMarginTopForRound: function(roundIndex) {
      switch (roundIndex) {
        case 0:
          return 0;
        case 1:
          return 35;
        case 2:
          return 105;
        case 3:
          return 240;
      }
    },
    countMarginBottomForRound: function(roundIndex) {
      switch (roundIndex) {
        case 0:
          return 2;
        case 1:
          return 70;
        case 2:
          return 210;
        case 3:
          return 0;
      }
    },
    getTournamentBracket: function() {
      axios
        .get(`${this.apiUrl}/api/tournament/${this.$route.params.id}/bracket`)
        .then(res => {
          switch (res.status) {
            case 200: {
              console.log(res.data.rounds);
              this.rounds = res.data.rounds;
              break;
            }
            case 404: {
              this.$swal.fire({
                type: "error",
                title: "Błąd",
                confirmButtonColor: "#cb4154",
                text: "Turniej nie istnieje w bazie danych",
                showConfirmButton: true,
                timer: 4000
              });
              break;
            }
            case 409: {
              this.$swal.fire({
                type: "error",
                title: "Błąd",
                confirmButtonColor: "#cb4154",
                text:
                  "Turniej nie jest typem drabinkowym, bądź nie ma odpowiedniej liczy drużyn",
                showConfirmButton: true,
                timer: 4000
              });
              break;
            }
            default: {
              this.$swal.fire({
                type: "error",
                title: "Błąd",
                confirmButtonColor: "#cb4154",
                text: "Nieznany błąd podczas próby pobrania drabinki turnieju",
                showConfirmButton: true,
                timer: 4000
              });
            }
          }
        });
    }
  }
};
</script>

<style scoped lang="less">
.bracketCardEntryBaseStyle {
  text-align: center;
  padding: 2%;
  height: 34px;
  margin: 0;
}

.bracketCardEntryWinnerStyle {
  .bracketCardEntryBaseStyle;
  background-color: #96e697;
}
.bracketCardEntryLoserStyle {
  .bracketCardEntryBaseStyle;
  background-color: lightcoral;
}
.bracketCardEntryUndefinedStyle {
  .bracketCardEntryBaseStyle;
  background-color: azure;
}
</style>
