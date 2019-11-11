<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container>
    <v-data-table :headers="TableHeaders" :items="Teams" :hide-actions="true">
      <template v-slot:items="team">
        <td class="text-xs-center">{{ team.index + 1 }}</td>
        <td class="text-xs-center">
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
                    <v-layout row class="expansion-panel-layout">
                      <v-flex xs8>
                        {{ index + 1 }}. {{ item.fName }} {{ item.lName }}
                      </v-flex>
                      <v-flex xs2>
                        <EditPlayerDialog
                          :Player="item"
                          @edited="getParticipants"
                        ></EditPlayerDialog>
                      </v-flex>
                      <v-flex xs2>
                        <ThrashDeletePlayerDialog
                          :Player="item"
                          @deleted="getParticipants"
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
                @playerAdded="getParticipants"
              ></AddNewPlayer>
            </v-flex>
            <v-flex xs4 class="toi-icon toi-edit">
              <EditTeamDialog
                :Team="team.item.team"
                @edited="getParticipants"
              ></EditTeamDialog>
            </v-flex>
            <v-flex xs4 class="toi-icon">
              <ThrashDeleteTeamDialog
                :Team="team.item.team"
                @confirmed="getParticipants"
              ></ThrashDeleteTeamDialog>
            </v-flex>
          </v-layout>
        </td>
      </template>
    </v-data-table>
    <v-divider></v-divider>
    <v-layout row>
      <v-flex xs8 offset-xs2>
        <AddNewTeam @TeamAdded="getParticipants"></AddNewTeam>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import AddNewTeam from "../../components/AddNewTeam";
import AddNewPlayer from "../../components/AddNewPlayer";
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
        { text: "Team", value: "Team", sortable: false, align: "center" },
        { text: "Players", value: "Players", sortable: false, align: "center" },
        { text: "Actions", value: "Actions", sortable: false, align: "center" }
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
        .get(`${this.apiUrl}/api/tournament/${id}/players?groupedbyteam=true`)
        .then(response => {
          this.Teams = response.data;
        })
        .catch(err => console.log(err));
    },
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
.expansion-panel-layout {
  width: 100%;
  align-content: center;
  align-items: center;
  text-align: center;
}
</style>
