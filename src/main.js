import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import Router from "vue-router";
import { routes } from "./routes.js";
import Axios from "axios";
Vue.config.productionTip = false;

Vue.prototype.$http = Axios;
Vue.prototype.$http.defaults.baseURL = "http://localhost:8000/api/v1";
Vue.prototype.$http.defaults.headers.common["token"] = localStorage.getItem(
  "token"
);

Vue.use(Router);

let router = new Router({
  routes: routes,
  mode: "history"
});

let globalData = new Vue({
  data: {
    role: "",
    token: "",
    loggedIn: false
  }
});

Vue.mixin({
  computed: {
    role: {
      get() {
        return globalData.$data.role;
      },
      set(newRole) {
        globalData.$data.role = newRole;
      }
    },
    token: {
      get() {
        return localStorage.getItem("token");
      },
      set(newToken) {
        localStorage.setItem("token", newToken);
        Vue.prototype.$http.defaults.headers.common[
          "token"
        ] = localStorage.getItem("token");
      }
    },
    loggedIn: {
      get() {
        return globalData.$data.loggedIn;
      },
      set(newBool) {
        globalData.$data.loggedIn = newBool;
      }
    }
  },
  methods: {
    redirect(msg) {
      alert(msg);
      this.$router.push({ name: "auth" });
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
