<template>
  <v-container>
    <v-layout row>
      <v-flex xs10 offset-xs1>
        <v-card :dark="false" class="elevation-24 main-card" Height="100%">
          <v-layout row>
            <v-flex xs3>
              <v-card :dark="false" class="elevation-7 maincard-nav-card"
                >Nowy turniej</v-card
              >
            </v-flex>
            <v-flex xs3>
              <v-card :dark="false" class="elevation-7 maincard-nav-card"
                >Moje turnieje</v-card
              >
            </v-flex>
            <v-flex xs3>
              <v-card :dark="false" class="elevation-7 maincard-nav-card"
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
                  Zalogowano jako <br />
                  {{ userEmail }}
                </span>
              </v-card>
            </v-flex>
          </v-layout>
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
    this.userEmail = this.parseJwt(this.token).email;

    axios
      .get(`https://localhost:5001/api/user/${this.userID}/tournaments`)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
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
      return { id: result.unique_name, email: result.email };
    },
    logout(){
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
.logged-as-card {
  font-size: 12px;
  padding: 3%;
  background-color: aquamarine;
  overflow: hidden;
}

.logged-as-card:hover {
  vertical-align: center;
  font-size: 15px;
  padding: 6%;
  overflow: hidden;
  background-color: firebrick;
  transform: scale(1.0, 1.0)!important;
  transition: 0.4s;
}
</style>
