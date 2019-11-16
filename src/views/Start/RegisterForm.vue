<template>
  <v-form ref="form" v-model="valid">
    <v-layout>
      <v-flex xs8 offset-xs2>
        <v-text-field
          v-model="FName"
          :rules="FNameRules"
          label="Imię"
          required
        ></v-text-field>
        <v-text-field
          v-model="LName"
          :rules="LNameRules"
          label="Nazwisko"
          required
        ></v-text-field>
        <v-text-field
          v-model="Password"
          :rules="PasswordRules"
          :type="'password'"
          label="Hasło"
          required
        ></v-text-field>
        <v-text-field
          v-model="PasswordRepeat"
          :rules="PasswordRepeatRules"
          :type="'password'"
          label="Powtórz hasło"
          required
        ></v-text-field>
        <v-text-field
          v-model="Mail"
          :rules="MailRules"
          label="Adres e-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="Phone"
          :rules="PhoneRules"
          label="Nr telefonu"
        ></v-text-field>
        <v-layout row>
          <v-flex xs4 offset-xs1
            ><ConfirmButton
              Message="STWÓRZ KONTO"
              @clicked="submit()"
            ></ConfirmButton
          ></v-flex>
          <v-flex xs2></v-flex>
          <v-flex xs4>
            <ResetButton Message="RESET" @clicked="reset"></ResetButton>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import axios from "axios/index";
import ConfirmButton from "@/components/ConfirmButton";
import ResetButton from "@/components/ResetButton";
import { mapGetters } from "vuex";

export default {
  name: "RegisterForm",

  data() {
    return {
      valid: false,
      FName: "",
      FNameRules: [
        f => !!f || "Wprowadz swoje imię",
        f =>
          /^[a-zA-Z]{3,}$/.test(f) ||
          "Imie powinno zawierac conajmniej 3 znak bez spacji, znaków specjalnych ani liczb"
      ],
      LName: "",
      LNameRules: [
        l => !!l || "Wprowadz swoje nazwisko",
        l =>
          /^[a-zA-Z]{3,}$/.test(l) ||
          "Nazwisko powinno zawierac conajmniej 3 znak bez spacji, znaków specjalnych ani liczb"
      ],
      Password: "",
      PasswordRules: [
        p => !!p || "Wprowadź hasło",
        p =>
          /^.*(?=.{4,32})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/.test(
            p
          ) ||
          "Hasło musi zawierać duże i małe litery, cyfry oraz znaki specjalne"
      ],
      PasswordRepeat: "",
      PasswordRepeatRules: [
        r => !!r || "Powtórz hasło",
        r => r === this.Password || "Hasła nie są takie same"
      ],
      Mail: "",
      MailRules: [
        m => !!m || "Wprowadź adres e-mail",
        m => /^.+@\w+\.\w+$/.test(m) || "Format adresu email niepoprawny"
      ],
      Phone: "",
      PhoneRules: [
        ph =>
          /^\d{3}-\d{3}-\d{3}$/.test(ph) ||
          "Wpisz numer telefonu w formacie 123-123-123"
      ]
    };
  },
  computed: {
    fullName: function() {
      return `${this.FName} ${this.LName}`;
    },
    model: function() {
      return {
        Email: this.Mail,
        Password: this.Password,
        FullName: this.fullName,
        Phone: this.Phone
      };
    },
    ...mapGetters(["apiUrl"])
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    submit() {
      if (this.$refs.form.validate()) {
        axios
          .post(`${this.apiUrl}/api/user`, this.model)
          .then(response => {
            switch (response.status) {
              case 201: {
                this.$swal.fire({
                  type: "success",
                  title: "Sukces",
                  confirmButtonColor: "#7fffd4",
                  text: "Konto założone poprawnie",
                  showConfirmButton: true,
                  timer: 4000
                });
                this.$router.push({ name: "login" });
                break;
              }
              case 409: {
                this.$swal.fire({
                  type: "error",
                  title: "Błąd",
                  confirmButtonColor: "#cb4154",
                  text: "Podany adres e-mail istnieje już w bazie danych",
                  showConfirmButton: true,
                  timer: 4000
                });
                break;
              }
              case 400: {
                this.$swal.fire({
                  type: "error",
                  title: "Błąd",
                  confirmButtonColor: "#cb4154",
                  text: "Nie można przetworzyć żądania",
                  showConfirmButton: true,
                  timer: 4000
                });
                break;
              }
              case 500: {
                this.$swal.fire({
                  type: "error",
                  title: "Błąd",
                  confirmButtonColor: "#cb4154",
                  text: "Wewnętrzny błąd servera",
                  showConfirmButton: true,
                  timer: 4000
                });
                break;
              }
              default: {
                break;
              }
            }
          })
          .catch(error => {
            // eslint-disable-next-line no-console
            console.log(error);
          });
      }
    }
  },
  components: {
    ConfirmButton,
    ResetButton
  }
};
</script>
