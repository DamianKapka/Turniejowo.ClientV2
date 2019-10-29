<template>
  <v-form v-model="valid" class="form pa-3">
    <v-layout row>
      <v-flex xs5 class="pa-1">
        <v-combobox
          v-model="chosenTeam"
          :items="matchTeams"
          placeholder="Wybierz drużyne"
          label="Drużyna"
        ></v-combobox>
      </v-flex>
      <v-flex xs5 class="pa-1">
        <v-combobox
          v-model="chosenPlayer"
          :items="chosenTeamPlayers"
          item-text="fName"
          label="Gracz"
          return-object
        ></v-combobox>
      </v-flex>
      <v-flex xs2 class="pa-1">
        <v-text-field></v-text-field>
      </v-flex>
    </v-layout>
    <ConfirmButton Message="DODAJ" class="pa-2" style="margin-left: 30%; width: 40%;"></ConfirmButton>
  </v-form>
</template>

<script>
import ConfirmButton from "./ConfirmButton";
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: "AddPointsForm",
  data() {
    return {
      valid: true,
      chosenTeam:"",
      chosenTeamPlayers:[],
      chosenPlayer:"",
      matchTeams:[this.match.homeTeamName,this.match.guestTeamName],
      homeTeamPlayers:[],
      guestTeamPlayers:[],
    };
  },
  watch:{
    chosenTeam: function (val) {
      if(val === this.match.homeTeamName){
        this.chosenTeamPlayers = this.homeTeamPlayers;
      }
      else{
        this.chosenTeamPlayers = this.guestTeamPlayers;
      }

      this.chosenPlayer = this.chosenTeamPlayers[0];
    }
  },
  computed: mapGetters(["apiUrl", "currentlyEditedTournament"]),
  mounted(){
    this.getMatchPlayers();
  },
  methods:{
    getMatchPlayers: function(){
      axios.get(`${this.apiUrl}/api/team/${this.match.homeTeamId}/players`).then(response => {
        if(response.status === 200){
          this.homeTeamPlayers = response.data;
          return axios.get(`${this.apiUrl}/api/team/${this.match.guestTeamId}/players`)
        }
        else{
          alert("Wystąpił problem z pobranie, graczy występujących w meczu");
        }
      }).then(response => {
        if(response.status === 200){
          this.guestTeamPlayers = response.data;
        }
        else{
          alert("Wystąpił problem z pobranie, graczy występujących w meczu");
        }
      }).catch(err => console.log(err));
    },
  },
  props:{
    match: Object
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
