<template>
  <v-dialog v-model="dialog" max-width="320">
    <template #activator="{on}">
      <font-awesome-icon
        icon="user-plus"
        style="color: limegreen"
        v-on="on"
      ></font-awesome-icon>
    </template>
    <v-card style="padding: 10%">
      <v-card-title class="headline">
        <font-awesome-icon
          icon="user-plus"
          style="margin-right: 5%"
        ></font-awesome-icon>
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
        <ConfirmButton Message="Dodaj" @clicked="addPlayer"></ConfirmButton>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import ConfirmButton from "./ConfirmButton";

export default {
  components: { ConfirmButton },
  Name: "AddNewPlayer",
  data() {
    return {
      dialog: false,
      valid: false,
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
  methods: {
    addPlayer() {
      if (this.$refs.form.validate()) {
        const playerFullNameArray = this.playerFullName.split(" ");

        const player = {
          fName: playerFullNameArray[0],
          lName: playerFullNameArray[1],
          teamId: this.Team.teamId,
          points: 0
        };

        this.$emit('playerAdded',player);
        this.playerFullName = "";
        this.dialog = false;
      }
    }
  }
};
</script>
<style scoped></style>
