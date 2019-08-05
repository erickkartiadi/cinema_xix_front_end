<template>
  <div>
    <nav class="navbar navbar-expand navbar-light bg-light">
      <ul class="nav navbar-nav">
        <router-link tag="li" active-class="active" to="/home" exact>
          <a class="nav-link">Home</a>
        </router-link>
        <template v-if="role =='admin'">
          <router-link tag="li" active-class="active" to="/branch">
            <a class="nav-link">Branch</a>
          </router-link>
          <router-link tag="li" active-class="active" to="/studio">
            <a class="nav-link">Studio</a>
          </router-link>
          <router-link tag="li" active-class="active" to="/movie">
            <a class="nav-link">Movie</a>
          </router-link>
          <router-link tag="li" active-class="active" to="/schedule">
            <a class="nav-link">Schedule</a>
          </router-link>
        </template>
      </ul>
      <ul class="navbar-nav ml-auto">
        <button class="btn btn-primary" v-if="loggedIn == false" @click="auth">Login</button>
        <button @click="logout" class="btn btn-danger" v-else>Logout</button>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    auth() {
      this.$router.push({ name: "auth" });
    },
    logout() {
      this.$router.push({ name: "auth" });
      this.loggedIn = false;
      this.role = "user";

      this.$http.get("auth/logout").then(res => {
        localStorage.clear("token");
      });
    }
  }
};
</script>


