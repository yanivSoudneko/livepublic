<template>
  <header class="header-main">
    <div class="nav-bar">
      <div class="logo" @click="$router.push('/')">
        <img src="img/app-logo.png" />LivePublic.
      </div>
      <div class="filter-btn">
        <button>
           Start Search...<!--<svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            style="
              display: block;
              fill: none;
              height: 12px;
              width: 12px;
              stroke: currentColor;
              stroke-width: 5.333333333333333;
              overflow: visible;
            "
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <g fill="none">
              <path
                d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
              ></path>
            </g>
          </svg> -->
        </button>
      </div>
      <div class="links">
        <router-link to="/"> Explore </router-link>
        <router-link to="/host"> Become Host </router-link>
        <router-link to="/login"> Login </router-link>
      </div>
    </div>
    <div class="land-div">
      <img class="land-img" src="../../public/img/land-img.webp" />
      <!-- <span> Made possible by Hosts</span> -->
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header-main {
  background-color: white;
  .nav-bar {
    display: flex;
    justify-content: space-between;
    max-width: 1060px;
    margin: 0 auto;
    padding: 10px;
    align-items: center;
    background-color: white;
    border-radius: 60px;
    .filter-btn {
      button {
        width: 245px;
        height: 35px;
        border-radius: 20px;
        outline: none;
        text-decoration: none;
        border-color: #f1eaea;
        background: transparent;
        text-align: inherit;
        padding: 10px;
        cursor: pointer;
      }
    }
    .logo {
      cursor: pointer;
      img {
        max-width: 50px;
        mix-blend-mode: multiply;
      }
    }
    a {
      text-decoration: none;
      color: grey;
      .links:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
  .land-div {
    display: flex;
    justify-content: center;
    border: 168px solid;
    .land-img {
      max-width: 80vw;
      display: flex;
      margin: 0 auto;
    }
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