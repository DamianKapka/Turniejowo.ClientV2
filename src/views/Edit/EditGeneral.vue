<template>

</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    tournament: function() {
      return this.$store.getters.currentlyEditedTournament;
    }
  }
};
</script>

<style></style>
