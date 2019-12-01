<template>
  <v-expansion-panel style="border: 2px solid #ffb984">
    <v-expansion-panel-content>
      <template #header>
        <div class="text-xs-center" style="font-weight: bold">
          DODAJ MECZ
        </div>
      </template>
      <v-form
        ref="form"
        class="form"
        valid="valid"
        style="margin-left: 20%; width: 60%"
      >
        <v-menu
          v-model="dateMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              ref="menu"
              v-model="matchDate"
              label="Data meczu"
              prepend-icon="event"
              readonly
              :rules="matchDateRules"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="matchDate"
            @input="dateMenu = false"
          ></v-date-picker>
        </v-menu>
        <v-menu
          ref="menu"
          v-model="timeMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="matchTime"
              label="Godzina meczu"
              prepend-icon="access_time"
              readonly
              :rules="matchTimeRules"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="timeMenu"
            v-model="matchTime"
            full-width
            @click:minute="timeMenu = false"
          ></v-time-picker>
        </v-menu>
        <v-combobox
          v-model="selectedHomeTeam"
          :items="tournamentTeamsNames"
          :rules="selectedHomeTeamRules"
          label="Drużyna gospodarzy"
          prepend-icon="group_add"
        ></v-combobox>
        <v-combobox
          v-model="selectedGuestTeam"
          :items="tournamentTeamsNames"
          :rules="selectedGuestTeamRules"
          label="Drużyna gości"
          prepend-icon="group_add"
        ></v-combobox>
        <ConfirmButton Message="DODAJ MECZ" @clicked="add"></ConfirmButton>
      </v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import axios from "axios";
import ConfirmButton from "./ConfirmButton";
import { mapGetters } from "vuex";

export default {
  name: "AddNewResult",
  components: { ConfirmButton },
  data() {
    return {
      valid: false,
      dateMenu: false,
      timeMenu: false,
      matchDate: new Date().toISOString().substr(0, 10),
      matchDateRules: [date => !!date || "Podaj datę meczu"],
      matchTime: null,
      matchTimeRules: [time => !!time || "Podaj godzinę meczu"],
      tournamentTeams: [],
      selectedHomeTeam: null,
      selectedHomeTeamRules: [
        homeTeam => !!homeTeam || "Wybierz drużynę gospodarzy",
        homeTeam =>
          homeTeam !== this.selectedGuestTeam || "Błąd! Takie same drużyny"
      ],
      selectedGuestTeam: null,
      selectedGuestTeamRules: [
        guestTeam => !!guestTeam || "Wybierz drużynę gospodarzy",
        guestTeam =>
          guestTeam !== this.selectedHomeTeam || "Błąd! Takie same drużyny"
      ]
    };
  },
  created() {
    this.getTournamentTeams();
  },
  computed: {
    matchModel: function() {
      return {
        HomeTeamId: this.tournamentTeams.find(
          t => t.name === this.selectedHomeTeam
        ).teamId,
        GuestTeamId: this.tournamentTeams.find(
          t => t.name === this.selectedGuestTeam
        ).teamId,
        HomeTeamPoints: 0,
        GuestTeamPoints: 0,
        IsFinished: false,
        MatchDateTime: `${this.matchDate} ${this.matchTime}`
      };
    },
    tournamentTeamsNames: function() {
      return this.tournamentTeams.map(t => t.name);
    },
    ...mapGetters(["apiUrl", "currentlyEditedTournament"])
  },
  methods: {
    getTournamentTeams() {
      axios
        .get(
          `${this.apiUrl}/api/tournament/${this.currentlyEditedTournament.tournamentId}/teams`
        )
        .then(response => {
          switch (response.status) {
            case 200: {
              this.tournamentTeams = response.data;
              break;
            }
            case 404: {
              this.$swal.fire({
                type: "info",
                title: "Informacja",
                //confirmButtonColor: "#cb4154",
                text: "Brak drużyn w tym turnieju",
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
                text: "Brak drużyn w tym turnieju",
                showConfirmButton: true,
                timer: 4000
              });
              break;
            }
          }
        })
        .catch(err => console.log(err));
    },
    add() {
      if (this.$refs.form.validate()) {
        axios.post(`${this.apiUrl}/api/match`, this.matchModel).then(res => {
          switch (res.status) {
            case 201: {
              this.$swal.fire({
                type: "success",
                title: "Sukces",
                confirmButtonColor: "#7fffd4",
                text: "Dodano mecz",
                showConfirmButton: true,
                timer: 4000
              });
              this.$emit("ResultAdded");
              break;
            }
            case 406: {
              this.$swal.fire({
                type: "error",
                title: "Błąd",
                confirmButtonColor: "#cb4154",
                text: "Jedna z drużyn rozgrywa już mecz w tym terminie",
                showConfirmButton: true,
                timer: 4000
              });
              break;
            }
            case 418: {
              this.$swal.fire({
                type: "error",
                title: "Błąd",
                confirmButtonColor: "#cb4154",
                text: "Drużyny nie są z tego samego turnieju",
                showConfirmButton: true,
                timer: 4000
              });
              break;
            }
            case 427: {
              this.$swal.fire({
                type: "error",
                title: "Błąd",
                confirmButtonColor: "#cb4154",
                text:
                  "W turnieju drabinkowym manulanie można dodać tylko 1 runde turnueju. Reszta bedzie autogenerowana",
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
                text: "Nieznany błąd podczas próby dodania meczu",
                showConfirmButton: true,
                timer: 4000
              });
              break;
            }
          }
        });
      }
    }
  }
};
</script>

<style scoped></style>
