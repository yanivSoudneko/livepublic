<template>
  <header class="header-main">
    <div class="nav-bar">
      <router-link tag="div" class="logo flex a-center" to="/">
        <img src="@/assets/img/logo.png" />
        <span>LivePublic.</span>
      </router-link>

      <!-- search btn -->
      <div class="filter-btn flex j-between a-center" v-if="!hideBtn" @click="(hideBtn = true), (firstClick = true)">
        <span>Start your search</span>
        <span class="search-svg-icon flex j-center">
          <svg
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
          </svg>
        </span>
      </div>
      <!-- filters -->
      <nav-filter v-if="hideBtn" v-click-outside="handleShowFilter"></nav-filter>
      <div class="links">
        <router-link to="/explore"> Explore </router-link>
        <router-link to="/host"> Become Host </router-link>
        <!-- <router-link to="/login"> Login </router-link> -->
        <!-- <div class="login-user flex a-center">
          <div class="main-nav-menu">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style="
                display: block;
                fill: none;
                height: 16px;
                width: 16px;
                stroke: grey;
                stroke-width: 3;
                overflow: visible;
              "
            >
              <g fill="none" fill-rule="nonzero">
                <path d="m2 16h28"></path>
                <path d="m2 24h28"></path>
                <path d="m2 8h28"></path>
              </g>
            </svg>
          </div>
          <div class="main-nav-img">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              class="svg-avatar"
            >
              <path
                d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"
              ></path>
            </svg>
          </div>
        </div> -->
      </div>
    </div>
    <!-- <div
			class="land-div"
			:class="{ 'shrink-on-scroll': scrollPosition > 50 }"
		> -->
    <div class="land-div" v-if="showHeroImage">
      <img class="land-img" src="../../public/img/land-img.webp" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header-main {
  // margin-bottom: 150px;
  background-color: white;
  margin-bottom: 100px;
  .nav-bar {
    display: flex;
    justify-content: space-between;
    max-width: 1210px;
    margin: 0 auto;
    padding: 10px;
    align-items: center;
    background-color: white;
    border-radius: 60px;
    .filter-btn {
      width: 245px;
      height: 35px;
      border: 1px solid rgba($color: #f1eaea, $alpha: 1);
      border-radius: 20px;
      outline: none;
      text-decoration: none;
      background: transparent;
      text-align: inherit;
      padding: 20px 10px;
      cursor: pointer;
      .search-svg-icon {
        width: 15px;
        background-color: #ff385c;
        color: white;
        padding: 10px 15px;
        border-radius: 50%;
      }

      &:hover,
      &:active {
        box-shadow: 0px 0px 10px 0px rgba($color: #000000, $alpha: 0.2);
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
  .login-user {
    display: flex;
    border: 1px solid grey;
    padding: 5px;
    border-radius: 20px;
    justify-content: space-around;
    width: 60px;
    cursor: pointer;
    .svg-avatar {
      display: block;
      height: 20px;
      fill: grey;
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

    &.shrink-on-scroll {
      height: 0;
    }
    transition: height 3s ease-in-out;
  }
}
</style>

<script>
import ClickOutside from 'vue-click-outside';
import navFilter from '../cmps/navFilter.cmp';
export default {
  name: 'NavBar',
  data() {
    return {
      hideBtn: false,
      firstClick: true,
      // scrollPosition: null,
    };
  },
  computed: {
    user() {
      return this.$store.getters['user/user'];
    },
  },
  methods: {
    handleShowFilter() {
      if (this.firstClick) {
        this.firstClick = false;
        return;
      }
      this.hideBtn = false;
    },
  },
  computed: {
    showHeroImage() {
      return this.$store.getters.showHeroImage;
    },
  },
  directives: {
    ClickOutside,
  },
  components: { navFilter },
};
</script>
