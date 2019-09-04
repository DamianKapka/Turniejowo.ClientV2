import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faEdit);
library.add(faTrashAlt);
library.add(faUserPlus);
library.add(faCalendarCheck);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
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
