<template>
<v-form ref="form" v-model="valid">
    <v-layout row>
        <v-flex xs8 offset-xs1>
            <v-text-field
                label="Nazwa nowej drużyny"
                v-model="TName"
                :rules="NameRules"
                >        
            </v-text-field>
        </v-flex>
        <v-flex xs1>
            <v-btn color="success" @click="Add()">
                <v-icon>add_circle</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
</v-form>
</template>

<script>
import axios from 'axios';

export default {
    Name : "AddNewTeam",
    data(){
        return{ 
            valid: false,
            TName:"",
            NameRules:[
                n => !!n || "Wpisz nazwe druzyny"
            ],
            Model:  function(){
                return{
                    Name: this.TName || "",
                    TournamentId: this.$route.params.id,
                    Matches: 0,
                    Wins: 0,
                    Loses: 0,
                }
            }
        }
    },
    methods:{
        Add(){
            if(this.$refs.form.validate()){
                axios.post(`https://localhost:5001/api/team`,this.Model())
                .then(res => {
                    if(res.status == 201){
                        alert("Druzyna dodana");
                        this.TName = "";
                        this.$emit("TeamAdded");
                    }
                })
                .catch(err => {
                    alert("Nie udalo sie dodać drużyny")
                })
            }
        }
    }
}
</script>

<style>

</style>
