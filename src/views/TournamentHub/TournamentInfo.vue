<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-data-table
    :items="tournamentIntoDetails"
    class="elevation-7 table"
    :hide-actions="true"
  >
    <template v-slot:items="item">
      <td class="text-xs-left">{{ item.item.key }}</td>
      <td class="text-xs-right">{{ item.item.value }}</td>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "TournamentInfo",
  data() {
    return {
      tournamentInfo: Object
    };
  },
  computed: {
    tournamentIntoDetails: function() {
      const details = [
        { key: "Nazwa", value: this.tournamentInfo.name },
        { key: "Dyscyplina", value: this.tournamentInfo.discipline },
        {
          key: "Data rozpoczecia",
          value: this.tournamentInfo.date
        },
        { key: "Liczba drużyn", value: this.tournamentInfo.amountOfTeams },
        {
          key: "Liczba zapisanych drużyn",
          value: this.tournamentInfo.amountOfSignedTeams
        },
        { key: "Wpisowe", value: this.tournamentInfo.entryFee },
        { key: "Lokalizacja", value: this.tournamentInfo.localization },
        { key: "Organizator", value: this.tournamentInfo.creatorName },
        {
          key: "Kontakt z organizatorem",
          value: this.tournamentInfo.creatorContact
        }
      ];

      return details;
    },
    ...mapGetters(["apiUrl"])
  },
  created() {
    axios
      .get(`${this.apiUrl}/api/tournament/${this.$route.params.id}`)
      .then(res => {
        switch (res.status) {
          case 200: {
            this.tournamentInfo = res.data;
            break;
          }
          case 404: {
            alert("Turniej nie istnieje");
            break;
          }
          default: {
            alert("Błąd podczas próby odczytania informacji o turnieju");
          }
        }
      });
  }
};
</script>
