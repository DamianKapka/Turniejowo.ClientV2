<template>
  <v-container>
    <v-layout row>
      <v-flex xs10 offset-xs1>
        <v-card class="elevation-24 main-card">
          <v-flex xs12>
            <v-card class="tournament-header">
              #{{ tournamentId }} {{ tournament.name }}
            </v-card>
          </v-flex>
          <v-layout row>
            <v-flex xs3
              ><NavBarCard
                LabelInfo="Edytuj Informacje"
                ActiveClass="EditGeneral"
                RouterLink="EditGeneral"
              ></NavBarCard
            ></v-flex>
            <v-flex xs3
              ><NavBarCard
                LabelInfo="Edytuj Uczestników"
                ActiveClass="EditParticipants"
                RouterLink="EditParticipants"
              ></NavBarCard
            ></v-flex>
            <v-flex xs3
              ><NavBarCard
                LabelInfo="Edytuj Przebieg"
                ActiveClass="EditProgress"
                RouterLink="EditProgress"
              ></NavBarCard
            ></v-flex>
            <v-flex xs3
              ><NavBarCard
                LabelInfo="Cofnij"
                ActiveClass="MyTournaments"
                RouterLink="MyTournaments"
              ></NavBarCard
            ></v-flex>
          </v-layout>
          <router-view
            v-if="!isFetching"
            @tournamentEdited="refreshCurrentlyEditedTournament($event)"
          ></router-view>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
      tournament: Object
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
    ...mapMutations([
        "mutateCurrentlyEditedTournament"
    ])
  }
};
</script>

<style scoped>
.tournament-header {
  text-align: center;
  font-size: 48px;
}
</style>
