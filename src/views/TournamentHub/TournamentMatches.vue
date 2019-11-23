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
            this.Matches = res.data;
            break;
          }
          case 404: {
            this.$swal.fire({
              type: "info",
              title: "Informacja",
              text: "W tym turnieju nie rozegrane zostały jeszcze żadne mecze",
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
              text: "Nie można pobrać rezultatów turnieju",
              showConfirmButton: true,
              timer: 4000
            });
            break;
          }
        }
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  }
};
</script>

<style scoped></style>
