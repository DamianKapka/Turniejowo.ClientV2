import Vue from "vue";
import Router from "vue-router";
import MainCard from "@/views/MainCard";
import FourOFour from "@/views/FourOFour";
import LandingPage from "@/views/LandingPage";
import Start from "@/views/Start";
import LoginForm from "@/views/LoginForm";
import RegisterForm from "@/views/RegisterForm";
import TournamentFinder from "@/views/TournamentFinder";
import TournamentInfo from "@/views/TournamentInfo";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "MainCard",
      component: MainCard,
      children: [
        {
          path: "",
          name: "LandingPage",
          component: LandingPage,
        }
      ]
    },
    {
      path: "/start",
      redirect: "/start/login",
      name: "Start",
      component: Start,
      children: [
        {
          path: "register",
          name: "register",
          component: RegisterForm
        },
        {
          path: "login",
          name: "login",
          component: LoginForm
        },
        {
          path: "find",
          name: "find",
          component: TournamentFinder
        }
      ]
    },
    {
      path: "/tournament",
      redirect: "/start/find",
      name: "tournament"
    },
    {
      path: "/tournament/:id",
      name: "TournamentById",
      component: TournamentInfo
    },
    {
      path: "*",
      name: "FourOFour",
      component: FourOFour
    }
  ]
});
