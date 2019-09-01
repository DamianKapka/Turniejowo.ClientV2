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
          :items="tournamentTeams"
          :rules="selectedHomeTeamRules"
          label="Drużyna gospodarzy"
          prepend-icon="group_add"
        ></v-combobox>
        <v-combobox
          v-model="selectedGuestTeam"
          :items="tournamentTeams"
          :rules="selectedGuestTeamRules"
          label="Drużyna gości"
          prepend-icon="group_add"
        ></v-combobox>
        <ConfirmButton Message="DODAJ MECZ" @clicked="test()"></ConfirmButton>
      </v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import ConfirmButton from "./ConfirmButton";
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
      tournamentTeams: ["a", "b", "c"],
      selectedHomeTeam: null,
      selectedHomeTeamRules: [
        homeTeam => !!homeTeam || "Wybierz drużynę gospodarzy",
        homeTeam =>
          homeTeam != this.selectedGuestTeam || "Błąd! Takie same drużyny"
      ],
      selectedGuestTeam: null,
      selectedGuestTeamRules: [
        guestTeam => !!guestTeam || "Wybierz drużynę gospodarzy",
        guestTeam =>
          guestTeam != this.selectedHomeTeam || "Błąd! Takie same drużyny"
      ]
    };
  },
  computed: {
    matchModel: function() {
      return {
        HomeTeamId: this.selectedHomeTeam,
        GuestTeamId: this.selectedGuestTeam,
        HomeTeamPoints: 0,
        GuestTeamPoints: 0,
        IsFinished: false,
        MatchDateTime: `${this.matchDate} ${this.matchTime}`
      };
    }
  },
  methods: {
    test() {
      if (this.$refs.form.validate()) {
        alert("valid!");
        console.log(this.matchModel);
      }
    }
  }
};
</script>

<style scoped></style>
