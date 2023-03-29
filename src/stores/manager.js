import { defineStore } from "pinia";

export const useManagerStore = defineStore({
  id: "manager",
  state: () => ({
    taskView: false,
    taskForm: {
      visible: false,
      edit: false,
    },
    boardForm: {
      visible: false,
      edit: false,
    },
    delete: {
      visible: false,
      board: false,
    },
    sidebar: true,
    sidebarMobile: false,
    overlay: false,
    darkmode: false,
    dragging: false,
  }),
  getters: {},
  actions: {
    hideOverlay() {
      this.overlay = false;
      this.taskView = false;
      this.taskForm.visible = false;
      this.boardForm.visible = false;
      this.delete.visible = false;
      if(this.sidebarMobile) {
        this.sidebar = false;
      }
      this.sidebarMobile = false;
    },
  },
});
