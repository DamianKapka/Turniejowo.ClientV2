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
      <v-text-field v-model="teamName"></v-text-field>
      <v-card-actions>
        <v-btn color="success" @click="confirm()"
          ><v-icon>thumb_up</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="cancel()"
          ><v-icon>thumb_down</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditTeamDialog",
  data() {
    return {
      valid: true,
      dialog: false,
      teamName: this.Team.name
    };
  },
  props: ["Team"],
  methods: {
    confirm() {
      this.Team.name = this.teamName;
      this.$emit("edited", this.Team);
      this.dialog = false;
    },
    cancel() {
      this.teamName = this.Team.name;
      this.dialog = false;
    }
  }
};
</script>

<style scoped></style>
