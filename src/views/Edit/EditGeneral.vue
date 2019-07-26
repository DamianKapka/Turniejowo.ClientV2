<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-flex xs8 offset-xs2>
    <v-form ref="form" v-model="valid" style="padding: 5%">
      <v-text-field
        v-model="Name"
        label="Nazwa"
        value="xd"
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
          <v-btn block color="success" @click="editTourney()">
            Edytuj
          </v-btn>
        </v-flex>
        <v-flex xs4 offset-xs2>
          <v-btn block color="warning" @click="getTournamentInfo()">
            Przywróc
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-flex>
</template>

<script>
import axios from "axios";
import { GetDisciplineById } from "../../utils/utils";
import { GetDisciplineId } from "../../utils/utils";

export default {
  name: "EditGeneral",
  data() {
    return {
      valid: false,
      Name: "",
      NameRules: [
        n => !!n || "Wpisz nazwe turnieju",
        n =>
          /^.{5,}$/.test(n) ||
          "Nazwa turnieju powinna zawierać conajmniej 5 znaków"
      ],
      Discipline: "",
      DisciplineOptions: ["Piłka Nożna", "Koszykówka", "Siatkówka"],
      StartingDate: new Date().toISOString().substr(0, 10),
      AmountOfTeams: "",
      AmountOfTeamsRules: [
        a => !!a || "Wprowadz ilość drużyn w turnieju",
        a =>
          /^[1-9]{1}[0-9]?$/.test(a) ||
          "Ilośc drużym musi być cyrfą wieksza od 0"
      ],
      EntryFee: "",
      EntryFeeRules: [
        e => !!e || "Wprowadz wpisowe do turnieju",
        e => /^[1-9]{1}[0-9]*$/.test(e) || "Wpisowe musi być cyrfą wieksza od 0"
      ],
      Localization: "",
      LocalizationRules: [l => !!l || "Wprowadz lokalizacje turnieju"],
      TournamentId: "",
      CreatorId: "",
      Model: function() {
        return {
          tournamentId: this.TournamentId,
          name: this.Name,
          disciplineId: GetDisciplineId(this.Discipline),
          creatorId: this.CreatorId,
          date: this.StartingDate,
          amountOfTeams: this.AmountOfTeams,
          entryFee: this.EntryFee,
          localization: this.Localization
        };
      }
    };
  },
  created() {
    this.getTournamentInfo();
  },
  methods: {
    editTourney() {
      axios
        .put(
          `${this.$store.getters.apiUrl}/api/tournament/${this.TournamentId}`,
          this.Model()
        )
        .then(res => {
          if (res.status === 202) {
            alert("Edycja turnieju przebiegla poprawnie");
            this.$emit("tournamentEdited", this.Model());
          } else {
            alert("Błąd podczas próby edycji turnieju");
          }
        })
        .catch();
    },
    getTournamentInfo() {
      const tourney = this.$store.getters.currentlyEditedTournament;
      this.TournamentId = tourney.tournamentId;
      this.CreatorId = tourney.creatorId;
      this.Name = tourney.name;
      this.Discipline = GetDisciplineById(tourney.disciplineId);
      this.StartingDate = tourney.date.slice(0, 10);
      this.AmountOfTeams = tourney.amountOfTeams;
      this.EntryFee = tourney.entryFee;
      this.Localization = tourney.localization;
    }
  }
};
</script>

<style></style>
