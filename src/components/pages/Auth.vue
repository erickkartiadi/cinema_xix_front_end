<template>
  <div>
    <h1>This is auth</h1>
    <form>
      <div class="form-group">
        <input type="text" class="form-control" v-model="user.username" placeholder="username" />
      </div>
      <div class="form-group">
        <input type="password" class="form-control" v-model="user.password" placeholder="password" />
      </div>
      <button @click.prevent="login" class="btn btn-success">Login</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$http
        .post("/auth/login", this.user)
        .then(res => {
          localStorage.setItem("token", res.data.token);
          this.$router.push({
            name: "home",
            params: { role: res.data.role }
          });
          this.role = res.data.role;
          this.token = res.data.token;
          this.loggedIn = true;
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    }
  }
};
</script>

