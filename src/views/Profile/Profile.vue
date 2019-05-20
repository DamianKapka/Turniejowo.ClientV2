<template>
  <v-container>
    <v-layout row>
      <v-flex xs8 offset-xs2>
        <v-card :dark="false" class="elevation-24 main-card" Height="100%">
          {{ userID }}
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
      userID: ""
    };
  },
  created() {
    if (!localStorage.getItem("token")) {
      router.push("/start/login");
    }

    this.token = localStorage.getItem("token");

    this.userID = this.parseJwt(this.token);

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
      return result.unique_name;
    }
  }
};
</script>

<style scoped></style>
