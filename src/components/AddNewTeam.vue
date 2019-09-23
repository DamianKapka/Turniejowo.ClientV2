<template>
  <v-container>
    <v-expansion-panel style="border:3px solid #ffb984; font-weight: bold">
      <v-expansion-panel-content>
        <template #header>
          <div class="text-xs-center">
            Dodaj nową drużynę
          </div>
        </template>
        <v-form ref="form" v-model="valid" class="form">
          <v-layout row>
            <v-flex xs8 offset-xs2>
              <v-text-field
                label="Nazwa nowej drużyny"
                v-model="TName"
                :rules="NameRules"
              ></v-text-field>
              <ConfirmButton Message="Dodaj" @clicked="add"></ConfirmButton>
            </v-flex>
          </v-layout>
        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script>
import axios from "axios";
import ConfirmButton from "@/components/ConfirmButton";
import { mapGetters } from "vuex";
export default {
  Name: "AddNewTeam",
  data() {
    return {
      valid: false,
      TName: "",
      NameRules: [n => !!n || "Wpisz nazwe druzyny"]
    };
  },
  computed: {
    model: function() {
      return {
        Name: this.TName || "",
        TournamentId: this.$route.params.id,
        Matches: 0,
        Wins: 0,
        Draws: 0,
        Loses: 0,
        Points: 0
      };
    },
    ...mapGetters(["apiUrl"])
  },
  methods: {
    add() {
      if (this.$refs.form.validate()) {
        axios
          .post(`${this.apiUrl}/api/team`, this.model)
          .then(res => {
            switch (res.status) {
              case 201: {
                alert("Druzyna dodana");
                this.TName = "";
                this.$emit("TeamAdded");
                break;
              }
              case 404: {
                alert("Turniej do którego dużyna ma być dodana nie istnieje");
                break;
              }
              case 409: {
                alert("Taka drużyna w tym turnieju już istnieje");
                break;
              }
              default: {
                alert("Nieznany błąd podczas próby dodania druyżyny");
                break;
              }
            }
          })
          .catch(() => {
            alert("Nie udalo sie dodać drużyny");
          });
      }
    }
  },
  components: {
    ConfirmButton
  }
};
</script>
