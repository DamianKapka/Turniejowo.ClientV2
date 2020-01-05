<template>
  <v-layout row>
    <v-flex xs8 offset-xs2>
      <v-card class="elevation-18 main-card">
        <v-layout row>
          <v-flex xs4 v-for="info in navBarCardInfo" :key="info.ActiveClass">
            <NavBarCard
              :LabelInfo="info.LabelInfo"
              :ActiveClass="info.ActiveClass"
              :RouterLink="info.RouterLink"
            ></NavBarCard>
          </v-flex>
        </v-layout>
        <router-view></router-view>
      </v-card>
    </v-flex>
  </v-layout>
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
          LabelInfo: "ZAREJESTRUJ",
          ActiveClass: "register",
          RouterLink: "register"
        },
        { LabelInfo: "SZUKAJ", ActiveClass: "find", RouterLink: "find" }
      ]
    };
  },
  components: {
    NavBarCard
  }
};
</script>

<style>
.v-form {
  padding: 4% 0;
}
</style>
