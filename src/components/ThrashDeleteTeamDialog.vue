<template>
  <v-dialog v-model="dialog" max-width="290">
    <template #activator="{on}">
      <font-awesome-icon
        icon="trash-alt"
        style="color: firebrick"
        v-on="on"
      ></font-awesome-icon>
    </template>
    <v-card>
      <v-card-title class="headline"
        ><v-icon class="confirm-icon">warning</v-icon
        >Potwierdzenie</v-card-title
      >
      <v-card-text
        >Czy napewno chcesz usunąc drużynę <strong>{{ Team.name }}</strong> z
        tego turnieju? Decyzja ta bedzie nieodwracalna!</v-card-text
      >
      <v-card-actions>
        <v-btn color="success" @click="confirm"
          ><v-icon>thumb_up</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="dialog = false"
          ><v-icon>thumb_down</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "ThrashDeleteDialog",
  data() {
    return {
      dialog: false
    };
  },
  props: ["Team"],
  computed: mapGetters(["apiUrl"]),
  methods: {
    confirm() {
      axios
        .delete(`${this.apiUrl}/api/team/${this.Team.teamId}`)
        .then(res => {
          switch (res.status) {
            case 202: {
              alert("Dryżyna poprawnie usunięta");
              this.$emit("confirmed");
              this.dialog = false;
              break;
            }
            case 404: {
              alert("Drużyna o takim ID nie istnieje");
              break;
            }
            default:
              alert("Nieznany błąd przy usuwaniu");
              break;
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.confirm-icon {
  color: firebrick;
  font-size: 28px;
  margin-right: 5px;
}
</style>
