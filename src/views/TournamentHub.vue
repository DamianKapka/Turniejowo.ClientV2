<template>
    <v-container>
        <v-layout row>
            <v-flex xs8 offset-xs2>
                <v-card :dark="false" class="elevation-24 main-card" Height="100%">
                    <v-layout row>
                        <v-flex xs3>
                            <router-link :to="{path: 'info'}">
                            <v-card class="elevation-7 maincard-nav-card" v-bind:class="{'lel' : currentPage == 'info'}">Info</v-card>
                            </router-link>
                        </v-flex>
                        <v-flex xs3>
                            <router-link :to="{path: 'participants'}">
                            <v-card class="elevation-7 maincard-nav-card" v-bind:class="{'lel' : currentPage == 'participants'}">Uczestnicy</v-card>
                            </router-link>
                        </v-flex>
                        <v-flex xs3>
                            <router-link :to="{path: 'table'}">
                            <v-card class="elevation-7 maincard-nav-card" v-bind:class="{'lel' : currentPage == 'table'}">Tabela</v-card>
                            </router-link>
                        </v-flex>
                        <v-flex xs3>
                            <router-link :to="{path: 'stats'}">
                            <v-card class="elevation-7 maincard-nav-card" v-bind:class="{'lel' : currentPage == 'stats'}">Statystyki</v-card>
                            </router-link>
                        </v-flex>
                    </v-layout>
                    <router-view/>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    
</template>

<script>
export default {
    namer: "TournamentHub",
    data() {
        return{
            currentPage: this.$route.name,
        }
    },
    watch: {
        $route (to,from){
            this.currentPage = to.name; 
            console.log(to.name)               
        }
    },
}
</script>

<style>

</style>
