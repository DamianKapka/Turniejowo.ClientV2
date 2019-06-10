<template>
<v-form>
    <v-card class="elevation-5" style="padding:4%" >
    <v-card-title class="card-title">
        Dodaj nowego zawodnika
    </v-card-title>
        <v-layout row>
            <v-flex xs-4 offset-xs2>
            <v-text-field
            v-bind="Name"
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
export default {
    name:"AddNewPlayer",
    data(){
        return{
            Name : "",
            NameRules:[
                n => !!n || "Wprowadz nazwe gracza"
            ]
        }
    },
    methods:{
        AddPlayer(){

        }
    }
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
