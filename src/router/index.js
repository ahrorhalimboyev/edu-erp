import { createRouter, createWebHistory } from 'vue-router'
import admin from './admin'
import auth from './auth'
import director from './director'
import finance from './finance'
import teacher from './teacher'
import notFound from './not-found'
import nProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    admin,
    auth,
    director,
    finance,
    teacher,
    notFound
  ]
})

router.beforeResolve((to, from, next) => {
  nProgress.start();
  next();
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = to.name === "auth";

  if (!token && !name) {
    return next({ name: "auth" });
  } else {
    if (token && name) {
      if (role === "admin") {
        return next({ name: "students" });
      } else if (role === "director") {
        return next({ name: "staffs" });
      }
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  nProgress.done();
});


export default router
