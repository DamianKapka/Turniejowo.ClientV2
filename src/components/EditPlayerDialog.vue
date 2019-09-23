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
    </v-card>
  </v-dialog>
</template>

<script>
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
  methods: {
    confirm() {
      const playerNameArray = this.playerName.split(" ");

      this.Player.fName = playerNameArray[0];
      this.Player.lName = playerNameArray[1];
      this.$emit("edited", this.Player);
      this.dialog = false;
    },
    cancel() {
      this.playerName = `${this.Player.fName} ${this.Player.lName}`;
      this.dialog = false;
    }
  }
};
</script>

<style scoped></style>
