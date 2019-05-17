import Vue from "vue";
import Router from "vue-router";
import MainCard from "@/views/MainCard";
import FourOFour from "@/views/FourOFour";
import LandingPage from "@/views/LandingPage";
import Start from "@/views/Start";
import LoginForm from "@/views/LoginForm";
import RegisterForm from "@/views/RegisterForm";
import TournamentFinder from "@/views/TournamentFinder";
import TournamentHub from "@/views/TournamentHub";
import TournamentInfo from "@/views/TournamentHub/TournamentInfo";
import TournamentParticipants from "@/views/TournamentHub/TournamentParticipants";
import TournamentStats from "@/views/TournamentHub/TournamentStats";
import TournamentTable from "@/views/TournamentHub/TournamentTable";
import Profile from "@/views/Profile/Profile"

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
          component: LandingPage
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
      redirect: "tournament/:id/info",
      name: "TournamentById",
      component: TournamentHub,
      children: [
        {
          path: "info",
          name: "info",
          component: TournamentInfo
        },
        {
          path: "participants",
          name: "participants",
          component: TournamentParticipants
        },
        {
          path: "stats",
          name: "stats",
          component: TournamentStats
        },
        {
          path: "table",
          name: "table",
          component: TournamentTable
        }
      ]
    },
    {
      path: "/profile",
      component: Profile
    },
    {
      path: "*",
      name: "FourOFour",
      component: FourOFour
    }
  ]
});
