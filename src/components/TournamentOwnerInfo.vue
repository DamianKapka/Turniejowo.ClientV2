<template>
  <v-card>
    {{ tournament.name }}
  </v-card>
</template>

<script>
export default {
  name: "TournamentOwnerInfo",
  props: {
    tournament: Object
  }
};
</script>

<style scoped></style>
