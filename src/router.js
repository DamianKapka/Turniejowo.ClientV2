import Vue from "vue";
import Router from "vue-router";
import LandingPage from "@/views/LandingPage";
import FourOFour from "@/views/FourOFour"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "/LandingPage",
      component: LandingPage
    },
    {
      path: "*",
      name: "FourOFour",
      component: FourOFour
    }
  ]
});
