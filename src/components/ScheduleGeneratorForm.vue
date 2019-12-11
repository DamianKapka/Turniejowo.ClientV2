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
            <v-text-field class="double-textfield"></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-text-field class="double-textfield"></v-text-field>
          </v-flex>
        </v-layout>
        <header class="header-style">
          Godziny rozgrywanych spotkań
        </header>
        <v-layout row>
          <v-flex xs3 offset-xs3>
            <v-text-field class="double-textfield"></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-text-field class="double-textfield"></v-text-field>
          </v-flex>
        </v-layout>
        <header class="header-style">
          Ilość meczów rozgrywająch się w tym samym czasie
        </header>
        <v-layout row>
          <v-flex xs2 offset-xs5>
            <v-text-field></v-text-field>
          </v-flex>
        </v-layout>
        <header class="header-style">
          Mecz Rewanżowy
        </header>
        <v-layout row>
          <v-flex xs2 offset-xs5>
            <v-checkbox style="margin-left: 43%"></v-checkbox>
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
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      simultaneousMatches: Number,
      rematch: Boolean
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
