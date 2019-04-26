<template>
    <v-container>
        <v-layout>            
            <v-flex xs8 offset-xs2>  
                <div class="TournamentFinder-div">              
                <v-text-field v-model="IdToFind" label="Id szukanego turnieju" required/>

                    <v-flex xs6 offset-xs3>
                        <div style="padding-top:5%">
                            <v-btn block color="success" v-on:click="Find()">Szukaj</v-btn>
                        </div>
                    </v-flex>
                </div>
            </v-flex>           
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: "TournamentFinder",
    idToFind: '',
    data(){
        return{

        }
    },
    methods:{
        Find(){
            alert('Find');
        }
    }
}
</script>

<style>
    .TournamentFinder-div{
            padding: 4%;
            font-family: 'Play', sans-serif;
        }
</style>
