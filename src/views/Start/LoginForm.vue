<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-layout>
        <v-flex xs8 offset-xs2>
          <v-text-field
            v-model="Login"
            :rules="LoginRules"
            label="Adres e-mail"
          ></v-text-field>
          <v-text-field v-model="Password" label="Password"></v-text-field>
          <v-flex xs6 offset-xs3>
            <ConfirmButton Message="ZALOGUJ" @clicked="Authenticate()">
            </ConfirmButton>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios/index";
import ConfirmButton from "@/components/ConfirmButton";

export default {
  name: "LoginForm",
  data() {
    return {
      valid: false,
      Login: "",
      LoginRules: [],
      Password: "",
      Model: function() {
        return {
          login: this.Login,
          password: this.Password
        };
      }
    };
  },
  methods: {
    Authenticate() {
      this.$store.dispatch("login", this.Model());
    }
  },
  components: {
    ConfirmButton: ConfirmButton
  }
};
</script>

<style></style>