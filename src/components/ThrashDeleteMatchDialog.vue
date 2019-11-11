<template>
  <v-dialog v-model="dialog" max-width="320">
    <template v-slot:activator="{ on }">
      <v-icon style="color: firebrick" v-on="on" size="30"
        >delete_forever</v-icon
      >
    </template>
    <v-card>
      <v-card-title class="headline"
        ><v-icon class="confirm-icon">warning</v-icon
        >Potwierdzenie</v-card-title
      >
      <v-card-text
        >Czy napewno chcesz usunąc mecz z tego turnieju? Decyzja ta bedzie
        nieodwracalna!</v-card-text
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
  name: "ThrashDeleteMatchDialog",
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    confirm() {
      axios
        .delete(`${this.apiUrl}/api/match/${this.matchId}`)
        .then(res => {
          switch (res.status) {
            case 202: {
              alert("Mecz usunięty");
              this.$emit('deleted');
              break;
            }
            case 404: {
              alert("Mecz nie istnieje");
              break;
            }
            default: {
              alert("Nieznany błąd podczas próby usunięcia meczu");
              break;
            }
          }
        })
        .catch(err => console.log(err));
    }
  },
  computed: mapGetters(["apiUrl"]),
  props: ["matchId"]
};
</script>

<style scoped>
.confirm-icon {
  color: firebrick;
  font-size: 28px;
  margin-right: 5px;
}
</style>
