<template>
     <v-form ref="form" v-model="valid">
          <v-container>
               <v-layout>
                    <v-flex xs8 offset-xs2>
                         <div class="start-div">
                         <v-text-field v-model="FName" :rules="FNameRules" label="Imię" required/>
                         <v-text-field v-model="LName" :rules="LNameRules" label="Nazwisko" required/>
                         <v-text-field v-model="Password" :rules="PasswordRules" label="Hasło" required/>
                         <v-text-field v-model="PasswordRepeat" :rules="PasswordRepeatRules" label="Powtórz hasło" required/>
                         <v-text-field v-model="Mail" :rules="MailRules" label="Adres e-mail" required/>
                         <v-text-field v-model="Phone" :rules="PhoneRules" label="Nr telefonu"/>

                              <div>
                              <v-layout row>                              
                                   <v-flex xs1></v-flex>
                                   <v-flex xs4><v-btn block color="success" v-on:click="submit()">Stwórz Konto</v-btn></v-flex>
                                   <v-flex xs2></v-flex>
                                   <v-flex xs4><v-btn block color="warning" v-on:click="reset()">Reset</v-btn></v-flex>
                                   <v-flex xs1></v-flex>
                              </v-layout>
                              </div>

                         </div>
                    </v-flex>
               </v-layout>
          </v-container>
     </v-form>
</template>

<script>
import axios from 'axios';

export default {
     name: 'RegisterForm',

     data() {
          return{
          valid: false,
          FName: '',
          FNameRules:[
               f => !!f || "Wprowadz swoje imię",
               f => /^[a-zA-Z]{3,}$/.test(f) || "Imie powinno zawierac conajmniej 3 znak bez spacji, znaków specjalnych ani liczb"
          ],
          LName: '',
          LNameRules:[
               l => !!l || "Wprowadz swoje nazwisko",
               l => /^[a-zA-Z]{3,}$/.test(l) || "Nazwisko powinno zawierac conajmniej 3 znak bez spacji, znaków specjalnych ani liczb"
          ],
          Password: '',
          PasswordRules: [
               p => !!p || "Wprowadź hasło",
               p => /^.*(?=.{4,32})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(p) || "Hasło musi zawierać duże i małe litery, cyfry oraz znaki specjalne"
          ],
          PasswordRepeat: '',
          PasswordRepeatRules: [
               r => !!r || "Powtórz hasło",
               r => r == this.Password || "Hasła nie są takie same"
          ],
          Mail: '',
          MailRules: [
               m => !!m || "Wprowadź adres e-mail",
               m => /^.+\@\w+\.\w+$/.test(m) || "Format adresu email niepoprawny"
          ],
          Phone: '',
          PhoneRules:[
               ph => /^\d{3}\-\d{3}\-\d{3}$/.test(ph) || "Wpisz numer telefonu w formacie 123-123-123"
          ],
          FullName: function(){
               return this.FName + " " + this.LName
          },
          Model: function(){
               return{
               Login: this.Mail,
               Email: this.Mail,
               Password: this.Password,
               FullName: this.FullName(),
               Phone: this.Phone
               }
          },
          }
     },
     watch: {

     },
     methods: {
          reset(){
               this.$refs.form.reset();
          },
          submit(){
               if(this.$refs.form.validate()){
                    axios.post("https://localhost:5001/api/user",
                    this.Model()
                    )
                    .then(response => {
                         alert('Konto założone poprawnie!');
                         this.$router.replace('login');                        
                    })
                    .catch(error => {
                         if(error.response.status == 409){
                              alert('Podany adres e-mail istnieje w bazie danych');
                         }
                         else{
                              alert(error.response.data)
                         }
                    })                   
               }
          }
     },
}
</script>

<style>

</style>
