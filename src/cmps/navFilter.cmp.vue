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
      <button class="bn" @click="$router.push('/explore')">Search</button>
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
  .border {
    padding: 5px;
    border-radius: 35px;
  }
  .border:hover {
    background-color: rgb(204, 199, 199);
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