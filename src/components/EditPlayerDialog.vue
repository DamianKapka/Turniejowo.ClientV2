<template>
  <v-dialog v-model="dialog" max-width="320">
    <template #activator="{on}">
      <font-awesome-icon
        icon="edit"
        style="color: goldenrod"
        v-on="on"
      ></font-awesome-icon>
    </template>
    <v-card style="padding: 10%">
      <v-card-title class="headline">
        <font-awesome-icon
          icon="edit"
          style="margin-right: 5%"
        ></font-awesome-icon>
        Edycja gracza
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-text-field
          v-model="playerName"
          :rules="playerNameRules"
        ></v-text-field>
        <v-card-actions>
          <v-btn color="success" @click="confirm"
            ><v-icon>thumb_up</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancel"
            ><v-icon>thumb_down</v-icon>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "EditPlayerDialog",
  data() {
    return {
      valid: true,
      dialog: false,
      playerName: `${this.Player.fName} ${this.Player.lName}`,
      playerNameRules: [
        p => !!p || "Wpisz Imie i Nazwisko gracza",
        p =>
          /^\w+ \w+$/.test(p) ||
          "Wymagane jest zarówno Imie i Nazwiko, bez znaków specialnych"
      ]
    };
  },
  props: ["Player"],
  computed: mapGetters(["apiUrl"]),
  methods: {
    confirm() {
      if (this.$refs.form.validate()) {
        const playerNameArray = this.playerName.split(" ");

        this.Player.fName = playerNameArray[0];
        this.Player.lName = playerNameArray[1];

        axios
          .put(`${this.apiUrl}/api/player/${this.Player.playerId}`, this.Player)
          .then(res => {
            switch (res.status) {
              case 202: {
                alert("Gracz zedytowany");
                this.$emit("edited");
                break;
              }
              case 404: {
                alert("Gracz nieodnaleziony");
                break;
              }
              case 409: {
                alert("Id gracza nie pasuje z Id gracza do usuniecia");
                break;
              }
              case 400: {
                alert("Nieprawidłowe zapytanie");
                break;
              }
              default: {
                alert("Nieznany błąd");
                break;
              }
            }
          })
          .catch(err => console.log(err));

        this.dialog = false;
      }
    },
    cancel() {
      this.playerName = `${this.Player.fName} ${this.Player.lName}`;
      this.dialog = false;
    }
  }
};
</script>

<style scoped></style>
