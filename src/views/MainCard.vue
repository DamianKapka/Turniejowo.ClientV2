<template>   
    <v-container>
        <v-layout row>       
            <v-card :dark="false" class="elevation-24 main-card" Height="100%" >
                <router-view></router-view>
            </v-card>
        </v-layout>
    </v-container>
</template>

<script>

export default {
    name:'MainCard',
    components:{
    }
}
</script>

<style>
    .main-card{
        border-radius: 12px;
        margin: 5% 0;
        opacity: 0.9;
    }
    a{
        text-decoration: none;
    }
</style>
