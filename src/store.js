import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const types = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT"
};

const state = {
  logged: localStorage.getItem("token")
};

const getters = {
  isLogged: state => state.logged
};

const actions = {
  login: function({ commit }, credentials) {
    axios
      .post("https://localhost:5001/api/user/authenticate", credentials)
      .then(response => {
        alert("Logged in successfully!");
        localStorage.setItem("token", response.data.token);
        commit(types.LOGIN);
      })
      .catch(error => {
        if (error.response.status === 401) {
          alert("Credentials invalid");
        } else {
          alert(error.response.data);
        }
      });
  },

  logout: function() {
    //TODO
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
