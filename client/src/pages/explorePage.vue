<template>
  <div class="explore flex columns">
    <!-- filter by location -->
    <div class="filter-input pill-pad flex j-between a-center">
      <input type="text" v-model="filterTxt" @keyup.enter="setNewFilter" />
      <div class="search-svg-icon flex j-center" @click="setNewFilter">
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
      </div>
      <!-- <button @click="setNewFilter">Go</button> -->
    </div>
    <!-- filters by  -->
    <small class="head-title-visits">300+ stays</small>
    <h1 class="head-title-txt">Stays in {{ filterTxt }}</h1>
    <div class="filters flex columns">
      <div class="sub-filter-container flex a-center">
        <!-- <div class="filter pill-pad">Filter Type</div> -->

        <el-dropdown trigger="click">
          <el-button class="filter pill-pad"> Filter Type </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="flex columns">
              <el-radio v-model="type" label="Pets Allowed">Pets Allowed</el-radio>
              <el-radio v-model="type" label="Entire Homes">Entire Homes</el-radio>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click">
          <el-button class="filter pill-pad"> Filter Price </el-button>
          <el-dropdown-menu slot="dropdown" class="price-range">
            <el-dropdown-item>
              min
              <el-slider class="slider-price" v-model="priceLevels" range :min="1" :max="500" show-stops> </el-slider>
              max
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <button class="apply-filters filter pill-pad" @click="fetchByTypeAndFilter">
          Apply
        </button>
        <router-link class="filter pill-pad" style="margin-left: 15px; text-decoration: none;color:grey;" to="/"
          >Back</router-link
        >
      </div>
      <!-- <div class="sub-filter-btns flex">
				<button class="filter pill-pad">Instant Book</button>
				<button class="filter pill-pad">More Filters</button>
			</div> -->
    </div>
    <!-- locationList -->
    <loader v-if="!stayData.stays" />
    <stay-list-grid
      v-if="stayData.stays"
      :stayData="stayData"
      :isBigMap="true"
      class="stay-grid-container"
    ></stay-list-grid>
    <!-- <p v-else-if="!stayData.stays.length">No house available</p> -->
  </div>
</template>
<style lng="scss">
.head-title-visits {
  padding-left: 2px;
}
.sub-filter-btns {
  margin-top: 10px;
}
/* .el-dropdown-menu {

	min-width: 500px;
} */
.price-range {
  min-width: 300px;
}
.apply-filters {
  outline: none;
}
.el-slider__bar {
  background-color: #d4c9c9;
}
.el-slider__button {
  background-color: #ff385c;
  border: 2px solid rgb(82, 78, 78);
}
.filter:hover {
  color: unset;
}
.filter:active {
  color: unset;
}
</style>

<script>
import stayListGrid from '../cmps/stayList-grid.cmp';
import loader from '../cmps/loader.cmp';
export default {
  name: 'Explore',
  data() {
    return {
      filterTxt: '',
      type: 'Pets Allowed',
      priceLevels: [0, 500],
      price: 0,
      stayData: {},
      filterByPrice: null,
    };
  },
  methods: {
    setNewFilter() {
      this.$store
        .dispatch({
          type: 'stay/fetchFiltered',
          filterBy: { filterTxt: this.filterTxt },
        })
        .then(res => {
          this.stayData = res;
          console.log('🚀 ~ file: explorePage.vue ~ line 105 ~ .then ~ this.stayData', this.stayData);
        });
    },
    fetchByTypeAndFilter() {
      const { type, priceLevels } = this;
      console.log({ type, priceLevels });
      const invalidLocation = ['Popular Stays', 'Explore locations', 'Top Rated Stays in New York'];
      if (invalidLocation.includes(this.filterTxt)) {
        this.filterTxt = '';
      }
      this.$store
        .dispatch({
          type: 'stay/fetchFiltered',
          filterBy: {
            filterTxt: this.filterTxt,
            type,
            prices: priceLevels,
            size: 20,
          },
        })
        .then(res => {
          this.stayData = res;
          console.log('🚀 ~ file: explorePage.vue ~ line 105 ~ .then ~ this.stayData', this.stayData);
        });
    },
  },
  created() {
    this.$store.commit({
      type: 'toggleHeroImage',
      toggleShow: false,
    });
    //TODO:see about deprecating this params call
    const {
      params: { filterBy, subject },
    } = this.$route;

    if (!filterBy) {
      this.$store.dispatch({ type: 'stay/fetchFiltered', filterBy: { size: 20 } }).then(res => {
        this.stayData = res;
      });
      this.filterTxt = 'Explore locations';
      return;
    }

    this.filterTxt = subject && subject !== '' ? subject : filterBy.filterTxt;
    this.$store.dispatch({ type: 'stay/fetchFiltered', filterBy }).then(res => {
      this.stayData = res;
    });
  },
  components: {
    stayListGrid,
    loader,
  },
};
</script>
