<template>
  <v-btn block color="success" @click="$emit('clicked')">{{ Message }}</v-btn>
</template>

<script>
export default {
  name: "ConfirmButton",
  props: ["Message"]
};
</script>
