<template>
  <v-list-tile-action style="width:100%">
    <v-layout row>
      <v-flex xs2 class="toi-flex">
        <v-list-tile-title style="font-weight:bold ;text-align: center">
          #{{ tournament.tournamentId }}
        </v-list-tile-title>
      </v-flex>
      <v-flex xs8 class="toi-flex">
        <v-list-tile-title style="font-weight:bold; text-align: center">
          {{ tournament.name }}
        </v-list-tile-title>
      </v-flex>
      <v-flex xs1 class="toi-flex toi-icon" @click="editTournament"
        ><font-awesome-icon icon="edit"
      /></v-flex>
      <v-flex
        xs1
        class="toi-flex toi-icon toi-delete-icon"
        @click="deleteTournament"
      >
        <font-awesome-icon icon="trash-alt"></font-awesome-icon>
      </v-flex>
    </v-layout>
  </v-list-tile-action>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "TournamentOwnerInfo",
  props: {
    tournament: Object
  },
  computed: mapGetters(["apiUrl"]),
  methods: {
    editTournament() {
      this.$router.push({
        name: "EditOwnTournament",
        params: { id: this.tournament.tournamentId }
      });
    },
    deleteTournament() {
      if (
        confirm(`Czy napewno chcesz usunac turniej '${this.tournament.name}'?`)
      ) {
        axios
          .delete(
            `${this.apiUrl}/api/tournament/${this.tournament.tournamentId}`
          )
          .then(res => {
            if (res.status === 202) {
              this.$swal.fire({
                type: "success",
                title: "Sukces",
                confirmButtonColor: "#7fffd4",
                text: "Turniej usunięty poprawnie",
                showConfirmButton: true,
                timer: 4000
              });
              this.$emit("tournamentDeleted");
            } else {
              this.$swal.fire({
                type: "error",
                title: "Blad",
                confirmButtonColor: "#7fffd4",
                text: "Nie udało się usunąc turnieju",
                showConfirmButton: true,
                timer: 4000
              });
            }
          })
          .catch(err => console.log(err.response));
      }
    }
  }
};
</script>

<style scoped>
.toi-flex {
  border: 1px solid black;
  border-radius: 12px;
  padding: 1%;
}
.toi-flex:hover {
  background-color: #ffb984;
}
.toi-icon {
  text-align: center;
}
.toi-delete-icon {
  color: red;
}
</style>
