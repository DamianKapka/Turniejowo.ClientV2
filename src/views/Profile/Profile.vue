<template>
  <v-container>
    <v-layout row>
      <v-flex xs10 offset-xs1>
        <v-card :dark="false" class="elevation-24 main-card" Height="100%">
          <v-layout row>
            <v-flex xs3>
              <NavBarCard
                LabelInfo="Nowy Turniej"
                ActiveClass="NewTournament"
                RouterLink="new-tournament"
              ></NavBarCard>
            </v-flex>
            <v-flex xs3>
              <NavBarCard
                LabelInfo="Moje Turnieje"
                ActiveClass="MyTournaments"
                RouterLink="my-tournaments"
              ></NavBarCard>
            </v-flex>
            <v-flex xs3>
              <NavBarCard
                LabelInfo="Moje konto"
                ActiveClass="MyAccount"
                RouterLink="my-account"
              ></NavBarCard>
            </v-flex>
            <v-flex xs3>
              <v-card
                :dark="false"
                class="elevation-7 maincard-nav-card logged-as-card"
                @mouseover="LogoutButtonHovered = true"
                @mouseleave="LogoutButtonHovered = false"
                @click="logout()"
              >
                <span v-if="LogoutButtonHovered">
                  Wyloguj
                </span>
                <span v-else>
                  {{ userFullName }}
                </span>
              </v-card>
            </v-flex>
          </v-layout>
          <router-view />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from "@/router";
import NavBarCard from "../../components/NavBarCard";
import { parseJwt } from "@/utils/utils.js";

export default {
  name: "Profile",
  components: {
    NavBarCard: NavBarCard
  },
  data() {
    return {
      userID: "",
      userFullName: "",
      LogoutButtonHovered: false
    };
  },
  created() {
    if (!localStorage.getItem("token")) {
      router.push("/start/login");
    }
  },
  mounted() {
    const token = localStorage.getItem("token");
    const parsedToken = parseJwt(token);
    this.userID = parsedToken.id;
    this.userFullName = parsedToken.actor;
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
.logged-as-card {
  background-color: aquamarine;
}

.logged-as-card:hover {
  background-color: firebrick;
}
</style>
