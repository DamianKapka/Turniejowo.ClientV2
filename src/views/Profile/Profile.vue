<template>
  <v-layout row>
    <v-flex xs8 offset-xs2>
      <v-card class="elevation-24 main-card">
        <v-layout row>
          <v-flex xs3 v-for="info in navBardCardsInfo" :key="info.ActiveClass">
            <NavBarCard
              :LabelInfo="info.LabelInfo"
              :ActiveClass="info.ActiveClass"
              :RouterLink="info.RouterLink"
            ></NavBarCard>
          </v-flex>
          <v-flex xs3>
            <v-card
              class="elevation-7 logged-as-card"
              @mouseover="LogoutButtonHovered = true"
              @mouseleave="LogoutButtonHovered = false"
              @click="logout"
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
</template>

<script>
import router from "@/router";
import NavBarCard from "../../components/NavBarCard";
import parseJwtMixin from "../../mixins/parseJwtMixin";

export default {
  name: "Profile",
  components: {
    NavBarCard
  },
  data() {
    return {
      userFullName: "",
      LogoutButtonHovered: false,
      navBardCardsInfo: [
        {
          LabelInfo: "Nowy Turniej",
          ActiveClass: "NewTournament",
          RouterLink: "NewTournament"
        },
        {
          LabelInfo: "Moje Turnieje",
          ActiveClass: "MyTournaments",
          RouterLink: "MyTournaments"
        },
        {
          LabelInfo: "Moje konto",
          ActiveClass: "MyAccount",
          RouterLink: "MyAccount"
        }
      ]
    };
  },
  created() {
    if (!localStorage.getItem("token")) {
      router.push({ name: "login" });
    }
  },
  mounted() {
    const token = localStorage.getItem("token");
    const parsedToken = this.parseJwt(token);
    this.userFullName = parsedToken.actor;
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  },
  mixins: [parseJwtMixin]
};
</script>

<style scoped lang="less">
@borderWidth: 3px;
@borderType: solid;

.logged-as-card {
  background-color: aquamarine;
  text-align: center;
  padding: 5%;
  font-size: 18px;
  font-weight: bold;
  border: @borderWidth @borderType mediumaquamarine;
}

.logged-as-card:hover {
  background-color: firebrick;
  border: @borderWidth @borderType darkred;
}
</style>
