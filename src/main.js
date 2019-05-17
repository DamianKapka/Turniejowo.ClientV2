import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["Authentication"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return error;
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const BadCodes = [401, 402, 403];

    if (BadCodes.includes(error.response.status)) {
      router.push("/start/login");
    }

    return error.response;
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
