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

      <v-combobox label="Typ" v-model="Type" :items="TypeOptions"> </v-combobox>

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
import getDisciplineInfo from "../../mixins/getDisciplineInfo";
import { mapGetters } from "vuex";
import getLoggedUserIdMixin from "../../mixins/getLoggedUserIdMixin";
import getTournamentTypeMixin from "../../mixins/getTournamentTypeMixin";

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
      Type: "Tabela",
      TypeOptions: ["Tabela", "Drabinka"],
      StartingDate: new Date().toISOString().substr(0, 10),
      AmountOfTeams: "",
      AmountOfTeamsRules: [
        a => !!a || "Wprowadz ilość drużyn w turnieju",
        a =>
          /^[1-9][0-9]?$/.test(a.trim()) ||
          "Ilośc drużym musi być cyrfą wieksza od 0",
        a => {
          if (this.Type === "Drabinka" && a !== "4" && a !== "8" && a !== "16") {
            return "Turniej w trybie drabinkowym wymaga 4,8 lub 16 drużyn"
          }
        }
      ],
      EntryFee: "",
      EntryFeeRules: [
        e => !!e || "Wprowadz wpisowe do turnieju",
        e =>
          /^[0-9][0-9]*$/.test(e.trim()) ||
          "Wpisowe musi być cyrfą wieksza lub równa 0"
      ],
      Localization: "",
      LocalizationRules: [l => !!l || "Wprowadz lokalizacje turnieju"]
    };
  },
  computed: {
    model: function() {
      return {
        Name: this.Name,
        DisciplineId: this.getDisciplineId(this.Discipline),
        isBracket: this.getTournamentBoolBasedOnName(this.Type),
        CreatorId: this.getLoggedUserId(),
        Date: this.StartingDate,
        AmountOfTeams: this.AmountOfTeams,
        EntryFee: this.EntryFee,
        Localization: this.Localization
      };
    },
    ...mapGetters(["apiUrl"])
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        axios
          .post(`${this.apiUrl}/api/tournament`, this.model)
          .then(res => {
            if (res.status === 201) {
              this.$swal.fire({
                type: "success",
                title: "Sukces",
                confirmButtonColor: "#7fffd4",
                text: "Turniej założony poprawnie",
                showConfirmButton: true,
                timer: 4000
              });
              this.$router.push({ name: "MyTournaments" });
            } else {
              this.$swal.fire({
                type: "error",
                title: "Błąd",
                confirmButtonColor: "#cb4154",
                text: "Nie udało się utworzyć turnieju",
                showConfirmButton: true,
                timer: 4000
              });
            }
          })

          .catch(err => console.log(err.response));
      }
    },
    resetForm() {
      this.$refs.form.reset();
    }
  },
  mixins: [getLoggedUserIdMixin, getDisciplineInfo, getTournamentTypeMixin]
};
</script>

<style></style>
