
<template>
    <v-flex xs8 offset-xs2 style="padding:5%">
        <v-data-table
            :headers="TableHeaders"
            :items="matches"
            hide-actions
            class="elevation-3"           
            >
            <template v-slot:items="item">
                <tr>
                    <td class="text-xs-center">{{item.item.teamOne}}</td>
                    <td class="text-xs-center">{{item.item.teamTwo}}</td>
                    <td class="text-xs-center">{{item.item.teamOneScore}} : {{item.item.teamTwoScore}} </td>
                </tr>
            </template>            
        </v-data-table>
            <v-card>
                <v-card-text>
                    Dodaj wynik
                </v-card-text>
            <v-form ref="form" v-model="valid"> 
                <v-layout row>
                    <v-flex xs3 offset-xs1>
                        <v-combobox
                            label="Drużyna A"
                        >
                        </v-combobox>
                    </v-flex>
                    <v-flex xs3 offset-xs1>
                        <v-combobox
                            label="Drużyna B"
                        >
                        </v-combobox>
                    </v-flex>
                    <v-flex xs2 offset-xs1>
                        <v-text-field
                            label="Wynik">
                            
                        </v-text-field>
                    </v-flex>
                    <v-flex xs1>
                        <v-btn
                            class="block" 
                        >                            
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-card>
    </v-flex>
</template>

<script>

export default {
    name: "EditProgress",
    data(){
        return{
            TableHeaders:[
                { text: "Druzyna A", value: "A", sortable: false, align: "center" },
                { text: "Druzyna B", value: "B", sortable: false, align: "center" },
                { text: "Wynik", value: "W", sortable: false, align: "center" },
            ],
            matches: [
                {
                    teamOne : "6A",
                    teamTwo : "6B",
                    teamOneScore : "3",
                    teamTwoScore : "2"
                },
                {
                    teamOne : "6A",
                    teamTwo : "6C",
                    teamOneScore : "3",
                    teamTwoScore : "0"
                }
            ]
        }
    },
    methods: {
        AddTeam(team){
            matches.push(team);
        }
    }
}
</script>

<style>

</style>
