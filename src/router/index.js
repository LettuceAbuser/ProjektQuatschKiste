import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import GameView from '../views/WieHoch.vue';
import DiabloTimerView from "@/views/DiabloTimerView.vue";
import LeagueRoll from '../views/LeagueView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
    {
        path: '/game',
        name: 'game',
        component: GameView
    },
    {
        path: '/tracker',
        name: 'tracker',
        component: DiabloTimerView
    },
    {
        path: '/league',
        name: 'league',
        component: LeagueRoll
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
