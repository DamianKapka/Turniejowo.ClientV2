<template>
  <v-dialog v-model="dialog" max-width="290">
    <template #activator="{on}">
      <v-icon style="color: firebrick" v-on="on">delete_forever</v-icon>
    </template>
    <v-card>
      <v-card-title class="headline"
        ><v-icon class="confirm-icon">warning</v-icon
        >Potwierdzenie</v-card-title
      >
      <v-card-text
        >Czy napewno chcesz usunąc gracza
        <strong>{{ Player.fName }} {{ Player.lName }}</strong> z tej druzyny?
        Decyzja ta bedzie nieodwracalna!</v-card-text
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
  props: ["Player"],
  methods: {
    confirm() {
      axios
        .delete(`${this.apiUrl}/api/player/${this.Player.playerId}`)
        .then(res => {
          switch (res.status) {
            case 202: {
              this.$emit("deleted");
              this.$swal.fire({
                type: "success",
                title: "Sukces",
                confirmButtonColor: "#7fffd4",
                text: "Gracz usunięty",
                showConfirmButton: true,
                timer: 4000
              });
              break;
            }
            case 404: {
              this.$swal.fire({
                type: "error",
                title: "Błąd",
                confirmButtonColor: "#cb4154",
                text: "Gracz nie istnieje",
                showConfirmButton: true,
                timer: 4000
              });
              break;
            }
            default: {
              this.$swal.fire({
                type: "error",
                title: "Błąd",
                confirmButtonColor: "#cb4154",
                text: "Nieznany błąd",
                showConfirmButton: true,
                timer: 4000
              });
              break;
            }
          }
        })
        .catch(err => console.log(err));
      this.dialog = false;
    }
  },
  computed: mapGetters(["apiUrl"])
};
</script>
<style scoped>
.confirm-icon {
  color: firebrick;
  font-size: 28px;
  margin-right: 5px;
}
</style>
