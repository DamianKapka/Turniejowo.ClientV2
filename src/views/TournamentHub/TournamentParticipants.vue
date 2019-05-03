<template>
    <v-data-table :headers="TableHeaders" :items="Test" :hide-actions="true" class="elevation-7">
        <template v-slot:items="item">
            <td class="text-xs-center">{{item.index+1}}</td>
            <td class="text-xs-center">{{item.item.teamName}}</td>
            <td class="text-xs-center">
                <v-expansion-panel>
                    <v-expansion-panel-content>
                        <template v-slot:header>
                            <div class="text-xs-center">
                                Wyświetl zawodników
                            </div>
                        </template>
                        <v-list>
                            <v-list-tile v-for="item in item.item.players" :key="item">
                                <v-list-tile-content>
                                    {{item}}
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </td>
        </template>
    </v-data-table>
</template>

<script>
import axios from 'axios'

export default {
    name:"TournamentParticipants",
    data() {
        return {
            Response: '',
            TableHeaders:[
                {text:"Nr",value:"number",sortable:false,align:"center"},
                {text:"Drużyna",value:"team",sortable:false,align:"center"},
                {text:"Zawodnicy",value:"players",sortable:false,align:"center"}
            ],
            Test: [
                {
                    teamName: "6A", 
                    players:[
                    "Damian Kapka",
                    "Mateusz Szkopiak",
                    "Karol Ociepa",
                    "Karol Majchrzak"
                    ]
                },
                {
                    teamName: "6B",
                    players:[
                    "Mateusz Kruś",
                    "Mikołaj Tomczyk",
                    "Damian Siupka"
                    ]
                },
                {
                    teamName: "6C",
                    players:[
                    "Waldemar Sarnecki",
                    "Karol Sikora",
                    ]
                }
            ]
        }
    },
    methods: {
        
    },
    created() {
        axios.get(`https://localhost:5001/api/tournament/${this.$route.params.id}/players`)
        .then(response => this.Response = response.data)
        .catch(error => console.log(error))
        
    },
}
</script>

<style>
    .v-list__tile__content {
        font-size: 12px;
        text-align: -webkit-center;
    }
</style>
