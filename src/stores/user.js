import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import axios from "@/utils/axios";
import Cookies from "js-cookie";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    token: "",
    user: {
      _id: null,
      name: "",
      email: "",
      photo: "",
    },
  }),
  getters: {
    isAuthenticated() {
      return this.token && this.user._id;
    },
  },
  actions: {
    async updateProfile(payload) {
      let result = await axios
        .patch("/users/updateProfile", payload)
        .then((r) => r)
        .then(() => {
          this.authUser();
        });
    },
    async authUser() {
      let result = await axios.post("/users/user_info").then((r) => r);
      this.user = result.user;
    },
    async signIn(user) {
      let result = await axios
        .post("/users/sign_in", {
          email: user.email,
          password: user.password,
        })
        .then((r) => r[0]);
      this.user._id = result.user._id;
      this.user.name = result.user.name;
      this.user.email = result.user.email;
      this.user.photo = result.user.photo;
      this.token = result.user.token;
      Cookies.set("access_token", result.user.token);
      return result;
    },
    async signUp(user) {
      let result = await axios
        .post("/users/sign_up", {
          email: user.email,
          password: user.password,
        })
        .then((r) => r);
      return result;
    },
    signOut() {
      Cookies.remove("access_token");
    },
  },
});
