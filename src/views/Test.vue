<template>
  <v-card>
    <v-card-title class="headline">TEst</v-card-title>
    <v-card-text>Test</v-card-text>
    <v-card-actions>
      <ConfirmButton Message="Test"></ConfirmButton>
    </v-card-actions>
  </v-card>
</template>

<script>
    import ConfirmButton from "../components/ConfirmButton";
    export default {
        name: "Test",
        components: {ConfirmButton}
    }
</script>

<style scoped>

</style>