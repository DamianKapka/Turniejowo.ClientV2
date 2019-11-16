<template>
  <v-form ref="form" v-model="valid" class="form pa-3">
    <v-layout row>
      <v-flex xs5 class="pa-1">
        <v-combobox
          v-model="chosenTeam"
          :items="matchTeams"
          :rules="chosenTeamRules"
          placeholder="Wybierz drużyne"
          label="Drużyna"
          item-text="name"
          return-object
          required
        ></v-combobox>
      </v-flex>
      <v-flex xs5 class="pa-1">
        <v-combobox
          v-model="chosenPlayer"
          :items="chosenTeamPlayers"
          :rules="chosenPlayerRules"
          label="Gracz"
          return-object
          required
        >
          <template slot="item" slot-scope="data">
            {{ data.item.fName }} {{ data.item.lName }}
          </template>
          <template slot="selection" slot-scope="data">
            {{ data.item.fName }} {{ data.item.lName }}
          </template>
        </v-combobox>
      </v-flex>
      <v-flex xs2 class="pa-1">
        <v-text-field
          v-model="points"
          :rules="pointsRules"
          type="number"
          required
        >
        </v-text-field>
      </v-flex>
    </v-layout>
    <ConfirmButton
      Message="DODAJ"
      class="pa-2"
      style="margin-left: 30%; width: 40%;"
      @clicked="add"
    ></ConfirmButton>
  </v-form>
</template>

<script>
import ConfirmButton from "./ConfirmButton";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "AddPointsForm",
  data() {
    return {
      valid: true,
      chosenTeam: "",
      chosenTeamPlayers: [],
      chosenTeamRules: [t => !!t || "Wybierz drużynę"],
      chosenPlayer: "",
      chosenPlayerRules: [p => !!p || "Wybierz gracza"],
      matchTeams: [
        { id: this.match.homeTeamId, name: this.match.homeTeamName },
        { id: this.match.guestTeamId, name: this.match.guestTeamName }
      ],
      homeTeamPlayers: [],
      guestTeamPlayers: [],
      points: "",
      pointsRules: [
        p => !!p || "Wpisz liczbę punktów",
        p => /^[0-9]{1,2}$/.test(p) || "Punkty muszą być liczbą 1-99",
        p => p > 0 || "Punkty muszą być liczbą 1-99"
      ]
    };
  },
  watch: {
    chosenTeam: function(val) {
      if (val.name === this.match.homeTeamName) {
        this.chosenTeamPlayers = this.homeTeamPlayers;
      } else {
        this.chosenTeamPlayers = this.guestTeamPlayers;
      }

      this.chosenPlayer = this.chosenTeamPlayers[0];
    }
  },
  computed: {
    requestModel: function() {
      return {
        matchId: this.match.matchId,
        playerId: this.chosenPlayer.playerId,
        tournamentId: this.currentlyEditedTournament.tournamentId,
        pointsQty: this.points
      };
    },
    ...mapGetters(["apiUrl", "currentlyEditedTournament"])
  },
  mounted() {
    this.getMatchPlayers();
  },
  methods: {
    getMatchPlayers: function() {
      axios
        .get(`${this.apiUrl}/api/team/${this.match.homeTeamId}/players`)
        .then(response => {
          if (response.status === 200) {
            this.homeTeamPlayers = response.data;
            return axios.get(
              `${this.apiUrl}/api/team/${this.match.guestTeamId}/players`
            );
          } else {
            this.$swal.fire({
              type: "error",
              title: "Błąd",
              confirmButtonColor: "#cb4154",
              text: "Wystąpił problem z pobranie, graczy występujących w meczu",
              showConfirmButton: true,
              timer: 4000
            });
          }
        })
        .then(response => {
          if (response.status === 200) {
            this.guestTeamPlayers = response.data;
          } else {
            this.$swal.fire({
              type: "error",
              title: "Błąd",
              confirmButtonColor: "#cb4154",
              text: "Wystąpił problem z pobranie, graczy występujących w meczu",
              showConfirmButton: true,
              timer: 4000
            });
          }
        })
        .catch(err => console.log(err));
    },
    add() {
      if (this.$refs.form.validate()) {
        axios
          .post(`${this.apiUrl}/api/points`, this.requestModel)
          .then(response => {
            if (response.status === 202) {
              this.$swal.fire({
                type: "success",
                title: "Sukces",
                confirmButtonColor: "#7fffd4",
                text: "Punkty dodane poprawnie",
                showConfirmButton: true,
                timer: 4000
              });
              this.$emit("added", this.match.matchId);
            } else if (response.status === 406) {
              this.$swal.fire({
                type: "error",
                title: "Błąd",
                confirmButtonColor: "#cb4154",
                text: "Przekroczono pulę punktów.",
                showConfirmButton: true,
                timer: 4000
              });
            } else if (response.status === 409) {
              this.$swal.fire({
                type: "error",
                title: "Błąd",
                confirmButtonColor: "#cb4154",
                text: "Podany gracz widnieje już w tabeli punktów tego meczu",
                showConfirmButton: true,
                timer: 4000
              });
            } else if (response.status === 404) {
              this.$swal.fire({
                type: "error",
                title: "Błąd",
                confirmButtonColor: "#cb4154",
                text: "Mecz nie istnieje",
                showConfirmButton: true,
                timer: 4000
              });
            } else {
              this.$swal.fire({
                type: "error",
                title: "Błąd",
                confirmButtonColor: "#cb4154",
                text:
                  "Nieznany błąd podczas próby dodanie punktów graczy dla tego meczu",
                showConfirmButton: true,
                timer: 4000
              });
            }
          })
          .catch(err => console.log(err));
      }
    }
  },
  props: {
    match: Object
  },
  components: {
    ConfirmButton
  }
};
</script>

<style scoped>
.from {
  padding: 0;
}
</style>
