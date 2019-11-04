<template>
  <v-dialog v-model="dialog" max-width="320">
    <template #activator="{on}">
      <font-awesome-icon
        icon="edit"
        style="color: goldenrod"
        v-on="on"
      ></font-awesome-icon>
    </template>
    <v-card style="padding: 10%">
      <v-card-title class="headline">
        <font-awesome-icon
          icon="edit"
          style="margin-right: 5%"
        ></font-awesome-icon>
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
          /^.{1,16}$/.test(n.trim()) ||
          "Nazwa drużyny nie może być dluższa niż 16 znaków"
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
              alert("Edycja powiodłą się");
              this.$emit("edited");
            } else {
              this.teamName = this.Team.name;

              if (res.status === 404) {
                alert("Drużna nie istnieje w bazie danych");
              } else if (res.status === 409) {
                alert("Id teamu i Id drużyny nie zgadzają się");
              } else {
                alert("Nieznany błąd");
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
