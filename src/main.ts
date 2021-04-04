import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Nav from "@/components/Nav.vue";
import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";
import { DatePicker } from "ant-design-vue";
import "ant-design-vue/lib/date-picker/style/css";
Vue.component(DatePicker.name, DatePicker);
Vue.component("Nav", Nav);
Vue.component("Layout", Layout);
Vue.component("Icon", Icon);
Vue.config.productionTip = false;
Vue.prototype.$eventBus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

if (document.documentElement.clientWidth > 500) {
  window.alert("请用手机打开本页面，以保证浏览效果");
}
