<template>
    <v-dialog v-model="dialog" max-width="500">
        <template v-slot:activator="{ on }">
            <v-icon v-on="on">
                search
            </v-icon>
        </template>
        <v-card style="padding:10%">
            <v-card-title class="headline">
                <v-layout style="text-align: center">
                    <v-flex xs4 offset-xs1>
                        {{match.homeTeamName}}
                    </v-flex>
                    <v-flex xs2>
                        {{match.homeTeamPoints}} :  {{match.guestTeamPoints}}
                    </v-flex>
                    <v-flex xs4>
                        {{match.guestTeamName}}
                    </v-flex>
                </v-layout>
            </v-card-title>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "MatchDetailsDialog",
        data(){
            return {
                dialog:false,
            }
        },
        props:{
            match:Object
        }
    }
</script>

<style scoped>

</style>