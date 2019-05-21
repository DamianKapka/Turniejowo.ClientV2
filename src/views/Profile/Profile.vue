<template>
  <v-container>
    <v-layout row>
      <v-flex xs10 offset-xs1>
        <v-card :dark="false" class="elevation-24 main-card" Height="100%">
          <v-layout row>
            <v-flex xs3>
              <v-card
                :dark="false"
                class="elevation-7 maincard-nav-card"
                v-bind:class="{ lel: currentPage === 'NewTournament' }"
                @click="reroute('new-tournament')"
                >Nowy turniej</v-card
              >
            </v-flex>
            <v-flex xs3>
              <v-card
                :dark="false"
                class="elevation-7 maincard-nav-card"
                v-bind:class="{ lel: currentPage === 'MyTournaments' }"
                @click="reroute('my-tournaments')"
                >Moje turnieje</v-card
              >
            </v-flex>
            <v-flex xs3>
              <v-card
                :dark="false"
                class="elevation-7 maincard-nav-card"
                v-bind:class="{ lel: currentPage === 'MyAccount' }"
                @click="reroute('my-account')"
                >Moje konto</v-card
              >
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
                  {{ userEmail }}
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
import axios from "axios";
import router from "@/router";

export default {
  name: "Profile",
  data: function() {
    return {
      currentPage: this.$route.name,
      userID: "",
      userEmail: "",
      LogoutButtonHovered: false
    };
  },
  created() {
    if (!localStorage.getItem("token")) {
      router.push("/start/login");
    }

    this.token = localStorage.getItem("token");
    this.userID = this.parseJwt(this.token).id;
    this.userEmail = this.parseJwt(this.token).actor;

    axios
      .get(`https://localhost:5001/api/user/${this.userID}/tournaments`)
      .then(response => {})
      .catch(error => {});
  },
  watch: {
    $route(to, from) {
      this.currentPage = to.name;
    }
  },
  methods: {
    parseJwt(token) {
      const base64Url = token.split(".")[1];
      const base64 = decodeURIComponent(
        atob(base64Url)
          .split("")
          .map(function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const result = JSON.parse(base64);
      return { id: result.unique_name, actor: result.actort };
    },
    logout() {
      this.$store.dispatch("logout");
    },
    reroute(path) {
      router.push({ path: `${path}` });
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
