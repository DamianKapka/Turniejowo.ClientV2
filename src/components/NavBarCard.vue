<template>
  <router-link :to="{ name: this.RouterLink }" replace>
    <v-card
      class="elevation-7 nav-bar-card"
      :class="{ active: currentPage === this.ActiveClass }"
    >
      {{ LabelInfo }}
    </v-card>
  </router-link>
</template>

<script>
export default {
  name: "NavBarCard",
  props: ["LabelInfo", "ActiveClass", "RouterLink"],
  computed: {
    currentPage: function() {
      return this.$route.name;
    }
  }
};
</script>

<style scoped>
.nav-bar-card {
  text-align: center;
  padding: 5%;
  font-size: 18px;
  font-weight: bold;
  border: 2px solid wheat;
}

.nav-bar-card:hover {
  background-color: #ff9933;
  transform: scale(1.2, 1.2);
  z-index: 999;
}

.active {
  border: 3px solid #ff9933 !important;
  padding: 5% !important;
  background-color: #ffb984 !important;
}
</style>