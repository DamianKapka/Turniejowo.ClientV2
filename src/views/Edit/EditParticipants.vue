<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container>
    <v-data-table :headers="TableHeaders" :items="Teams" :hide-actions="true">
      <template v-slot:items="team">
        <td class="text-xs-center">{{ team.index + 1 }}</td>
        <td>
          {{ team.item.team.name }}
        </td>
        <td style="padding: 0; min-width: 200px">
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
                    <v-layout
                      row
                      style="width: 100%; align-content: center;align-items: center; text-align: center"
                    >
                      <v-flex xs8>
                        {{ index + 1 }}. {{ item.fName }} {{ item.lName }}
                      </v-flex>
                      <v-flex xs2>
                        <EditPlayerDialog
                          :Player="item"
                          @edited="editPlayer"
                        ></EditPlayerDialog>
                      </v-flex>
                      <v-flex xs2>
                        <ThrashDeletePlayerDialog
                          :Player="item"
                          @confirmed="deletePlayer"
                        ></ThrashDeletePlayerDialog>
                      </v-flex>
                    </v-layout>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </td>
        <td>
          <v-layout row>
            <v-flex xs4 class="toi-icon toi-add">
              <AddNewPlayer
                :Team="team.item.team"
                @playerAdded="addPlayer"
              ></AddNewPlayer>
            </v-flex>
            <v-flex xs4 class="toi-icon toi-edit">
              <EditTeamDialog
                :Team="team.item.team"
                @edited="editTeam"
              ></EditTeamDialog>
            </v-flex>
            <v-flex xs4 class="toi-icon">
              <ThrashDeleteTeamDialog
                :teamName="team.item.team.name"
                @confirmed="deleteTeam(team.item.team.teamId)"
              ></ThrashDeleteTeamDialog>
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
import ThrashDeleteTeamDialog from "../../components/ThrashDeleteTeamDialog";
import ThrashDeletePlayerDialog from "../../components/ThrashDeletePlayerDialog";
import EditTeamDialog from "../../components/EditTeamDialog";
import EditPlayerDialog from "../../components/EditPlayerDialog";
import { mapGetters } from "vuex";

export default {
  name: "EditParticipants",
  data() {
    return {
      TableHeaders: [
        {
          text: "Nr",
          value: "Number",
          sortable: false,
          align: "center"
        },
        { text: "Team", value: "Team", sortable: false, align: "left" },
        { text: "Players", value: "Players", sortable: false, align: "left" },
        { text: "Actions", value: "Actions", sortable: false, align: "left" }
      ],
      Teams: []
    };
  },
  created() {
    this.getParticipants();
  },
  computed: mapGetters(["apiUrl"]),
  components: {
    EditTeamDialog,
    AddNewTeam,
    AddNewPlayer,
    ThrashDeleteTeamDialog,
    ThrashDeletePlayerDialog,
    EditPlayerDialog
  },
  methods: {
    getParticipants() {
      const id = this.$route.params.id;

      axios
        .get(
          `${
            this.apiUrl
          }/api/tournament/${id}/players?groupedbyteam=true`
        )
        .then(response => {
          this.Teams = [];

          response.data.forEach(element => {
            this.Teams.push(element);
          });
        })
        .catch();
    },
    deleteTeam(id) {
      axios
        .delete(`${this.apiUrl}/api/team/${id}`)
        .then(res => {
          switch (res.status) {
            case 202: {
              alert("Dryżyna poprawnie usunięta");

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
          this.getParticipants();
        })
        .catch(err => console.log(err));
    },
    editTeam(team) {
      axios
        .put(`${this.apiUrl}/api/team/${team.teamId}`, team)
        .then(res => {
          switch (res.status) {
            case 202: {
              alert("Edycja powiodłą się");
              break;
            }
            case 404: {
              alert("Drużna nie istnieje w bazie danych");
              break;
            }
            case 409: {
              alert("Id teamu i Id drużyny nie zgadzają się");
              break;
            }
            default: {
              alert("Nieznany błąd");
              break;
            }
          }
          return this.getParticipants();
        })
        .catch(err => console.log(err));
    },
    editPlayer(player) {
      axios
        .put(
          `${this.apiUrl}/api/player/${player.playerId}`,
          player
        )
        .then(res => {
          switch (res.status) {
            case 202: {
              alert("Gracz zedytowany");
              break;
            }
            case 404: {
              alert("Gracz nieodnaleziony");
              break;
            }
            case 409: {
              alert("Id gracza nie pasuje z Id gracza do usuniecia");
              break;
            }
            case 400: {
              alert("Nieprawidłowe zapytanie");
              break;
            }
            default: {
              alert("Nieznany błąd");
              break;
            }
          }
          this.getParticipants();
        })
        .catch(err => console.log(err));
    },
    addPlayer(player) {
      axios
        .post(`${this.apiUrl}/api/player`, player)
        .then(res => {
          switch (res.status) {
            case 201: {
              alert("Gracz dodany prawidłowo");
              break;
            }
            case 404: {
              alert("Drużyna do której próbowano dodać gracza nie istnieje");
              break;
            }
            case 409: {
              alert("Taki gracz już istnieje w tej dużynie");
              break;
            }
            case 400: {
              alert("Błedne zapytanie");
              break;
            }
            default: {
              alert("Nieznany błąd");
              break;
            }
          }
          this.getParticipants();
        })
        .catch(err => console.log(err));
    },
    deletePlayer(playerId) {
      axios
        .delete(`${this.apiUrl}/api/player/${playerId}`)
        .then(res => {
          switch (res.status) {
            case 202: {
              alert("Gracz usuniety");
              break;
            }
            case 404: {
              alert("Gracz nie istnieje");
              break;
            }
            default: {
              alert("Nieznany bląd.");
              break;
            }
          }
          this.getParticipants();
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
.v-divider {
  margin-bottom: 2%;
}
</style>
