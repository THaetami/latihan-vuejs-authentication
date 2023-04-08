import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/Home.vue'
import LoginPage from '../pages/Login.vue'
import RegisterPage from '../pages/Register.vue'
import PlaylistsPage from '../pages/PlaylistsPage.vue'
import NotFound from '../components/NotFound.vue'
import PlaylistSongs from '../pages/PlaylistSongs.vue'

const guest = (to, from, next) => {
  if (!localStorage.getItem("token")) {
    return next();
  } else {
    return next("/");
  }
};
const auth = (to, from, next) => {
  if (localStorage.getItem("token")) {
    return next();
  } else {
    return next("/login");
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'aktip',
  routes: [
    {
        path: '/:pathMatch(.*)*',
        name: NotFound,
        component: NotFound,
        // redirect: '/'
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage,
      beforeEnter: guest
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
      beforeEnter: guest
    },
    {
      path: '/playlists',
      name: 'PlaylistsPage',
      component: PlaylistsPage,
      beforeEnter: auth,
      children: [
        {
          path: '/playlists/:playlistId/songs',
          name: 'PlaylistSongs',
          component: PlaylistSongs,
        }
      ]
    }
  ]
})


export default router
