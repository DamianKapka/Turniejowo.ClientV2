<template>
  <v-container>
    <v-layout row>
      <v-card :dark="false" class="elevation-24 main-card" Height="100%">
        <LandingPageCard></LandingPageCard>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import LandingPageCard from "@/components/LandingPageCard";

export default {
  name: "MainCard",
  components: {
    LandingPageCard: LandingPageCard
  }
};
</script>

<style>
.main-card {
  border-radius: 12px;
  margin: 5% 0;
  opacity: 0.9;
}
a {
  text-decoration: none;
}
</style>
