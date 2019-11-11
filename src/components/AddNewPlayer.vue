<template>
  <v-dialog v-model="dialog" max-width="320">
    <template #activator="{on}">
      <v-icon style="color: limegreen" v-on="on">
        person_add
      </v-icon>
    </template>
    <v-card style="padding: 10%">
      <v-card-title class="headline">
        <v-icon style="color: limegreen;margin-right: 5%" v-on="on">
          person_add
        </v-icon>
        Dodaj gracza
      </v-card-title>
      <v-form ref="form" v-model="valid">
        <v-text-field
          label="Imie i Nazwisko Gracza"
          v-model="playerFullName"
          :rules="playerFullNameRules"
          required
        ></v-text-field>
        <v-text-field label="Drużyna" v-model="Team.name" readonly>
        </v-text-field>
        <ConfirmButton Message="Dodaj" @clicked="add"></ConfirmButton>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from "axios";
import ConfirmButton from "./ConfirmButton";
import { mapGetters } from "vuex";

export default {
  Name: "AddNewPlayer",
  data() {
    return {
      dialog: false,
      valid: true,
      playerFullName: "",
      playerFullNameRules: [
        p => !!p || "Wpisz Imie i Nazwisko gracza",
        p =>
          /^\w+ \w+$/.test(p) ||
          "Wymagane jest zarówno Imie i Nazwiko, bez znaków specialnych"
      ]
    };
  },
  props: ["Team"],
  components: { ConfirmButton },
  computed: mapGetters(["apiUrl"]),
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        const playerFullNameArray = this.playerFullName.split(" ");

        const player = {
          fName: playerFullNameArray[0],
          lName: playerFullNameArray[1],
          teamId: this.Team.teamId,
          points: 0
        };

        axios
          .post(`${this.apiUrl}/api/player`, player)
          .then(res => {
            switch (res.status) {
              case 201: {
                alert("Gracz dodany prawidłowo");
                this.$emit("playerAdded");
                this.dialog = false;
                break;
              }
              case 404: {
                alert("Drużyna do której próbowano dodać gracza nie istnieje");
                break;
              }
              case 409: {
                alert("Taki gracz już istnieje w tej dużynie");
                break;
              }
              case 400: {
                alert("Błedne zapytanie");
                break;
              }
              default: {
                alert("Nieznany błąd");
                break;
              }
            }
            this.playerFullName = "";
          })
          .catch(err => console.log(err));
      }
    }
  }
};
</script>
