import { defineStore } from "pinia";

const API_URL = "http://127.0.0.1:8000/api";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),
   persist: true,

  actions: {
    async register(payload) {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw await res.json();

      const data = await res.json();
      this.user = data.user;
      this.token = data.token;
      localStorage.setItem("token", this.token);
    },

     async login(payload) {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw await res.json();

      const data = await res.json();
      this.user = data.user;
      this.token = data.token;
      localStorage.setItem("token", this.token);
    },

  }
});
