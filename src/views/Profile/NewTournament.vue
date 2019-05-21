<template>
  <v-flex xs8 offset-xs2>
    <v-form ref="form" v-model="valid" style="padding: 5%">
      <v-text-field
        v-model="name"
        label="Nazwa turnieju"
        required
      ></v-text-field>
    </v-form>
  </v-flex>
</template>

<script>
export default {
  name: "NewTournament",
  data() {
    return {
      valid: false,
      name: ""
    };
  }
};
</script>

<style></style>
