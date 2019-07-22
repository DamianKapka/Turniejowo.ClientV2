<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-data-table
    :items="TournamentInfo"
    class="elevation-7"
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

export default {
  name: "TournamentInfo",
  data() {
    return {
      TournamentInfo: [
        { key: "Nazwa", value: "" },
        { key: "Dyscyplina", value: "" },
        { key: "Data rozpoczecia", value: "" },
        { key: "Liczba drużyn", value: "" },
        { key: "Liczba zapisanych drużyn", value: "" },
        { key: "Wpisowe", value: "" },
        { key: "Lokalizacja", value: "" },
        { key: "Organizator", value: "" },
        { key: "Kontakt z organizatorem", value: "" }
      ]
    };
  },
  created() {
    axios
      .get(`https://localhost:5001/api/tournament/${this.$route.params.id}`)
      .then(response => {
        this.TournamentInfo[0].value = response.data["name"];
        this.TournamentInfo[1].value = this.GetDisciplineById(
          response.data["disciplineId"]
        );
        this.TournamentInfo[2].value = response.data["date"].slice(0, 10);
        this.TournamentInfo[3].value = response.data["amountOfTeams"];
        this.TournamentInfo[5].value = response.data["entryFee"];
        this.TournamentInfo[6].value = response.data["localization"];

        return axios.get(
          `https://localhost:5001/api/user/${response.data["creatorId"]}`
        );
      })
      .then(response => {
        this.TournamentInfo[7].value = response.data["fullName"];
        this.TournamentInfo[8].value = `${response.data["email"]}\r\n${
          response.data["phone"]
        }`;

        return axios.get(
          `https://localhost:5001/api/tournament/${this.$route.params.id}/teams`
        );
      })
      .then(response => {
        this.TournamentInfo[4].value = response.data.length;
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error));
  },
  methods: {
    GetDisciplineById: function(id) {
      let discipline;

      switch (id) {
        case 1:
          discipline = "Siatkówka";
          break;
        case 2:
          discipline = "Koszykówka";
          break;
        case 3:
          discipline = "Piłka Nożna";
          break;
        default:
          break;
      }

      return discipline;
    }
  }
};
</script>

<style></style>
