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
				v-if="!hideBtn && this.$route.name !== 'Explore'"
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
			<!-- <nav-filter
        v-if="hideBtn && this.$route.name !== 'Explore'"
        v-click-outside="handleShowFilter"
        @closeFilters="hideBtn = false"
      ></nav-filter> -->
			<nav-filter
				v-if="scrollPosition && scrollPosition >= 0"
			></nav-filter>
			<nav-filter
				v-if="scrollPosition && scrollPosition < 200"
			></nav-filter>

			<div class="links">
				<router-link to="/explore"> Explore </router-link>
				<!-- <router-link to="/host"> Become Host </router-link> -->
				<!-- <span>Become Host</span> -->
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
		<h3 class="sub-header">Made possible by Hosts</h3>
	</header>
</template>


<script>
import ClickOutside from "vue-click-outside";
import navFilter from "../cmps/navFilter.cmp";
export default {
	name: "NavBar",
	data() {
		return {
			hideBtn: false,
			firstClick: true,
			scrollPosition: null,
			// scrollPosition: null,
		};
	},
	computed: {
		user() {
			return this.$store.getters["user/user"];
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
		handleScroll() {
			this.scrollPosition = window.scrollY;
		},
	},
	computed: {
		stickyYPos() {
			return this.scrollPosition;
		},
		showHeroImage() {
			return this.$store.getters.showHeroImage;
		},
	},
	created() {
		window.addEventListener("scroll", this.handleScroll);
	},
	destroyed() {
		window.removeEventListener("scroll", this.handleScroll);
	},
	directives: {
		ClickOutside,
	},
	components: { navFilter },
};
</script>
