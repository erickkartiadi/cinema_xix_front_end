<template>
  <div>
    <h1 class="display-4 text-center">This is branch</h1>
    <form>
      <div class="form-group">
        <input type="text" class="form-control" v-model="branch.name" placeholder="username" />
      </div>
      <button v-if="!action.edit" @click.prevent="add" class="btn btn-primary">Add</button>
      <button v-else @click.prevent="update" class="btn btn-danger">Update</button>
    </form>

    <br />
    <br />
    <table class="table table-dark">
      <thead>
        <th>No</th>
        <th>Name</th>
        <th colspan="2">Action</th>
      </thead>
      <tbody>
        <tr v-for="(branch,index) in branches" :key="index">
          <td>{{index + 1}}</td>
          <td>{{branch.name}}</td>
          <td>
            <button @click="edit(branch.id,branch.name)" class="btn btn-warning w-100">Edit</button>
          </td>
          <td>
            <button @click="destroy(branch.id)" class="btn btn-danger w-100">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      branches: [],
      branch: {
        name: ""
      },
      action: {
        id: "",
        edit: false
      }
    };
  },
  created() {
    this.getBranches();
  },
  methods: {
    getBranches() {
      this.$http
        .get("branches")
        .then(res => {
          this.branches = res.data.body;
        })
        .catch(err => this.redirect(err.response.data.message));
    },
    add() {
      this.$http
        .post("branches", this.branch)
        .then(res => {
          this.getBranches();
          this.branch.name = "";
        })
        .catch(err => alert(err.response.data.message));
    },
    edit(id, name) {
      this.action.id = id;
      this.action.edit = true;
      this.branch.name = name;
    },
    update() {
      this.$http
        .patch(`branches/${this.action.id}`, this.branch)
        .then(res => this.getBranches())
        .catch(err => alert(err.response.data.message));
    },
    destroy(id) {
      this.$http
        .delete(`branches/${id}`)
        .then(res => this.getBranches())
        .catch(err => alert(err.response.data.message));
    }
  }
};
</script>