<template>
  <v-layout row>
    <v-flex xs8 offset-xs2>
      <v-card class="elevation-24 main-card">
        <v-layout row>
          <v-flex
            x2
            v-for="navBar in navBardCardInfo"
            :key="navBar.ActiveClass"
          >
            <NavBarCard
              :LabelInfo="navBar.LabelInfo"
              :ActiveClass="navBar.ActiveClass"
              :RouterLink="navBar.RouterLink"
            ></NavBarCard>
          </v-flex>
        </v-layout>
        <router-view />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import NavBarCard from "@/components/NavBarCard";

export default {
  name: "TournamentHub",
  data() {
    return {
      navBardCardInfo: [
        { LabelInfo: "Ogólne", ActiveClass: "info", RouterLink: "info" },
        {
          LabelInfo: "Uczestnicy",
          ActiveClass: "participants",
          RouterLink: "participants"
        },
        { LabelInfo: "Tabela", ActiveClass: "table", RouterLink: "table" },
        { LabelInfo: "Statystyki", ActiveClass: "stats", RouterLink: "stats" },
        { LabelInfo: "Mecze", ActiveClass: "matches", RouterLink: "matches" },
        { LabelInfo: "Cofnij", ActiveClass: "find", RouterLink: "find" }
      ]
    };
  },
  components: {
    NavBarCard: NavBarCard
  }
};
</script>

<style lang="less">
.bold {
  font-weight: bold !important;
}

.gold {
  .bold;
  background-color: gold;
}
.silver {
  .bold;
  background-color: silver;
}
.bronze {
  .bold;
  background-color: saddlebrown;
}
.table {
  padding: 2%;
}
</style>
