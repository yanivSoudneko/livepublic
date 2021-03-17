<template>
  <div id="app">
    <div id="nav">
      <nav-bar />
    </div>
  </div>
</template>



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
