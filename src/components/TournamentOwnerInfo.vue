<template>
  <v-list-tile-action style="width:100%">
    <v-layout row>
      <v-flex xs2 class="toi-flex">
        <v-list-tile-title style="font-weight:bold ;text-align: center">
          #{{ tournament.tournamentId }}
        </v-list-tile-title>
      </v-flex>
      <v-flex xs8 class="toi-flex">
        <v-list-tile-title style="font-weight:bold; text-align: center">
          {{ tournament.name }}
        </v-list-tile-title>
      </v-flex>
      <v-flex xs1 class="toi-flex"></v-flex>
      <v-flex xs1 class="toi-flex"></v-flex>
    </v-layout>
  </v-list-tile-action>
</template>

<script>
export default {
  name: "TournamentOwnerInfo",
  props: {
    tournament: Object
  },
  mounted() {}
};
</script>

<style scoped>
.toi-flex {
  border: 1px solid black;
  border-radius: 12px;
  padding: 1%;
}
.toi-flex:hover {
  background-color: #ffb984;
}
</style>
