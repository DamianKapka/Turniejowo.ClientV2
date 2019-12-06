<template>
  <v-layout row v-if="match.isFinished">
    <v-flex xs4>
      <v-dialog
        v-if="match.isFinished"
        persistent
        v-model="dialogDefault"
        max-width="480"
      >
        <template #activator="{on}">
          <v-icon v-on="on" color="orange" size="30">
            edit
          </v-icon>
        </template>
        <v-card style="padding: 10%">
          <v-card-title class="headline">
            <font-awesome-icon
              icon="edit"
              style="margin-right: 5%"
            ></font-awesome-icon>
            Edycja wyniku
          </v-card-title>
          <v-form ref="form" v-model="valid" style="padding: 5%">
            <v-layout row>
              <v-flex xs8>
                <v-text-field
                  readonly
                  v-model="match.homeTeamName"
                  label="Drużyna gospodarzy"
                ></v-text-field>
              </v-flex>
              <v-flex xs3 offset-xs1>
                <v-text-field
                  label="Wynik"
                  v-model="match.homeTeamPoints"
                  :rules="teamPointsRules"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs8>
                <v-text-field
                  readonly
                  v-model="match.guestTeamName"
                  label="Drużyna gości"
                ></v-text-field>
              </v-flex>
              <v-flex xs3 offset-xs1>
                <v-text-field
                  label="Wynik"
                  v-model="match.guestTeamPoints"
                  :rules="teamPointsRules"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
          <v-card-actions>
            <v-btn color="success" @click="edit()" class="button"
              ><v-icon>thumb_up</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="cancel()" class="button">
              <v-icon>thumb_down</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
    <v-flex xs4>
      <MatchDetailsDialog :match="match" :withAdminOptions="true">
      </MatchDetailsDialog>
    </v-flex>
    <v-flex xs4>
      <ThrashDeleteMatchDialog
        @deleted="$emit('updated')"
        :matchId="match.matchId"
      >
      </ThrashDeleteMatchDialog>
    </v-flex>
  </v-layout>
  <v-dialog v-else persistent v-model="dialogDefault" max-width="480">
    <template #activator="{on}">
      <v-icon color="green" v-on="on" size="30">
        assignment_turned_in
      </v-icon>
    </template>
    <v-card style="padding: 10%">
      <v-card-title class="headline">
        <font-awesome-icon
          icon="calendar-check"
          style="margin-right: 5%"
        ></font-awesome-icon>
        Dodawanie wyniku
      </v-card-title>
      <v-form ref="form" v-model="valid" style="padding: 5%">
        <v-layout row>
          <v-flex xs8>
            <v-text-field
              readonly
              v-model="match.homeTeamName"
              label="Drużyna gospodarzy"
            ></v-text-field>
          </v-flex>
          <v-flex xs3 offset-xs1>
            <v-text-field
              label="Wynik"
              v-model="addHomeTeamPoints"
              :rules="teamPointsRules"
            >
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs8>
            <v-text-field
              readonly
              v-model="match.guestTeamName"
              label="Drużyna gości"
            ></v-text-field>
          </v-flex>
          <v-flex xs3 offset-xs1>
            <v-text-field
              label="Wynik"
              v-model="addGuestTeamPoints"
              :rules="teamPointsRules"
            >
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
      <v-card-actions>
        <v-btn color="success" @click="add" class="button"
          ><v-icon>thumb_up</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="cancel" class="button">
          <v-icon>thumb_down</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import MatchDetailsDialog from "./MatchDetailsDialog";
import ThrashDeleteMatchDialog from "./ThrashDeleteMatchDialog";

export default {
  name: "UpdateResultDialog",
  props: ["match"],
  data() {
    return {
      dialogDefault: false,
      dialogPoints: false,
      valid: false,
      initialHomeTeamPoints: null,
      initialGuestTeamPoints: null,
      addHomeTeamPoints: null,
      teamPointsRules: [
        m => !!m || "Wprowadz wynik",
        m => m >= 0 || "Wynik musi być wiekszy od 0",
        m => /^\d{1,3}$/.test(m) || "Wynik musi byc liczba 0 - 999"
      ],
      addGuestTeamPoints: null
    };
  },
  mounted() {
    this.savePointsState();
  },
  computed: mapGetters(["apiUrl"]),
  components: {
    MatchDetailsDialog,
    ThrashDeleteMatchDialog
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        const dto = {
          MatchId: this.match.matchId,
          MatchDateTime: this.match.matchDateTime,
          IsFinished: true,
          HomeTeamId: this.match.homeTeamId,
          GuestTeamId: this.match.guestTeamId,
          HomeTeamPoints: this.addHomeTeamPoints,
          GuestTeamPoints: this.addGuestTeamPoints,
          BracketIndex: this.match.bracketIndex
        };

        const apiUrl = `${this.apiUrl}/api/match/${this.match.matchId}`;

        axios
          .put(apiUrl, dto)
          .then(res => {
            switch (res.status) {
              case 202: {
                this.$swal.fire({
                  type: "success",
                  title: "Sukces",
                  confirmButtonColor: "#7fffd4",
                  text: "Wynik dodany",
                  showConfirmButton: true,
                  timer: 4000
                });
                this.$emit("updated");
                break;
              }
              case 404: {
                this.$swal.fire({
                  type: "error",
                  title: "Błąd",
                  confirmButtonColor: "#cb4154",
                  text: "Turniej nie występuje w bazie danych",
                  showConfirmButton: true,
                  timer: 4000
                });
                break;
              }
              case 429: {
                this.$swal.fire({
                  type: "error",
                  title: "Błąd",
                  confirmButtonColor: "#cb4154",
                  text:
                    "W turnieju drabinkowym mecz nie może zakończyć się remisem",
                  showConfirmButton: true,
                  timer: 4000
                });
                break;
              }
              case 400: {
                this.$swal.fire({
                  type: "error",
                  title: "Błąd",
                  confirmButtonColor: "#cb4154",
                  text: "Błąd podczas próby edycji wyniku",
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
                  text: "Nieznany błąd podczas próby edycji wyniku",
                  showConfirmButton: true,
                  timer: 4000
                });
                break;
              }
            }

            this.savePointsState();
            this.dialogDefault = false;
          })
          .catch(err => console.log(err));
      }
    },
    edit() {
      if (this.$refs.form.validate()) {
        const apiUrl = `${this.apiUrl}/api/match/${this.match.matchId}`;

        axios
          .put(apiUrl, this.match)
          .then(res => {
            switch (res.status) {
              case 202: {
                this.$swal.fire({
                  type: "success",
                  title: "Sukces",
                  confirmButtonColor: "#7fffd4",
                  text: "Wynik zedytowany",
                  showConfirmButton: true,
                  timer: 4000
                });
                this.$emit("updated");
                break;
              }
              case 429: {
                this.$swal.fire({
                  type: "error",
                  title: "Błąd",
                  confirmButtonColor: "#cb4154",
                  text:
                    "W turnieju drabinkowym mecz nie może zakończyć się remisem",
                  showConfirmButton: true,
                  timer: 4000
                });
                this.cancel();
                break;
              }
              case 431: {
                this.$swal.fire({
                  type: "error",
                  title: "Błąd",
                  confirmButtonColor: "#cb4154",
                  text:
                    "Nie można usunąć meczu. Jedna z drużyn rozgrywa mecz w dalszej fazie turnieju",
                  showConfirmButton: true,
                  timer: 4000
                });
                this.cancel();
                break;
              }
              case 404: {
                this.$swal.fire({
                  type: "error",
                  title: "Błąd",
                  confirmButtonColor: "#cb4154",
                  text: "Turniej nie istnieje",
                  showConfirmButton: true,
                  timer: 4000
                });
                break;
              }
              case 400: {
                this.$swal.fire({
                  type: "error",
                  title: "Błąd",
                  confirmButtonColor: "#cb4154",
                  text: "Błędne żądanie",
                  showConfirmButton: true,
                  timer: 4000
                });
                this.cancel();
                break;
              }
              default: {
                this.$swal.fire({
                  type: "error",
                  title: "Błąd",
                  confirmButtonColor: "#cb4154",
                  text: "Nieznany błąd podczas próby zaktualizowania wyniku",
                  showConfirmButton: true,
                  timer: 4000
                });
                this.cancel();
                break;
              }
            }

            this.savePointsState();
            this.dialogDefault = false;
          })
          .catch(err => console.log(err));
      }
    },
    cancel() {
      this.match.homeTeamPoints = this.initialHomeTeamPoints;
      this.match.guestTeamPoints = this.initialGuestTeamPoints;
      this.dialogDefault = false;
    },
    savePointsState() {
      this.initialHomeTeamPoints = this.match.homeTeamPoints;
      this.initialGuestTeamPoints = this.match.guestTeamPoints;
    }
  }
};
</script>

<style>
.button {
  width: 40%;
  padding-left: 5%;
  padding-right: 5%;
}
</style>
