<template>
    <v-expansion-panel expand>
        <v-layout row>
            <v-flex xs6 offset-xs3 style="padding: 5% 0">
                <v-expansion-panel-content v-for="team in Teams" :key="team.teamName">
                    <template v-slot:header>
                        <v-card class="header-card elevation-0">{{team.teamName}}</v-card>
                    </template>
                        <v-card v-for="player in team.players" :key="player.value" class="text-xs-center elevation-0" style="padding:2%;">
                                    {{player.fName}} {{player.lName}}
                        </v-card>
                    <AddNewPlayer></AddNewPlayer>
                </v-expansion-panel-content>

                <AddNewTeam @TeamAdded="RefreshParticipantsList()"> </AddNewTeam>
            </v-flex>
        </v-layout>
    </v-expansion-panel>
</template>

<script>
import axios from 'axios';
import AddNewTeam from '@/components/AddNewTeam'
import AddNewPlayer from '@/components/AddNewPlayer'

export default {
    name: "EditParticipants",
    data(){
        return{
            Teams: []
        }
    },
    created(){


        this.GetParticipants();
    },
    
      components:{
        'AddNewTeam' : AddNewTeam,
        'AddNewPlayer' : AddNewPlayer
    },
    methods:{
        GetParticipants(){

            const id = this.$route.params.id;
            
            axios.get(`https://localhost:5001/api/tournament/${id}/players?groupedbyteam=true`)
        .then(
            res => {
                let playersTemp = [];

                Object.keys(res.data).forEach(function eachKey(key) {
                playersTemp.push({ teamName: key, players: res.data[key] });
            });

            this.Teams = playersTemp;
            console.log(this.Teams);
            }
        )
        .catch();
        },

        RefreshParticipantsList(){
            this.GetParticipants();
        }
    }
  }
</script>

<style>
 .header-card{
     font-size:22px;
     font-weight: bold;
     padding: 2% 2% 2% 5%;
 }
</style>
