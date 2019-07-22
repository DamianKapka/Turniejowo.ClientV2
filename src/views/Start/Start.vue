<template>
  <v-container>
    <v-layout row>
      <v-flex xs8 offset-xs2>
        <v-card :dark="false" class="elevation-24 main-card" Height="100%">
          <v-layout row>
            <v-flex xs4>
              <NavBarCard
                LabelInfo="ZALOGUJ"
                ActiveClass="login"
                RouterLink="login"
              ></NavBarCard>
            </v-flex>

            <v-flex xs4>
              <NavBarCard
                LabelInfo="ZAREJSTRUJ"
                ActiveClass="register"
                RouterLink="register"
              >
              </NavBarCard>
            </v-flex>

            <v-flex xs4>
              <NavBarCard
                LabelInfo="SZUKAJ"
                ActiveClass="find"
                RouterLink="find"
              >
              </NavBarCard>
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
  components: {
    NavBarCard: NavBarCard
  }
};
</script>

<style>
</style>
