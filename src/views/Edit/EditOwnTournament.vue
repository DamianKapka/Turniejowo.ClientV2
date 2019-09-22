<template>
  <v-layout row>
    <v-flex xs10 offset-xs1>
      <v-card class="elevation-24 main-card">
        <v-flex xs12>
          <v-card class="tournament-header">
            #{{ tournamentId }} {{ tournament.name }}
          </v-card>
        </v-flex>
        <v-layout row>
          <v-flex xs3 v-for="info in navBarCardInfo" :key="info.ActiveClass">
            <NavBarCard
              :LabelInfo="info.LabelInfo"
              :ActiveClass="info.ActiveClass"
              :RouterLink="info.RouterLink"
            ></NavBarCard>
          </v-flex>
        </v-layout>
        <router-view
          v-if="!isFetching"
          @tournamentEdited="refreshCurrentlyEditedTournament($event)"
        ></router-view>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import NavBarCard from "../../components/NavBarCard";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "EditOwnTournament",
  components: { NavBarCard },
  data() {
    return {
      isFetching: true,
      tournamentId: Number,
      tournament: Object,
      navBarCardInfo: [
        {
          LabelInfo: "Edytuj Informacje",
          ActiveClass: "EditGeneral",
          RouterLink: "EditGeneral"
        },
        {
          LabelInfo: "Edytuj Uczestników",
          ActiveClass: "EditParticipants",
          RouterLink: "EditParticipants"
        },
        {
          LabelInfo: "Edytuj Przebieg",
          ActiveClass: "EditProgress",
          RouterLink: "EditProgress"
        },
        {
          LabelInfo: "Cofnij",
          ActiveClass: "MyTournaments",
          RouterLink: "MyTournaments"
        }
      ]
    };
  },
  computed: mapGetters(["apiUrl"]),
  created() {
    this.tournamentId = this.$route.params.id;

    axios
      .get(`${this.apiUrl}/api/tournament/${this.tournamentId}`)
      .then(res => {
        this.mutateCurrentlyEditedTournament(res.data);
        this.tournament = res.data;
        this.isFetching = false;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    refreshCurrentlyEditedTournament(tournament) {
      this.mutateCurrentlyEditedTournament(tournament);
    },
    ...mapMutations(["mutateCurrentlyEditedTournament"])
  }
};
</script>

<style scoped>
.tournament-header {
  text-align: center;
  font-size: 48px;
}
</style>
