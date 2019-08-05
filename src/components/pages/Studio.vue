<template>
  <div>
    <h1>Studio</h1>
    <form>
      <div class="form-group">
        <select id="branch" @change="studio.branch_id = $event.target.value" class="form-control">
          <option :value="branch.id" :key="index" v-for="(branch,index) in branches">{{branch.name}}</option>
        </select>
      </div>
      <div class="form-group">
        <input type="text" class="form-control" v-model="studio.name" placeholder="Name" />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="studio.basic_price"
          placeholder="basic price"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="studio.additional_friday_price"
          placeholder="additional friday price"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="studio.additional_saturday_price"
          placeholder="additional saturday price"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="studio.additional_sunday_price"
          placeholder="additional sunday price"
        />
      </div>
      <button v-if="!action.edit" @click.prevent="add" class="btn btn-primary">Add</button>
      <button v-else @click.prevent="update()" class="btn btn-danger">Update</button>
    </form>
    <br />

    <br />
    <br />
    <table class="table table-dark">
      <thead>
        <th>No</th>
        <th>Branch Name :</th>
        <th>Name</th>
        <th>Basic Price</th>
        <th>Additional - Friday</th>
        <th>Additinal - Saturday</th>
        <th>Additinal - Sunday</th>
        <th colspan="2">Action</th>
      </thead>
      <tbody>
        <tr v-for="(studio,index) in studios" :key="index">
          <td>{{index + 1}}</td>
          <td>{{studio.branch_name}}</td>
          <td>{{studio.name}}</td>
          <td>{{studio.basic_price}}</td>
          <td>{{studio.additional_friday_price}}</td>
          <td>{{studio.additional_saturday_price}}</td>
          <td>{{studio.additional_sunday_price}}</td>
          <td>
            <button class="btn btn-warning" @click="edit(studio)">Edit</button>
          </td>
          <td>
            <button class="btn btn-danger" @click="destroy(studio.id)">Delete</button>
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
      branches: Array(),
      studios: Array(),
      studio: {
        branch_id: "",
        name: "",
        basic_price: "",
        additional_friday_price: "",
        additional_saturday_price: "",
        additional_sunday_price: ""
      },
      action: {
        id: "",
        edit: false
      }
    };
  },
  mounted() {
    this.getBranch();
    this.getStudios();
  },
  methods: {
    getBranch() {
      this.$http
        .get("branches")
        .then(res => {
          this.branches = res.data.body;
          this.studio.branch_id = this.branches[0].id;
        })
        .catch(err => alert(err.response.data.message));
    },
    getStudios() {
      this.$http
        .get(`studios`)
        .then(res => {
          this.studios = res.data.body;
        })
        .catch(err => alert(err));
    },
    add() {
      this.$http
        .post(`studios`, this.studio)
        .then(res => {
          this.getStudios();
          this.studio.name = "";
        })
        .catch(err => alert(err.response.data.message));
    },
    edit(studio) {
      this.action.id = studio.id;
      this.action.edit = true;
      this.studio.name = studio.name;
      this.studio.basic_price = studio.basic_price;
      this.studio.additional_friday_price = studio.additional_friday_price;
      this.studio.additional_saturday_price = studio.additional_saturday_price;
      this.studio.additional_sunday_price = studio.additional_sunday_price;
    },
    update() {
      this.$http
        .patch(`studios/${this.action.id}`, this.studio)
        .then(res => {
          this.getStudios(), (this.action.edit = false);
        })
        .catch(err => alert(err.response.data.message));
    },
    destroy(id) {
      this.$http
        .delete(`studios/${id}`)
        .then(res => this.getStudios())
        .catch(err => alert(err.response.data.message));
    }
  }
};
</script>