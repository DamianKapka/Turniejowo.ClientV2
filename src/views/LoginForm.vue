<template>    
     <v-form ref="form" v-model="valid">
          <v-container>
               <v-layout>
                    <v-flex xs8 offset-xs2>
                         <div class="LoginForm-div">
                         <v-text-field v-model="Login" :rules="LoginRules" label="Adres e-mail"/>
                         <v-text-field v-model="Password" label="Password"/>

                         <v-flex xs6 offset-xs3>
                              <div style="padding-top:5%">
                                   <v-btn block color="success" v-on:click="Authenticate()">Zaloguj</v-btn>
                              </div>
                         </v-flex>

                         </div>
                    </v-flex>
               </v-layout>
          </v-container>
     </v-form>    
</template>

<script>
export default {
     name: 'LoginForm',
     data(){
          return{
               valid:false,
               Login: '',
               LoginRules: [

               ],
               Password: '',
               Model: function(){
                    return{
                         login: this.Login,
                         password: this.Password
                    }
               }               
          }
     },
     methods:{
          Authenticate(){
               alert('authenticate');
          }
     }
}
</script>

<style>
     .LoginForm-div{
          padding: 5%;
          font-family: 'Play', sans-serif;
     }
</style>
