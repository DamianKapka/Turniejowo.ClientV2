<template>
  <v-form>
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-text-field v-model="Login" label="Adres e-mail"></v-text-field>
        <v-text-field
          v-model="Password"
          label="Password"
          :type="'password'"
        ></v-text-field>
        <v-flex xs6 offset-xs3>
          <ConfirmButton Message="ZALOGUJ" @clicked="Authenticate">
          </ConfirmButton>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import ConfirmButton from "@/components/ConfirmButton";

export default {
  name: "LoginForm",
  data() {
    return {
      Login: "",
      Password: ""
    };
  },
  computed: {
    Model: function() {
      return {
        login: this.Login,
        password: this.Password
      };
    }
  },
  methods: {
    Authenticate() {
      this.$store.dispatch("login", this.Model);
    }
  },
  components: {
    ConfirmButton
  }
};
</script>
