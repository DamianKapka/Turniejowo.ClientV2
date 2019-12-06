<template>
  <v-dialog v-model="dialog" max-width="320">
    <template #activator="{on}">
      <v-icon style="color: goldenrod" v-on="on">
        edit
      </v-icon>
    </template>
    <v-card style="padding: 10%">
      <v-card-title class="headline">
        <v-icon style="color: goldenrod;margin-right: 5%">
          edit
        </v-icon>
        Edycja drużyny
      </v-card-title>
      <v-form v-model="valid" ref="form">
        <v-text-field v-model="teamName" :rules="teamNameRules"></v-text-field>
        <v-card-actions>
          <v-btn color="success" @click="confirm"
            ><v-icon>thumb_up</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancel"
            ><v-icon>thumb_down</v-icon>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "EditTeamDialog",
  data() {
    return {
      valid: true,
      dialog: false,
      teamName: this.Team.name,
      teamNameRules: [
        n => !!n || "Wpisz nazwe drużyny",
        n =>
          n.length < 20 ||
          "Nazwa drużyny może składać się z maksymalnie 20 znaków"
      ]
    };
  },
  props: ["Team"],
  computed: mapGetters(["apiUrl"]),
  methods: {
    confirm() {
      if (this.$refs.form.validate()) {
        this.Team.name = this.teamName;

        axios
          .put(`${this.apiUrl}/api/team/${this.Team.teamId}`, this.Team)
          .then(res => {
            if (res.status === 202) {
              this.$swal.fire({
                type: "success",
                title: "Sukces",
                confirmButtonColor: "#7fffd4",
                text: "Edycja drużyny powiodła się",
                showConfirmButton: true,
                timer: 4000
              });
              this.$emit("edited");
              this.dialog = false;
            } else {
              this.teamName = this.Team.name;
              if (res.status === 404) {
                this.$swal.fire({
                  type: "error",
                  title: "Błąd",
                  confirmButtonColor: "#cb4154",
                  text: "Drużyna nie istnieje w bazie danych",
                  showConfirmButton: true,
                  timer: 4000
                });
              } else {
                this.$swal.fire({
                  type: "error",
                  title: "Błąd",
                  confirmButtonColor: "#cb4154",
                  text: "Nieznany błąd",
                  showConfirmButton: true,
                  timer: 4000
                });
              }
            }
          })
          .catch(err => console.log(err));
      }
    },
    cancel() {
      this.teamName = this.Team.name;
      this.dialog = false;
    }
  }
};
</script>

<style scoped></style>
