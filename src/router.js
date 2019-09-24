import Vue from "vue";
import Router from "vue-router";
import MainCard from "@/views/MainCard";
import FourOFour from "@/views/FourOFour";
import Start from "@/views/Start/Start";
import LoginForm from "@/views/Start/LoginForm";
import RegisterForm from "@/views/Start/RegisterForm";
import TournamentFinder from "@/views/Start/TournamentFinder";
import TournamentHub from "@/views/TournamentHub/TournamentHub";
import TournamentInfo from "@/views/TournamentHub/TournamentInfo";
import TournamentParticipants from "@/views/TournamentHub/TournamentParticipants";
import TournamentStats from "@/views/TournamentHub/TournamentStats";
import TournamentTable from "@/views/TournamentHub/TournamentTable";
import TournamentMatches from "@/views/TournamentHub/TournamentMatches";
import Profile from "@/views/Profile/Profile";
import NewTournament from "@/views/Profile/NewTournament";
import MyTournaments from "@/views/Profile/MyTournaments";
import MyAccount from "@/views/Profile/MyAccount";
import EditOwnTournament from "@/views/Edit/EditOwnTournament";
import EditGeneral from "@/views/Edit/EditGeneral";
import EditParticipants from "@/views/Edit/EditParticipants";
import EditProgress from "@/views/Edit/EditProgress";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "MainCard",
      component: MainCard
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
        },
        {
          path: "matches",
          name: "matches",
          component: TournamentMatches
        }
      ]
    },
    {
      path: "/profile",
      component: Profile,
      redirect: "/profile/my-tournaments",
      children: [
        {
          path: "new-tournament",
          name: "NewTournament",
          component: NewTournament
        },
        {
          path: "my-tournaments",
          name: "MyTournaments",
          component: MyTournaments
        },
        {
          path: "my-account",
          name: "MyAccount",
          component: MyAccount
        }
      ]
    },
    {
      path: "/profile/my-tournaments/edit/:id",
      name: "EditOwnTournament",
      redirect: "/profile/my-tournaments/edit/:id/general",
      component: EditOwnTournament,
      children: [
        {
          path: "general",
          name: "EditGeneral",
          component: EditGeneral
        },
        {
          path: "participants",
          name: "EditParticipants",
          component: EditParticipants
        },
        {
          path: "table",
          name: "AdminTable",
          component: TournamentTable
        },
        {
          path: "progress",
          name: "EditProgress",
          component: EditProgress
        },
        {
          path: "statistics",
          name: "AdminStatistics",
          component: TournamentStats
        }
      ]
    },
    {
      path: "*",
      name: "FourOFour",
      component: FourOFour
    }
  ]
});
