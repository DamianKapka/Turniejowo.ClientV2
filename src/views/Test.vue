<template>
  <v-card>
    <v-card-title class="headline">TEst</v-card-title>
    <v-card-text v-if="visible">
      <v-list-item v-for="item in baws" v-bind:key="item.name">
        <v-card v-text="item.name"></v-card>
      </v-list-item>
    </v-card-text>
    <v-card-actions>
      <ConfirmButton Message="Test" @clicked="changeVisibility"></ConfirmButton>
    </v-card-actions>
  </v-card>
</template>

<script>
import ConfirmButton from "../components/ConfirmButton";
export default {
  name: "Test",
  components: { ConfirmButton },
  data() {
    return {
      Test: "Damian Kapka",
      visible: true,
      baws: [{ name: "baws" }, { name: "jaws" }, { name: "maws" }]
    };
  },
  methods: {
    changeVisibility() {
      this.visible = !this.visible;
    }
  }
};
</script>

<style scoped></style>
