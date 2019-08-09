<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container>
    <v-data-table :headers="TableHeaders" :items="Teams" :hide-actions="true">
      <template v-slot:items="team">
        <td class="text-xs-center">{{ team.index + 1 }}</td>
        <td>
          {{ team.item.teamName }}
        </td>
        <td style="padding: 0">
          <v-expansion-panel>
            <v-expansion-panel-content>
              <template #header>
                <div class="text-xs-center">
                  Zawodnicy
                </div>
              </template>
              <v-list>
                <v-list-tile
                  v-for="(item, index) in team.item.players"
                  :key="item.PlayerId"
                >
                  <v-list-tile-content>
                    {{ index + 1 }}. {{ item.fName }} {{ item.lName }}
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </td>
        <td>
          <v-layout row>
            <v-flex xs4 class="toi-icon toi-add">
              <font-awesome-icon icon="user-plus"></font-awesome-icon>
            </v-flex>
            <v-flex xs4 class="toi-icon toi-edit">
              <font-awesome-icon icon="edit"></font-awesome-icon>
            </v-flex>
            <v-flex xs4 class="toi-icon">
              <ThrashDeleteDialog
                :teamName="team.item.teamName"
                @confirmed="deleteTeam(team.item.teamId)"
              ></ThrashDeleteDialog>
            </v-flex>
          </v-layout>
        </td>
      </template>
    </v-data-table>
    <v-divider></v-divider>
    <v-layout row>
      <v-flex xs8 offset-xs2>
        <AddNewTeam @TeamAdded="getParticipants()"></AddNewTeam>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import AddNewTeam from "@/components/AddNewTeam";
import AddNewPlayer from "@/components/AddNewPlayer";
import ThrashDeleteDialog from "../../components/ThrashDeleteDialog";

export default {
  name: "EditParticipants",
  data() {
    return {
      TableHeaders: [
        {
          text: "Nr",
          value: "Number",
          sortable: true,
          align: "center"
        },
        { text: "Team", value: "Team", sortable: true, align: "left" },
        { text: "Players", value: "Players", sortable: true, align: "left" },
        { text: "Actions", value: "Actions", sortable: true, align: "left" }
      ],
      Teams: []
    };
  },
  created() {
    this.getParticipants();
  },

  components: {
    AddNewTeam,
    AddNewPlayer,
    ThrashDeleteDialog
  },
  methods: {
    getParticipants() {
      const id = this.$route.params.id;

      axios
        .get(
          `${
            this.$store.getters.apiUrl
          }/api/tournament/${id}/players?groupedbyteam=true`
        )
        .then(response => {
          this.Teams = [];

          response.data.forEach(element => {
            this.Teams.push({
              teamName: element.team.name,
              teamId: element.team.teamId,
              players: element.players
            });
          });
        })
        .catch();
    },
    deleteTeam(id) {
      axios
        .delete(`${this.$store.getters.apiUrl}/api/team/${id}`)
        .then(res => {
          switch (res.status) {
            case 202: {
              alert("Dryżyna poprawnie usunięta");
              this.getParticipants();
              break;
            }
            case 404: {
              alert("Drużyna o takim ID nie istnieje");
              break;
            }
            default:
              alert("Nieznany błąd przy usuwaniu");
              break;
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
.toi-icon {
  text-align: center;
}

.toi-add {
  color: limegreen;
}

.toi-edit {
  color: goldenrod;
}

.v-divider {
  margin-bottom: 2%;
}
</style>
