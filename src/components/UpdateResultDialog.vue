<template>
  <v-dialog v-if="match.isFinished" v-model="dialog" max-width="480">
    <template #activator="{on}">
      <font-awesome-icon
        icon="edit"
        style="color: goldenrod"
        v-on="on"
      ></font-awesome-icon>
    </template>
    <v-card style="padding: 10%">
      <v-card-title class="headline">
        <font-awesome-icon
          icon="edit"
          style="margin-right: 5%"
        ></font-awesome-icon>
        Edycja wyniku
      </v-card-title>
      <v-form ref="form" v-model="valid" style="padding: 5%">
        <v-layout row>
          <v-flex xs8>
            <v-text-field
              readonly
              v-model="match.homeTeamName"
              label="Drużyna gospodarzy"
            ></v-text-field>
          </v-flex>
          <v-flex xs3 offset-xs1>
            <v-text-field label="Wynik" v-model="match.homeTeamPoints">
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs8>
            <v-text-field
              readonly
              v-model="match.guestTeamName"
              label="Drużyna gości"
            ></v-text-field>
          </v-flex>
          <v-flex xs3 offset-xs1>
            <v-text-field label="Wynik" v-model="match.guestTeamPoints">
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
      <v-card-actions>
        <v-btn
          color="success"
          @click="confirm()"
          style="width: 40%;padding-left: 5%;padding-right: 5%"
          ><v-icon>thumb_up</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          @click="cancel()"
          style="width: 40%;padding-left: 5%;padding-right: 5%"
        >
          <v-icon>thumb_down</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog v-else v-model="dialog" max-width="480">
    <template #activator="{on}">
      <font-awesome-icon
        icon="calendar-check"
        style="color: limegreen"
        v-on="on"
      ></font-awesome-icon>
    </template>
    <v-card style="padding: 10%">
      <v-card-title class="headline">
        <font-awesome-icon
          icon="calendar-check"
          style="margin-right: 5%"
        ></font-awesome-icon>
        Dodawanie wyniku
      </v-card-title>
      <v-form ref="form" v-model="valid" style="padding: 5%">
        <v-layout row>
          <v-flex xs8>
            <v-text-field
              readonly
              v-model="match.homeTeamName"
              label="Drużyna gospodarzy"
            ></v-text-field>
          </v-flex>
          <v-flex xs3 offset-xs1>
            <v-text-field label="Wynik" v-model="addHomeTeamPoints">
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs8>
            <v-text-field
              readonly
              v-model="match.guestTeamName"
              label="Drużyna gości"
            ></v-text-field>
          </v-flex>
          <v-flex xs3 offset-xs1>
            <v-text-field label="Wynik" v-model="addGuestTeamPoints">
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
      <v-card-actions>
        <v-btn
          color="success"
          @click="confirm()"
          style="width: 40%;padding-left: 5%;padding-right: 5%"
          ><v-icon>thumb_up</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          @click="cancel()"
          style="width: 40%;padding-left: 5%;padding-right: 5%"
        >
          <v-icon>thumb_down</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "UpdateResultDialog",
  props: ["match"],
  data() {
    return {
      dialog: false,
      valid: false,
      addHomeTeamPoints: "",
      addGuestTeamPoints: ""
    };
  },
};
</script>

<style scoped></style>
