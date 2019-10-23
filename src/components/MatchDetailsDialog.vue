<template>
  <v-dialog v-model="dialog" max-width="700">
    <template v-slot:activator="{ on }">
      <v-icon v-on="on">
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

    </v-container>
  </v-dialog>
</template>

<script>
export default {
  name: "MatchDetailsDialog",
  data() {
    return {
      dialog: false
    };
  },
  props: {
    match: Object
  },
  computed: {
    matchDateFormatted: function() {
      return this.match.matchDateTime.replace("T", " ");
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
</style>
