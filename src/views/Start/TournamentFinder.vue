<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-layout>
        <v-flex xs8 offset-xs2>
          <div class="start-div">
            <v-text-field
              v-model="IdToFind"
              label="Id szukanego turnieju"
              required
            />

            <v-flex xs6 offset-xs3>
              <div class="start-buttons-div">
                <v-btn block color="success" v-on:click="Find()">Szukaj</v-btn>
              </div>
            </v-flex>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios/index";

export default {
  name: "TournamentFinder",
  idToFind: "",
  data() {
    return {
      valid: false,
      IdToFind: ""
    };
  },
  methods: {
    Find() {
      axios
        .get("https://localhost:5001/api/tournament/" + this.IdToFind)
        .then(response => {
          this.$router.push("/tournament/" + this.IdToFind);
        })
        .catch(error => {
          if (error.response.status == 404) {
            alert("Turniej o takim ID nie istnieje");
          } else {
            alert(error.response.data);
          }
        });
    }
  }
};
</script>

<style></style>
