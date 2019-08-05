import Auth from "./components/pages/Auth.vue";
import Home from "./components/pages/Home.vue";
import Branch from "./components/pages/Branch.vue";
import Studio from "./components/pages/Studio.vue";
import Movie from "./components/pages/Movie.vue";
import Schedule from "./components/pages/Schedule.vue";

export const routes = [
  { name: "auth", path: "/", component: Auth },
  { name: "home", path: "/home", component: Home },
  { name: "branch", path: "/branch", component: Branch },
  { name: "studio", path: "/studio", component: Studio },
  { name: "movie", path: "/movie", component: Movie },
  { name: "schedule", path: "/schedule", component: Schedule }
];
