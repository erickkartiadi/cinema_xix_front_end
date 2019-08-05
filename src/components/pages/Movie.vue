<template>
  <div>
    <h1>This is movie</h1>
    <form>
      <div class="form-group">
        <input type="text" v-model="movie.name" class="form-control" placeholder="Movie Name" />
      </div>
      <div class="form-group">
        <input
          type="text"
          v-model="movie.minute_length"
          class="form-control"
          placeholder="Movie Minute Length"
        />
      </div>
      <div class="form-group">
        <label>Movie Picture</label>
        <br />

        <input ref="file" type="file" @change="handleFile()" />
      </div>
      <button v-if="!action.edit" @click.prevent="add" class="btn btn-primary">Add</button>
      <button v-else @click.prevent="update" class="btn btn-danger">Update</button>
    </form>
    <br />
    <table class="table table-dark">
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Minute Length</th>
        <th>Picture</th>
        <th colspan="2">Action</th>
      </tr>
      <tr v-for="(movie,index) in movies" :key="index">
        <td>{{index + 1}}</td>
        <td>{{movie.name}}</td>
        <td>{{movie.minute_length}}</td>
        <td style="max-width:50px">
          <img class="img-fluid rounded" :src="movie.picture_url" :alt="movie.name" />
        </td>
        <td>
          <button class="btn btn-warning w-100" @click="edit(movie)">Edit</button>
        </td>
        <td>
          <button @click="destroy(movie.id)" class="btn btn-danger w-100">Delete</button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      movies: Array(),
      file: "",
      movie: {
        name: "",
        minute_length: ""
      },
      action: {
        id: "",
        edit: false
      }
    };
  },
  created() {
    this.getMovies();
  },
  methods: {
    handleFile() {
      this.file = this.$refs.file.files[0];
    },
    getMovies() {
      this.$http
        .get("movies")
        .then(res => {
          this.movies = res.data.body;
        })
        .catch(err => alert(err.response.data.message));
    },
    add() {
      let formData = new FormData();
      formData.append("picture_url", this.file);
      formData.append("name", this.movie.name);
      formData.append("minute_length", this.movie.minute_length);

      this.$http
        .post("movies", formData)
        .then(res => {
          this.getMovies();
          alert(res.data.message);
        })
        .catch(err => alert(err.response.data.message));
    },
    edit(movie) {
      this.action.id = movie.id;
      this.action.edit = true;
      this.movie.name = movie.name;
      this.movie.minute_length = movie.minute_length;
    },
    update() {
      let formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("picture_url", this.file);
      formData.append("name", this.movie.name);
      formData.append("minute_length", this.movie.minute_length);
      this.$http
        .post(`movies/${this.action.id}`, formData)
        .then(res => alert(res.data.message))
        .catch(err => alert(err.response.data.message));
    }
  }
};
</script>