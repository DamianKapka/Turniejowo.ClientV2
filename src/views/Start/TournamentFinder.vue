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
import { mapGetters } from 'vuex'

export default {
  name: "TournamentFinder",
  idToFind: "",
  data() {
    return {
      valid: false,
      IdToFind: ""
    };
  },
  computed: mapGetters(["apiUrl"]),
  methods: {
    Find() {
      axios
        .get(`${this.apiUrl}/api/tournament/` + this.IdToFind)
        .then(response => {
          switch (response.status) {
            case 200: {
              this.$router.push("/tournament/" + this.IdToFind);
              break;
            }
            default: {
              alert("Turniej o takim ID nie istnieje");
            }
          }
        })
        .catch(error => {
          alert(error);
        });
    }
  },
  components: {
    ConfirmButton: ConfirmButton
  }
};
</script>

<style></style>
