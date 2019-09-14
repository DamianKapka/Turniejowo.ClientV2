<template>
  <v-form ref="form" v-model="valid">
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-text-field
          v-model="IdToFind"
          :rules="IdToFindRules"
          label="Id szukanego turnieju"
          required
        ></v-text-field>
        <v-flex xs6 offset-xs3>
          <ConfirmButton Message="SZUKAJ" @clicked="Find"></ConfirmButton>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import axios from "axios/index";
import ConfirmButton from "@/components/ConfirmButton";
import { mapGetters } from "vuex";

export default {
  name: "TournamentFinder",
  data() {
    return {
      valid: false,
      IdToFind: "",
      IdToFindRules: [
        id => !!id || "Wpisz Id",
        id => /^\d+$/.test(id) || "Id musi być liczbą"
      ]
    };
  },
  computed: mapGetters(["apiUrl"]),
  methods: {
    Find() {
      if (this.$refs.form.validate()) {
        axios
          .get(`${this.apiUrl}/api/tournament/` + this.IdToFind)
          .then(response => {
            switch (response.status) {
              case 200: {
                this.$router.push({
                  name: "TournamentById",
                  params: { id: this.IdToFind }
                });
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
    }
  },
  components: {
    ConfirmButton: ConfirmButton
  }
};
</script>
