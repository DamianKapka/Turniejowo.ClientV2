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
        <router-view v-if="dataFetched" />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import NavBarCard from "../../components/NavBarCard";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import navBarCardsFactory from "../../utils/navBarCardsFactoryMixin";
import axios from "axios";

export default {
  name: "TournamentHub",
  data() {
    return {
      isBracketTournament: Boolean,
      dataFetched: false
    };
  },
  components: {
    NavBarCard
  },
  async created() {
    await axios
      .get(`${this.apiUrl}/api/tournament/${this.$route.params.id}`)
      .then(res => {
        switch (res.status) {
          case 200: {
            this.isBracketTournament = res.data.isBracket;
            this.mutateCurrentlyViewedTournament(res.data);
            this.dataFetched = true;
            break;
          }
          case 404: {
            this.$swal.fire({
              type: "error",
              title: "Błąd",
              confirmButtonColor: "#cb4154",
              text: "Turniej nie istnieje",
              showConfirmButton: true,
              timer: 4000
            });
            break;
          }
          default: {
            this.$swal.fire({
              type: "error",
              title: "Błąd",
              confirmButtonColor: "#cb4154",
              text: "Błąd podczas próby odczytania informacji o turnieju",
              showConfirmButton: true,
              timer: 4000
            });
          }
        }
      });
  },
  methods: mapMutations(["mutateCurrentlyViewedTournament"]),
  computed: {
    navBardCardInfo: function() {
      return this.createNavBarCards(this.isBracketTournament);
    },
    ...mapGetters(["apiUrl"])
  },
  mixins: [navBarCardsFactory]
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
