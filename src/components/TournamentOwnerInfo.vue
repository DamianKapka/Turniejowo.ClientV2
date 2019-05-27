<template>
    <v-list-tile-content>
      <v-layout row>
        <v-flex xs2>
        #{{tournament.tournamentId}} 
        </v-flex>
        <v-flex xs10>
        {{tournament.name}}
        </v-flex>
      </v-layout>
    </v-list-tile-content>
</template>

<script>
export default {
  name: "TournamentOwnerInfo",
  props: {
    tournament: Object
  },
  mounted() {
  },
}
</script>

<style scoped>
 .to-flex{
   border: 1px solid black;
   border-radius: 12px;
   padding: 1%;
 }
</style>
