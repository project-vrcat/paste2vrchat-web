import { createApp } from 'vue'
import App from "~/App.vue";
import { i18n } from "~/i18n";
import { createPinia } from "pinia";
import "~/style.scss";

const app = createApp(App)
app.use(i18n)
app.use(createPinia());
app.mount('#app')
