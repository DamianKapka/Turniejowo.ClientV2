<template>
  <v-container>
    <MatchInfo
      v-for="match in Matches"
      :key="match.dateTime"
      :Matches="match"
      :WithAdminOptions="false"
    ></MatchInfo>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import MatchInfo from "../../components/MatchInfo";

export default {
  name: "TournamentMatches",
  components: { MatchInfo },
  data() {
    return {
      Matches: []
    };
  },
  computed: mapGetters(["apiUrl"]),
  mounted() {
    axios
      .get(
        `${this.apiUrl}/api/tournament/${
          this.$route.params.id
        }/matches?groupedByDateTime=true`
      )
      .then(res => {
        switch (res.status) {
          case 200: {
            res.data.forEach(d => this.Matches.push(d));
            break;
          }
          default: {
            alert("Nie można pobrać rezultatów turnieju");
            break;
          }
        }
      })
      .catch(err => console.log(err));
  }
};
</script>

<style scoped></style>
