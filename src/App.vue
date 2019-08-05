<template>
  <div id="app">
    <my-header></my-header>
    <br />
    <br />
    <div class="container">
      <router-view></router-view>
    </div>
    <br />
    <br />
    <my-footer></my-footer>
  </div>
</template>

<script>
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
export default {
  components: {
    "my-header": Header,
    "my-footer": Footer
  }
};
</script>

<style>
</style>
