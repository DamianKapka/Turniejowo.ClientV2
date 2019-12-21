<template>
  <v-expansion-panel style="border: 2px solid #ffb984; margin-top: 1%">
    <v-expansion-panel-content>
      <template #header>
        <div class="text-xs-center" style="font-weight: bold">
          WYGENERUJ TERMINARZ
        </div>
      </template>
      <v-form ref="form" style="padding: 4%">
        <header class="header-style">
          Dni tygodnia
        </header>
        <v-layout row>
          <v-switch
            v-model="daysOfWeek"
            label="Poniedziałek"
            value="1"
          ></v-switch>
          <v-switch v-model="daysOfWeek" label="Wtorek" value="2"></v-switch>
          <v-switch v-model="daysOfWeek" label="Środa" value="3"></v-switch>
          <v-switch v-model="daysOfWeek" label="Czwartek" value="4"></v-switch>
          <v-switch v-model="daysOfWeek" label="Piątek" value="5"></v-switch>
          <v-switch v-model="daysOfWeek" label="Sobota" value="6"></v-switch>
          <v-switch v-model="daysOfWeek" label="Niedziela" value="0"></v-switch>
        </v-layout>
        <header class="header-style">
          Początek/koniec turnieju
        </header>
        <v-layout row>
          <v-flex xs3 offset-xs3>
            <v-menu
              v-model="startDateMenu"
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
                  v-model="startDate"
                  label="Data rozpoczecia"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="startDate"
                @input="startDateMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs3>
            <v-menu
              v-model="endDateMenu"
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
                  v-model="endDate"
                  label="Data zakonczenia"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="endDate"
                @input="endDateMenu = false"
                :allowed-dates="allowedEndDates"
              ></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <header class="header-style">
          Godziny rozgrywanych spotkań
        </header>
        <v-layout row>
          <v-flex xs3 offset-xs3>
            <v-menu
              ref="menu"
              v-model="startTimeMenu"
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
                  v-model="startTime"
                  label="Godzina startu spotkań"
                  prepend-icon="access_time"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="startTimeMenu"
                v-model="startTime"
                full-width
                @click:minute="startTimeMenu = false"
              ></v-time-picker>
            </v-menu>
          </v-flex>
          <v-flex xs3>
            <v-menu
              ref="menu"
              v-model="endTimeMenu"
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
                  v-model="endTime"
                  label="Godzina ostatniego spotkania"
                  prepend-icon="access_time"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="endTimeMenu"
                v-model="endTime"
                full-width
                @click:minute="endTimeMenu = false"
              ></v-time-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <header class="header-style">
          Ilość meczów rozgrywająch się w tym samym czasie
        </header>
        <v-layout row>
          <v-flex xs2 offset-xs5>
            <v-text-field
              v-model="simultaneousMatches"
              :rules="simultaneousMatchesRules"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <header class="header-style">
          Mecz Rewanżowy
        </header>
        <v-layout row>
          <v-flex xs2 offset-xs5>
            <v-checkbox
              style="margin-left: 43%"
              v-model="rematch"
              :disabled="rematchReadonly"
            ></v-checkbox>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4 offset-xs4>
            <v-btn color="success" class="double-button" @click="generate"
              >GENERUJ</v-btn
            >
          </v-flex>
        </v-layout>
      </v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "ScheduleGeneratorForm",
  data() {
    return {
      valid: false,
      daysOfWeek: [],
      startDate: new Date().toISOString().substr(0, 10),
      startDateMenu: false,
      endDate: new Date().toISOString().substr(0, 10),
      endDateMenu: false,
      startTime: "0:00:00",
      startTimeMenu: false,
      endTime: "0:00:00",
      endTimeMenu: false,
      simultaneousMatches: 1,
      simultaneousMatchesRules: [
        s =>
          s < 5 ||
          "W turnieju mogą się odbywać maxymalnie 4 mecze jednej godziny"
      ],
      rematch: false
    };
  },
  computed: {
    rematchReadonly: function() {
      let result = false;

      if (this.currentlyEditedTournament.isBracket === true) {
        result = true;
      }

      return result;
    },
    requestContract: function() {
      return {
        tournamentId: this.currentlyEditedTournament.tournamentId,
        daysOfWeek: this.daysOfWeek,
        startDate: this.startDate,
        endDate: this.endDate,
        startTime: this.startTime,
        endTime: this.endTime,
        simultaneousMatches: this.simultaneousMatches,
        rematch: this.rematch
      };
    },
    ...mapGetters(["apiUrl", "currentlyEditedTournament"])
  },
  methods: {
    allowedEndDates: function(val) {
      const parsedStartDate = parseInt(this.startDate.replace(/-/g, ""), 10);
      return parseInt(val.replace(/-/g, ""), 10) >= parsedStartDate;
    },
    generate: function() {
      if (this.daysOfWeek === undefined || this.daysOfWeek.length === 0) {
        this.$swal.fire({
          type: "error",
          title: "Błąd",
          confirmButtonColor: "#cb4154",
          text: "Wybierz conajmniej 1 dzień w którym mają się odbywać mecze",
          showConfirmButton: true,
          timer: 4000
        });
      } else if (
        parseInt(this.startTime.replace(/:/g, "", 10)) % 100 !== 0 ||
        parseInt(this.endTime.replace(/:/g, "", 10)) % 100 !== 0
      ) {
        this.$swal.fire({
          type: "error",
          title: "Błąd",
          confirmButtonColor: "#cb4154",
          text: "Godzina 1 i ostatniego meczu muszą być pełnymi godzinami",
          showConfirmButton: true,
          timer: 4000
        });
      } else if (
        this.currentlyEditedTournament.amountOfSignedTeams !==
          this.currentlyEditedTournament.amountOfTeams &&
        this.currentlyEditedTournament.isBracket === true
      ) {
        this.$swal.fire({
          type: "error",
          title: "Błąd",
          confirmButtonColor: "#cb4154",
          text: `Aby wygenerować harmonogram dla turnieju drabinkowego wszystkie drużyny muszą być dodane.\n Ilość: ${this.currentlyEditedTournament.amountOfTeams}`,
          showConfirmButton: true,
          timer: 4000
        });
      } else {
        if (this.$refs.form.validate()) {
          this.$swal
            .fire({
              title: "Czy jesteś pewny",
              text:
                "Wygenerowanie harmonogramu meczu skutkuje usunieciem istniejącyh meczów.\n Czy kontynuować?",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Wygeneruj"
            })
            .then(result => {
              if (result.value) {
                axios
                  .post(
                    "https://localhost:5001/api/ScheduleGenerator",
                    this.requestContract
                  )
                  .then(res => {
                    if (res.status === 200) {
                      this.$swal.fire({
                        type: "success",
                        title: "Sukces",
                        confirmButtonColor: "#7fffd4",
                        text: "Terminarz wygenerowany poprawnie",
                        showConfirmButton: true,
                        timer: 4000
                      });
                      this.$emit("scheduleGenerated");
                    } else if (res.status === 404) {
                      this.$swal.fire({
                        type: "error",
                        title: "Błąd",
                        confirmButtonColor: "#cb4154",
                        text:
                          "Z podanych danych wejściowych nie da się utworzyć żadnego terminu meczu.",
                        showConfirmButton: true,
                        timer: 4000
                      });
                    } else if (res.status === 406) {
                      this.$swal.fire({
                        type: "error",
                        title: "Błąd",
                        confirmButtonColor: "#cb4154",
                        text: "Błędny format terminów meczów.",
                        showConfirmButton: true,
                        timer: 4000
                      });
                    } else if (res.status === 409) {
                      this.$swal.fire({
                        type: "error",
                        title: "Błąd",
                        confirmButtonColor: "#cb4154",
                        text:
                          "Liczba meczów przekracza ilość możliwych terminów meczów.",
                        showConfirmButton: true,
                        timer: 4000
                      });
                    } else if (res.status === 418) {
                      this.$swal.fire({
                        type: "error",
                        title: "Błąd",
                        confirmButtonColor: "#cb4154",
                        text:
                          "Brak wymaganej liczby drużyn w turnieju. W celu wygenerowania terminarza, dodaj conajmniej 2 drużyny do turnieju.",
                        showConfirmButton: true,
                        timer: 4000
                      });
                    } else {
                      this.$swal.fire({
                        type: "error",
                        title: "Błąd",
                        confirmButtonColor: "#cb4154",
                        text:
                          "Nieznany błąd. NIe udało się wygenerować terminarza.",
                        showConfirmButton: true,
                        timer: 4000
                      });
                    }
                  })
                  .catch(err => console.log(err));
              }
            });
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.header-style {
  align-items: center;
  text-align: center;
  text-decoration: underline;
}
.double-textfield {
  margin: 0 20px;
}

.double-button {
  .double-textfield;
  width: 95%;
}
</style>
