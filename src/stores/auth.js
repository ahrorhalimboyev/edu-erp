import authApi from "../api/auth/authApi";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import router from "@/router/index";
import authProfile from "../api/auth/authProfile";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
    roles: [],
  }),
  actions: {
    async authLogin(payload) {
      try {
        let res = await authApi.login(payload);
        if (res?.tokens?.access_token) {
          localStorage.setItem("role", res?.user?.role);
          localStorage.setItem("token", res?.tokens?.access_token);
          if (res?.user?.role == "admin") {
            await router.push({ name: "students" });
          } else if (res?.user?.role == "director") {
            await router.push({ name: "staffs" });
          } else if(res?.user?.role == "teacher"){
            await router.push({ name: "teacher" });
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getProfile(payload) {
      try {
        let res = await authProfile.getProfile(payload);
        this.user = res;
      } catch (err) {
        console.log(err);
      }
    },
    async updateImage(payload) {
      try {
        let res = await authProfile.updateImage(payload);
        this.image = res.image;
      } catch (err) {
        console.log(err);
      }
    },
    async updateProfile(payload) {
      try {
        let res = await authProfile.updateProfile(payload);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
