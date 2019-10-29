<template>
  <v-form v-model="valid" class="form pa-2">
    <v-layout row>
      <v-flex xs5 class="pa-1">
        <v-combobox></v-combobox>
      </v-flex>
      <v-flex xs5 class="pa-1">
        <v-combobox></v-combobox>
      </v-flex>
      <v-flex xs2 class="pa-1">
        <v-text-field></v-text-field>
      </v-flex>
    </v-layout>
    <ConfirmButton message="DODAJ" class="pa-2" style="margin-left: 30%; width: 40%;"></ConfirmButton>
  </v-form>
</template>

<script>
import ConfirmButton from "./ConfirmButton";

export default {
  name: "AddPointsForm",
  data() {
    return {
      valid: true
    };
  },
  components: {
    ConfirmButton
  }
};
</script>

<style scoped>
.from {
  padding: 0;
}
</style>
