import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import veeValidatePlugins from "./plugins/vee-validate";
const app = createApp(App);
// import VueTelInput from "vue3-tel-input";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "vue3-tel-input/dist/vue3-tel-input.css";

import VueTheMask from "vue-the-mask";
import "../node_modules/nprogress/nprogress.css";

app.use(createPinia());
app.use(ElementPlus);
app.use(VueTheMask);
app.use(router);
app.use(veeValidatePlugins);

app.mount("#app");
