import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return {
      theme: localStorage.getItem("theme") ?? "system",
    };
  },
});
