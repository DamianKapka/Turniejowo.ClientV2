<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-data-table
    :items="tournamentInfoDetails"
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
import { mapGetters } from "vuex";
import getTournamentTypeMixin from "../../mixins/getTournamentTypeMixin";

export default {
  name: "TournamentInfo",
  data() {
    return {
      tournamentInfo: Object
    };
  },
  computed: {
    tournamentInfoDetails: function() {
      const details = [
        { key: "Nazwa", value: this.currentlyViewedTournament.name },
        { key: "Dyscyplina", value: this.currentlyViewedTournament.discipline },
        {
          key: "Typ",
          value: this.getTournamentTypeBasedOnBool(
            this.currentlyViewedTournament.isBracket
          )
        },
        {
          key: "Data rozpoczecia",
          value: this.currentlyViewedTournament.date.slice(0, 10)
        },
        {
          key: "Liczba drużyn",
          value: this.currentlyViewedTournament.amountOfTeams
        },
        {
          key: "Liczba zapisanych drużyn",
          value: this.currentlyViewedTournament.amountOfSignedTeams
        },
        { key: "Wpisowe", value: this.currentlyViewedTournament.entryFee },
        {
          key: "Lokalizacja",
          value: this.currentlyViewedTournament.localization
        },
        {
          key: "Organizator",
          value: this.currentlyViewedTournament.creatorName
        },
        {
          key: "Kontakt z organizatorem",
          value: this.currentlyViewedTournament.creatorContact
        }
      ];

      return details;
    },
    ...mapGetters(["apiUrl", "currentlyViewedTournament"])
  },
  mixins: [getTournamentTypeMixin]
};
</script>
