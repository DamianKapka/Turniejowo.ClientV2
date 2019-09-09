<template>
  <v-container>
    <v-layout row>
      <v-flex xs10 offset-xs1>
        <v-card :dark="false" class="elevation-24 main-card" Height="100%">
          <v-layout row>
            <v-flex xs2>
              <NavBarCard
                LabelInfo="Ogólne"
                ActiveClass="info"
                RouterLink="info"
              ></NavBarCard>
            </v-flex>
            <v-flex xs2>
              <NavBarCard
                LabelInfo="Uczestnicy"
                ActiveClass="participants"
                RouterLink="participants"
              ></NavBarCard>
            </v-flex>
            <v-flex xs2>
              <NavBarCard
                LabelInfo="Tabela"
                ActiveClass="table"
                RouterLink="table"
              ></NavBarCard>
            </v-flex>
            <v-flex xs2>
              <NavBarCard
                LabelInfo="Statystyki"
                ActiveClass="stats"
                RouterLink="stats"
              ></NavBarCard>
            </v-flex>
            <v-flex xs2>
              <NavBarCard
                LabelInfo="Mecze"
                ActiveClass="matches"
                RouterLink="matches"
              ></NavBarCard>
            </v-flex>
            <v-flex xs2>
              <NavBarCard
                LabelInfo="Cofnij"
                ActiveClass="find"
                RouterLink="find"
              ></NavBarCard>
            </v-flex>
          </v-layout>
          <router-view />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import NavBarCard from "@/components/NavBarCard";

export default {
  name: "TournamentHub",
  components: {
    NavBarCard: NavBarCard
  }
};
</script>

<style>
.gold {
  background-color: gold;
}
.silver {
  background-color: silver;
}
.bronze {
  background-color: saddlebrown;
}
</style>
