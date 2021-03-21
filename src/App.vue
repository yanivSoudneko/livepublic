<template>
  <div id="app">
    <nav-bar />
    <div class="view">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  .view {
    height: 100vh;
    max-width: 1210px;
    margin: 0 auto;
  }
}
</style>

<script>
import navBar from "./cmps/header.cmp";
export default {
  components: {
    navBar,
  },
};
// import jsonData from '../data/airbnb.json'
// export default {
//   created() {
//     // console.log(jsonData);
//   },
// }
</script>
