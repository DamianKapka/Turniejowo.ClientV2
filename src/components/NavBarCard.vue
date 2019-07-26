<template>
  <router-link :to="{ name: this.RouterLink }" replace>
    <v-card
      class="elevation-7 maincard-nav-card"
      v-bind:class="{ lel: currentPage === this.ActiveClass }"
    >
      {{ LabelInfo }}
    </v-card>
  </router-link>
</template>

<script>
export default {
  name: "NavBarCard",
  data() {
    return {
      currentPage: this.$route.name
    };
  },
  watch: {
    $route(to, from) {
      this.currentPage = to.name;
    }
  },
  props: ["LabelInfo", "ActiveClass", "RouterLink"]
};
</script>

<style scoped></style>
