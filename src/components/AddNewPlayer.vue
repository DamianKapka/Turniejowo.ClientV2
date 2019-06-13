<template>
<v-form>
    <v-card class="elevation-5" style="padding:4%" >
    <v-card-title class="card-title">
        Dodaj nowego zawodnika
    </v-card-title>
        <v-layout row>
            <v-flex xs-4 offset-xs2>
            <v-text-field
            v-model="Name"
            :rules="NameRules"
            value=""
            >
            </v-text-field>
            </v-flex>
            <v-flex xs1>
                <v-btn color="success" class="block" style="width:50%;" @click="AddPlayer()">
                    <v-icon>add_circle</v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs2>
            </v-flex>
        </v-layout>
    </v-card>
</v-form>

</template>

<script>
import axios from 'axios';
import {capitalize} from '@/utils/utils.js'

export default {
    name:"AddNewPlayer",
    data(){
        return{
            Name : "",
            NameRules:[
                n => !!n || "Wprowadz nazwe gracza",
                n => /^\w+\ \w+$/.test(n) || "Podaj imie i nazwisko gracza, ktore sklada sie z liter rozdzielonych spacja"
            ],
            Model: function(){
              
                return{
                    FName  : capitalize(this.Name.split(' ')[0]),
                    LName  : capitalize(this.Name.split(' ')[1]),
                    TeamId : this.teamId, 
                    Points : 0,
                }
            }
        }
    },
    methods:{
        AddPlayer(){
            axios.post(`https://localhost:5001/api/player`,this.Model())
            .then(res => {
                if(res.status == 201){
                    alert("Gracz dodany prawidłowo");
                    this.$emit("PlayerAdded")
                }
            })
            .catch(err => console.log(err.response));
        }
    },
    props:[
        'teamId',
    ]
}
</script>

<style>
    .card-title{
        padding-left:17%; 
        font-size:14px; 
        font-weight:bold;
        text-decoration: underline;
    }
</style>
