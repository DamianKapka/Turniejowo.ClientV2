<template>
  <v-container>
    <v-layout row>
      <v-flex xs8 offset-xs2>
        <v-card :dark="false" class="elevation-24 main-card" Height="100%">
          <v-layout row>
            <v-flex xs4 v-for="info in navBarCardInfo" :key="info.ActiveClass">
              <NavBarCard :Message="info.LabelInfo" :LabelInfo="info.LabelInfo" :ActiveClass="info.ActiveClass" :RouterLink="info.RouterLink"></NavBarCard>
            </v-flex>
          </v-layout>
          <router-view></router-view>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import NavBarCard from "@/components/NavBarCard";

export default {
  name: "Start",
  data() {
    return {
      navBarCardInfo: [
        { LabelInfo: "ZALOGUJ", ActiveClass: "login", RouterLink: "login" },
        {
          LabelInfo: "ZAREJSTRUJ",
          ActiveClass: "register",
          RouterLink: "register"
        },
        { LabelInfo: "SZUKAJ", ActiveClass: "find", RouterLink: "find" }
      ]
    };
  },
  components: {
    NavBarCard: NavBarCard
  }
};
</script>

<style>
.v-form {
  padding: 4% 0;
}
</style>
