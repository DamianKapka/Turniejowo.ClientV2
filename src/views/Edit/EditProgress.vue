<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-flex xs10 offset-xs1 style="padding:2%">
    <AddNewResult @ResultAdded="getMatchesGroupedByDate"></AddNewResult>
    <ScheduleGeneratorForm @scheduleGenerated="getMatchesGroupedByDate"></ScheduleGeneratorForm>
    <v-divider></v-divider>
    <MatchInfo
      v-for="match in Matches"
      :key="match.dateTime"
      :Matches="match"
      :WithAdminOptions="true"
      @matchUpdated="getMatchesGroupedByDate"
    ></MatchInfo>
  </v-flex>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import MatchInfo from "../../components/MatchInfo";
import AddNewResult from "../../components/AddNewResult";
import ScheduleGeneratorForm from "../../components/ScheduleGeneratorForm";

export default {
  name: "EditProgress",
  components: { MatchInfo, AddNewResult, ScheduleGeneratorForm },
  data() {
    return {
      valid: false,
      Matches: []
    };
  },
  created() {
    this.getMatchesGroupedByDate();
  },
  methods: {
    getMatchesGroupedByDate() {
      axios
        .get(
          `${this.apiUrl}/api/tournament/${
            this.currentlyEditedTournament.tournamentId
          }/matches?groupedByDateTime=true`
        )
        .then(res => {
          switch (res.status) {
            case 200: {
              this.Matches = res.data;
              break;
            }
            case 404: {
              this.Matches = [];
              break;
            }
            default: {
              console.log("Cannot receive matches grouped by date");
              break;
            }
          }
        })
        .catch(err => console.log(err));
    }
  },
  computed: mapGetters(["apiUrl", "currentlyEditedTournament"])
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
