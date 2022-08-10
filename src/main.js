import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./assets/main.css";
import VueDragscroll from "vue-dragscroll";
const app = createApp(App);

app.use(VueDragscroll);
app.use(createPinia());

app.mount("#app");
