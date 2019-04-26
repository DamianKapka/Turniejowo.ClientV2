<template>   
    <v-container>
        <v-layout row>
            <v-flex xs2/>
            <v-flex xs8>      
                <v-card :dark="false" class="elevation-24 start-card" Height="100%" >
                    <v-layout row>

                    <v-flex xs4>
                        <router-link :to="{path: 'login'}" replace>
                        <v-card class="elevation-7 start-inner-card" v-bind:class="{'i-beat-for-you' : currentPage == 'login'}">LOGIN</v-card>
                        </router-link>
                    </v-flex>

                    <v-flex xs4>
                        <router-link :to="{path: 'register'}" replace>
                        <v-card class="elevation-7 start-inner-card" v-bind:class="{'i-beat-for-you' : currentPage == 'register'}">REGISTER</v-card>
                        </router-link>
                    </v-flex>

                    <v-flex xs4>
                        <router-link :to="{path: 'find'}" replace>
                        <v-card class="elevation-7 start-inner-card" v-bind:class="{'i-beat-for-you' : currentPage == 'find'}">FIND</v-card>
                        </router-link>
                    </v-flex>

                    </v-layout>
                    <router-view></router-view>
                </v-card>
                </v-flex>
            <v-flex xs2/> 
        </v-layout>
    </v-container>
</template>

<script>

export default {
    name:'Start',

    data(){
        return{
            currentPage : this.$route.name,            
        }
    },

    watch:{
        $route (to,from){
            this.currentPage = to.name;                
        }
    },
    methods:{
 
    },
    components:{
    }
}
</script>

<style >
    a{
        text-decoration: none;
    }

    .start-card{
        border-radius: 4px;
        margin: 7% 0;
        opacity: 0.9;
    }

    .i-beat-for-you{
        border: 3px solid #ff9933!important;
        padding: 5%!important;
        background-color: #ffb984!important;
    }

    .start-inner-card{
        text-align: center;        
        padding: 5%;
        font-family: 'Play', sans-serif;
        font-size: 18px; 
        font-weight: bold;
        border: 2px solid wheat;
    }

    .start-inner-card:hover{
        background-color: #ff9933;    
        transform: scale(1.2,1.2);   
        z-index: 999;
    }

    .start-div{
        padding: 5%;
        font-family: 'Play', sans-serif;
    }

    .start-buttons-div{
        padding-top: 5%;
    }

    .start-div v-btn{
        font-weight: bold;
    }
</style>
