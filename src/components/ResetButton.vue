<template>
  <v-btn block color="warning" v-on:click="$emit('clicked')"
    >{{ Message }}
  </v-btn>
</template>

<script>
export default {
  name: "ResetButton",
  props: ["Message"]
};
</script>
