import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from  "./store"
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
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    const BadCodes = [401, 402, 403];

    if (BadCodes.includes(response.status)) {
      router.push("/start/login");
    }

    return response;
  },
  error => {
    Promise.reject(error);
  }
);

new Vue({
  router,store,
  render: h => h(App)
}).$mount("#app");
