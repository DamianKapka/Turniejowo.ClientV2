<template>
  <v-container>
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
              <v-flex xs10>{{ match.teamA || "-"}}</v-flex>
              <v-flex xs2 style="border: 1px solid black"><strong>{{ match.teamAPoints || "-"}}</strong></v-flex>
            </v-layout>
          </v-card>
          <v-card :class="bracketCardEntryClasses(match, `B`)">
            <v-layout row>
              <v-flex xs10>{{ match.teamB || "-"}}</v-flex>
              <v-flex xs2 style="border: 1px solid black"><strong>{{ match.teamBPoints || "-"}}</strong></v-flex>
            </v-layout>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const rounds = [
  {
    name: "1/8",
    matches: [
      {
        id: 0,
        teamA: "Teleinformatyka",
        teamB: "Informatyka Stosowana",
        teamAPoints: 2,
        teamBPoints: 3,
        isFinished: true
      },
      {
        id: 1,
        teamA: "Rolnictwo",
        teamB: "Architektura",
        teamAPoints: 2,
        teamBPoints: 1,
        isFinished: true
      },
      {
        id: 2,
        teamA: "Budownictwo",
        teamB: "Zarzadzanie",
        teamAPoints: 5,
        teamBPoints: 1,
        isFinished: true
      },
      {
        id: 3,
        teamA: "Budowa maszyn",
        teamB: "Elektronika",
        teamAPoints: 3,
        teamBPoints: 4,
        isFinished: true
      },
      {
        id: 4,
        teamA: "Biotechnologia",
        teamB: "Fizyka",
        teamAPoints: 2,
        teamBPoints: 4,
        isFinished: true
      },
      {
        id: 5,
        teamA: "Finanse",
        teamB: "Geodezja",
        teamAPoints: 1,
        teamBPoints: 5,
        isFinished: true
      },
      {
        id: 6,
        teamA: "Inżynieria Środowiska",
        teamB: "Mechatronika",
        teamAPoints: 2,
        teamBPoints: 4,
        isFinished: true
      },
      {
        id: 7,
        teamA: "Transport",
        teamB: "Weterynaria",
        teamAPoints: 1,
        teamBPoints: 2,
        isFinished: true
      }
    ]
  },
  {
    name: "quaters",
    matches: [
      {
        id: 8,
        teamA: "Informatyka Stosowana",
        teamB: "Rolnictwo",
        teamAPoints: 3,
        teamBPoints: 2,
        isFinished: true
      },
      {
        id: 9,
        teamA: "Budownictwo",
        teamB: "Elektornika",
        teamAPoints: 3,
        teamBPoints: 1,
        isFinished: true
      },
      {
        id: 10,
        teamA: "Fizyka",
        teamB: "Geodezja",
        teamAPoints: 0,
        teamBPoints: 0,
        isFinished: false
      },
      {
        id: 11,
        teamA: "Mechatronika",
        teamB: "Weterynria",
        teamAPoints: 5,
        teamBPoints: 1,
        isFinished: true
      }
    ]
  },
  {
    name: "semi",
    matches: [
      {
        id: 12,
        teamA: "Informatyka Stosowana",
        teamB: "Budownictwo",
        teamAPoints: 4,
        teamBPoints: 3,
        isFinished: true
      },
      {
        id: 13,
        teamA: undefined,
        teamB: "Mechatronika",
        teamAPoints: 0,
        teamBPoints: 0,
        isFinished: false
      }
    ]
  },
  {
    name: "final",
    matches: [
      {
        id: 14,
        teamA: "Informatyka Stosowana",
        teamB: undefined,
        teamAPoints: undefined,
        teamBPoints: undefined,
        isFinished: false
      }
    ]
  }
];

export default {
  name: "Bracket",
  data() {
    return {
      rounds: rounds
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
