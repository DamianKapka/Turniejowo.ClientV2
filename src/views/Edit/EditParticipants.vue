<template>
    <v-expansion-panel expand>
        <v-layout row>
            <v-flex xs6 offset-xs3 style="padding: 5% 0">
                <v-expansion-panel-content v-for="team in Teams" :key="team.teamName">
                    <template v-slot:header>
                        <div>{{team.teamName}}</div>
                    </template>
                    <v-card v-for="player in team.players" :key="player">
                        <v-card-text>
                            <span>{{player.fName}} {{player.lName}}</span>
                        </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-flex>
        </v-layout>
    </v-expansion-panel>
</template>

<script>
import axios from 'axios';

export default {
    name: "EditParticipants",
    data(){
        return{
            Teams: []
        }
    },
    created(){
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
    }
}
</script>

<style>

</style>
