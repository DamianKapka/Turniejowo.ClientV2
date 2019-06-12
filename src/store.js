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
  loggedUserId: "",
  currentlyEditedTournament: "",
};

const getters = {
  isLogged: state => state.logged,
  loggedUserId: state => state.loggedUserId,
  currentlyEditedTournament: state => state.currentlyEditedTournament
};

const actions = {
  login: function({ commit }, credentials) {
    axios
      .post("https://localhost:5001/api/user/authenticate", credentials)
      .then(response => {
        switch (response.status) {
          case 200: {
            alert("Logged sucessfully");
            localStorage.setItem("token", response.data.token);
            commit(types.LOGIN);
            router.push({ path: "/profile" });
            break;
          }
          case 401: {
            alert("Invalid Credendiatls");
            break;
          }
          case 500: {
            alert("Server error. Cannot proceed the request");
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
  },
  parseJwt({ commit }, token) {
    const base64Url = token.split(".")[1];
    const base64 = decodeURIComponent(
      atob(base64Url)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    const result = JSON.parse(base64);

    state.loggedUserId = result.unique_name;

    return { id: result.unique_name, actor: result.actort };
  },
  capitalize({commit}, text){
    return text.charAt(0).toUpperCase() + text.slice(1);
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
