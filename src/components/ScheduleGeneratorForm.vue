<template>
  <v-expansion-panel style="border: 2px solid #ffb984; margin-top: 1%">
    <v-expansion-panel-content>
      <template #header>
        <div class="text-xs-center" style="font-weight: bold">
          WYGENERUJ TERMINARZ
        </div>
      </template>
      <v-form style="padding: 4%">
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
          <v-switch v-model="daysOfWeek" label="Niedziela" value="7"></v-switch>
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
            <v-text-field v-model="simultaneousMatches"></v-text-field>
          </v-flex>
        </v-layout>
        <header class="header-style">
          Mecz Rewanżowy
        </header>
        <v-layout row>
          <v-flex xs2 offset-xs5>
            <v-checkbox style="margin-left: 43%" v-model="rematch"></v-checkbox>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs2 offset-xs4>
            <v-btn color="success" class="double-button">GENERUJ</v-btn>
          </v-flex>
          <v-flex xs2>
            <v-btn color="reset" class="double-button">RESET</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
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
      rematch: false
    };
  },
  computed: {
    requestContract: function() {
      return {
        daysOfWeek: this.daysOfWeek,
        startDate: this.startDate,
        endDate: this.endDate,
        startTime: this.startTime,
        endTime: this.endTime,
        simultaneousMatches: this.simultaneousMatches,
        rematch: this.rematch
      };
    }
  },
  methods: {
    allowedEndDates: function(val) {
      const parsedStartDate = parseInt(this.startDate.replace(/-/g, ""), 10);
      return parseInt(val.replace(/-/g, ""), 10) >= parsedStartDate;
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
