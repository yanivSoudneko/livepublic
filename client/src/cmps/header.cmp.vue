<template>
  <header class="header-main">
    <div class="nav-bar">
      <router-link tag="div" class="logo flex a-center" to="/">
        <img src="@/assets/img/logo.png" />
        <span class="logo-name"></span>
      </router-link>

      <!-- search btn -->
      <div
        class="filter-btn flex j-between a-center"
        v-if="!hideBtn && this.$route.name === 'Home'"
        @click="(hideBtn = true), (firstClick = true)"
      >
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
      <nav-filter v-if="scrollPosition && scrollPosition >= 0 && scrollPosition < 200 && showHeroImage"></nav-filter>

      <div class="links flex j-between a-center">
        <router-link to="/explore"> Explore </router-link>
        <!-- <router-link to="/host"> Become Host </router-link> -->
        <!-- <span>Become Host</span> -->
        <router-link to="/login"> Login </router-link>
        <router-link to="/back-office"> Dashboard </router-link>
        <!-- <div class="user-data flex a-center">
					<span class="user-name">Hello {{ user.fullname }}</span>
					<img
						class="user-img"
						:src="user.imgUrl"
						:alt="user.fullname"
					/>
				</div> -->
        <!-- PILL MENU -->
        <section>
          <el-row class="block-col-2">
            <el-col :span="12">
              <el-dropdown @visible-change="onDropdown" trigger="click" @command="handleCommand">
                <div class="el-dropdown-link-container flex">
                  <div class="el-dropdown-link flex">
                    <!-- <div
											class="notifications"
											v-if="unreadBookings"
										>
											{{ unreadBookings }}
										</div> -->
                    <div :class="rotateBurger" class="hamburger flex">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        style="
													display: block;
													height: 16px;
													width: 16px;
													stroke-width: 3;
													overflow: visible;
												"
                      >
                        <g fill="none" fill-rule="nonzero">
                          <path d="m2 16h28"></path>
                          <path d="m2 24h28"></path>
                          <path d="m2 8h28"></path>
                        </g></svg
                      ><i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <div v-if="!user" class="profile-pic flex">
                      <svg
                        class="profile-pic"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        style="
													display: block;
													fill: currentcolor;
												"
                      >
                        <path
                          d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"
                        ></path>
                      </svg>
                    </div>
                    <img class="profile-img" v-else :src="user.imgUrl" />
                  </div>
                </div>
                <el-dropdown-menu class="hamburger-dropdown" slot="dropdown">
                  <el-dropdown-item class="houses-nav-mobile">
                    <router-link to="/house" exact>
                      Places to stay
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item class="host-nav-mobile">
                    <router-link to="/profile" exact>
                      Become a host
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="!user" command="loginModal">Login</el-dropdown-item>
                  <el-dropdown-item v-if="!user" command="signUpModal">Sign up</el-dropdown-item>
                  <el-dropdown-item v-if="user" command="toProfile">My Profile</el-dropdown-item>
                  <el-dropdown-item v-if="user" command="logout">Logout</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </section>
        <!-- PILL MENU END -->
      </div>
    </div>
    <!-- <div
			class="land-div"
			:class="{ 'shrink-on-scroll': scrollPosition > 50 }"
		> -->
    <div class="land-div" v-if="showHeroImage">
      <img class="land-img" src="../../public/img/land-img.webp" />
    </div>
    <h3 class="sub-header" v-if="showHeroImage">Made possible by Hosts</h3>
  </header>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import navFilter from '../cmps/navFilter.cmp';
export default {
  name: 'NavBar',
  data() {
    return {
      hideBtn: false,
      firstClick: true,
      scrollPosition: null,
      // scrollPosition: null,
      // test data
      unreadBookings: 5,
      isDropdown: false,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: 'user/logout' });
      this.$router.push('/');
    },
    handleShowFilter() {
      if (this.firstClick) {
        this.firstClick = false;
        return;
      }
      this.hideBtn = false;
    },
    handleScroll() {
      this.scrollPosition = window.scrollY;
    },
    // test methods
    handleCommand(command) {
      if (command === 'loginModal') this.$router.push('/login');
      else if (command === 'signUpModal') this.$router.push('/login');
      else if (command === 'logout') this.logout();
      else if (command === 'toProfile') this.$router.push('/dashboard');
    },
    onDropdown() {
      this.isDropdown = !this.isDropdown;
    },
    rotateBurger() {
      return { 'hamburger-logo-trans': this.isDropdown };
    },
  },
  computed: {
    stickyYPos() {
      return this.scrollPosition;
    },
    showHeroImage() {
      return this.$store.getters.showHeroImage;
    },

    user() {
      return this.$store.getters['user/user'];
    },
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  directives: {
    ClickOutside,
  },
  components: { navFilter },
};
</script>
