import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "@/router";

Vue.use(Vuex);

const types = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT"
};

const state = {
  logged: localStorage.getItem("token"),
  currentlyLoggedUserId: "",
  currentlyEditedTournament: "",
  apiUrl: "http://78.47.36.35:7000"
};

const getters = {
  isLogged: state => state.logged,
  currentlyEditedTournament: state => state.currentlyEditedTournament,
  currentlyLoggedUserId: state => state.currentlyLoggedUserId,
  apiUrl: state => state.apiUrl
};

const actions = {
  login: function({ commit }, credentials) {
    axios
      .post(`${this.getters.apiUrl}/api/user/authenticate`, credentials)
      .then(response => {
        switch (response.status) {
          case 200: {
            alert("Zalogowano!");
            localStorage.setItem("token", response.data.token);
            commit(types.LOGIN);
            router.push({ path: "/profile" });
            break;
          }
          case 401: {
            alert("Nieprawidłowe dane");
            break;
          }
          case 500: {
            alert("Błąd servera");
            break;
          }
          default:
            break;
        }
      })
      .catch(error => {
        alert(error.response.data);
      });
  },

  logout: function({ commit }) {
    localStorage.removeItem("token");
    router.push({ path: "/start/login" });
    commit(types.LOGOUT);
  }
};

const mutations = {
  [types.LOGIN](state) {
    state.logged = 1;
  },

  [types.LOGOUT](state) {
    state.logged = 0;
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
