<template>
  <div class="nav-bar">
    <div class="logo"><img src="img/app-logo.png" /></div>
    <div class="links">
      <router-link to="/"> Explore </router-link>
      <router-link to="/host"> Become Host </router-link>
      <router-link to="/login"> Login </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  max-width: 1060px;
  margin: 0 auto;
  .logo {
    img {
      max-width: 50px;
    }
  }
  .links:not(:last-child) {
    margin-right: 5px;
  }
}
</style>


<script>
export default {
  name: "NavBar",
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: "user/logout" });
    },
  },
};
</script>