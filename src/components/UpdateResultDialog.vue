<template>
  <v-dialog v-if="isFinished" v-model="dialog" max-width="320">
    <template #activator="{on}">
      <font-awesome-icon
        icon="edit"
        style="color: goldenrod"
        v-on="on"
      ></font-awesome-icon>
    </template>
  </v-dialog>
  <v-dialog v-else v-model="dialog" max-width="320">
    <template #activator="{on}">
      <font-awesome-icon
        icon="calendar-check"
        style="color: limegreen"
        v-on="on"
      ></font-awesome-icon>
    </template>
  </v-dialog>
</template>
<script>
export default {
  name: "UpdateResultDialog",
  props: ["isFinished"],
  data() {
    return {
      dialog: false
    };
  },
  created() {}
};
</script>

<style scoped></style>
