<template>
  <div id="app">
    <Main />
  </div>
</template>

<script>
import Main from "./components/Main.vue";

export default {
  name: "App",
  components: {
    Main
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.btn-main-dark {
  color: #ffffff !important;
  text-decoration: none;
  background: #494949;
  padding: 5px;
  border: 1px solid #ffffff !important;
  display: inline-block;
  transition: all 0.4s ease 0s;
}
.btn-main-hover-green:hover {
  color: #ffffff !important;
  background: #38e438;
  border-color: #38e438 !important;
  transition: all 0.4s ease 0s;
}
.list-group-item-hover-green:hover {
  color: #ffffff !important;
  background: #38e438;
  border-color: #38e438 !important;
  transition: all 0.4s ease 0s;
  cursor: pointer;
}
</style>
