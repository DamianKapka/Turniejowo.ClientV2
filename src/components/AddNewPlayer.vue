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
        <v-text-field label="Imie i Nazwisko Gracza"> </v-text-field>
        <v-text-field label="Drużyna"> </v-text-field>
        <ConfirmButton Message="Dodaj"></ConfirmButton>
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
      valid: false
    };
  }
};
</script>
<style scoped></style>
