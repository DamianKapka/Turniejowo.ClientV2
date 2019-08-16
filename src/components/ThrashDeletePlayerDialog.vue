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
        ><v-icon style="color: firebrick; font-size: 28px; margin-right: 5px"
          >warning</v-icon
        >Potwierdzenie</v-card-title
      >
      <v-card-text
        >Czy napewno chcesz usunąc gracza <strong>{{ Player.fName }} {{Player.lName}}</strong> z
        tej druzyny? Decyzja ta bedzie nieodwracalna!</v-card-text
      >
      <v-card-actions>
        <v-btn color="success" @click="confirm()"
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
      this.$emit("confirmed",this.Player.playerId);
      this.dialog = false;
    }
  }
};
</script>

<style scoped></style>
