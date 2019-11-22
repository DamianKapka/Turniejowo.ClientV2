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
              <v-flex xs10>{{ match.teamA || "-" }}</v-flex>
              <v-flex xs2 style="border: 1px solid black"
                ><strong>{{ match.teamAPoints || "-" }}</strong></v-flex
              >
            </v-layout>
          </v-card>
          <v-card :class="bracketCardEntryClasses(match, `B`)">
            <v-layout row>
              <v-flex xs10>{{ match.teamB || "-" }}</v-flex>
              <v-flex xs2 style="border: 1px solid black"
                ><strong>{{ match.teamBPoints || "-" }}</strong></v-flex
              >
            </v-layout>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//import { SixteenTeamsFilled } from "../../utils/bracketTestData";
import { EightTeamsFilled } from "../../utils/bracketTestData";

export default {
  name: "Bracket",
  data() {
    return {
      numOfTeams: EightTeamsFilled.numOfTeams,
      rounds: EightTeamsFilled.rounds
    };
  },
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
        (match.teamAPoints > match.teamBPoints && teamId === "A") ||
        (match.teamBPoints > match.teamAPoints && teamId === "B")
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
          return 0;
        case 1:
          return 70;
        case 2:
          return 210;
        case 3:
          return 0;
      }
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
