<template>
  <div class="nav-filter">
    <div class="location-search border">
      <label for="location-input">Location</label>
      <input
        class="bn"
        type="text"
        id="location-input"
        placeholder="Where are you going?"
      />
    </div>
    <div class="date-filter border">
      <label>dates</label>
      <div class="flex">
        <date-picker class="bn" placeholder="Check In" />
        <date-picker class="bn" placeholder="Check Out" />
      </div>
    </div>
    <div class="guests border">
      <label>Guests</label>
      <div>1 Guests</div>
    </div>
    <div class="nav-btn border">
      <button class="bn search-btn" @click="$router.push('/explore')">Search</button>
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
  </div>
</template>

<style lang="scss" scoped>
.nav-filter {
  position: fixed;
  display: flex;
  justify-content: center;
  margin-left: 150px;
  top: 100px;
  background-color: #fff;
  height: 85px;
  align-items: center;
  justify-items: center;
  width: 850px;
  padding: 5px;
  border-radius: 75px;
  .location-search {
	  display: flex;
	  flex-direction: column;
    label {
      height: 100%;
      border: none;
    }
  }
  .nav-btn{
    display: flex;
    .search-btn{
      background-color: transparent;
    }
    .search-svg-icon {
				width: 15px;
				background-color: #ff385c;
				color: white;
				padding: 10px 15px;
				border-radius: 50%;
			}
  }
  .border {
    padding: 5px;
    border-radius: 35px;
  }
  .border:hover {
    background-color: rgb(236, 232, 232);
  }
}
</style>

<script>
import datePicker from "./datepicker.cmp";
export default {
  name: "Nav-Filter",
  data() {
    return {
      scrollPosition: null,
    };
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
  components: { datePicker },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.updateScroll);
  },
};
</script>