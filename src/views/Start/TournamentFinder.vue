<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-layout>
        <v-flex xs8 offset-xs2>
          <v-text-field
            v-model="IdToFind"
            label="Id szukanego turnieju"
            required
          ></v-text-field>

          <v-flex xs6 offset-xs3>
            <ConfirmButton Message="SZUKAJ" @clicked="Find()"></ConfirmButton>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios/index";
import ConfirmButton from "@/components/ConfirmButton";

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
        .get("http://78.47.36.35:7000/api/tournament/" + this.IdToFind)
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
  },
  components: {
    ConfirmButton: ConfirmButton
  }
};
</script>

<style></style>
