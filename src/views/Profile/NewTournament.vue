<template>
  <v-flex xs8 offset-xs2>
    <v-form ref="form" v-model="valid" style="padding: 5%">
      <v-text-field
        v-model="Name"
        label="Nazwa"
        :rules="NameRules"
        required
      ></v-text-field>
      <v-combobox
        label="Dyscyplina"
        v-model="Discipline"
        :items="DisciplineOptions"
      >
      </v-combobox>

      <v-menu
        ref="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="StartingDate"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="StartingDate"
            label="Data rozpoczecia turnieju"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="StartingDate" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(StartingDate)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-menu>

      <v-text-field
        v-model="AmountOfTeams"
        label="Ilość dryżun"
        :rules="AmountOfTeamsRules"
        required
      >
      </v-text-field>

      <v-text-field
        v-model="EntryFee"
        label="Wpisowe"
        :rules="EntryFeeRules"
        required
        a
      >
      </v-text-field>

      <v-text-field
        v-model="Localization"
        label="Lokazlizacja"
        :rules="LocalizationRules"
        required
      >
      </v-text-field>

      <v-layout row style="margin-top: 2%;">
        <v-flex xs4 offset-xs1>
          <v-btn block color="success" @click="submitForm()">
            Stwórz Turniej
          </v-btn>
        </v-flex>
        <v-flex xs4 offset-xs2>
          <v-btn block color="warning" @click="resetForm()">
            Reset
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-flex>
</template>

<script>
import axios from "axios";
import { GetDisciplineId } from '@/utils/utils.js'

export default {
  name: "NewTournament",
  data() {
    return {
      valid: false,
      Name: "",
      NameRules: [
        n => !!n || "Wpisz nazwe turnieju",
        n =>
          /^.{5,}$/.test(n.trim()) ||
          "Nazwa turnieju powinna zawierać conajmniej 5 znaków"
      ],
      Discipline: "Piłka Nożna",
      DisciplineOptions: ["Piłka Nożna", "Koszykówka", "Siatkówka"],
      StartingDate: new Date().toISOString().substr(0, 10),
      AmountOfTeams: "",
      AmountOfTeamsRules: [
        a => !!a || "Wprowadz ilość drużyn w turnieju",
        a =>
          /^[1-9]{1}[0-9]?$/.test(a.trim()) ||
          "Ilośc drużym musi być cyrfą wieksza od 0"
      ],
      EntryFee: "",
      EntryFeeRules: [
        e => !!e || "Wprowadz wpisowe do turnieju",
        e =>
          /^[0-9]{1}[0-9]*$/.test(e.trim()) ||
          "Wpisowe musi być cyrfą wieksza lub równa 0"
      ],
      Localization: "",
      LocalizationRules: [l => !!l || "Wprowadz lokalizacje turnieju"],

      Model: function() {
        return {
          Name: this.Name,
          DisciplineId: GetDisciplineId(this.Discipline),
          CreatorId: this.$store.getters.currentlyLoggedUserId,
          Date: this.StartingDate,
          AmountOfTeams: this.AmountOfTeams,
          EntryFee: this.EntryFee,
          Localization: this.Localization
        };
      }
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        axios
          .post(`${this.$store.getters.apiUrl}/api/tournament`, this.Model())
          .then(res => {
            if (res.status === 201) {
              alert("Turniej został założony");
              this.$router.replace({ path: "/profile/my-tournaments" });
            }
            else{
              alert("Nie udało się załóżyć turnieju.")
            }
          })

          .catch(err => console.log(err.response));
      }
    },
    resetForm() {
      this.$refs.form.reset();
    },
  }
};
</script>

<style></style>
