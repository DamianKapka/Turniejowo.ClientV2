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
                this.$emit("playerAdded");
                this.dialog = false;
                this.$swal.fire({
                  type: "success",
                  title: "Sukces",
                  confirmButtonColor: "#7fffd4",
                  text: "Gracz dodany poprawnie",
                  showConfirmButton: true,
                  timer: 4000
                });
                break;
              }
              case 404: {
                this.$swal.fire({
                  type: "error",
                  title: "Błąd",
                  confirmButtonColor: "#cb4154",
                  text: "Drużyna do której próbowano dodać gracza nie istnieje",
                  showConfirmButton: true,
                  timer: 4000
                });
                break;
              }
              case 409: {
                this.$swal.fire({
                  type: "error",
                  title: "Błąd",
                  confirmButtonColor: "#cb4154",
                  text: "Taki gracz już istnieje w tej drużynie",
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
                  text: "Błędne zapytanie",
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
                  text: "Błędne zapytanie",
                  showConfirmButton: true,
                  timer: 4000
                });
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
