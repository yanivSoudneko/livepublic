<template>
  <div
    class="nav-filter"
    v-if="(viewPort <= breakPoint && isFilter) || (isFilter && viewPort > breakPoint && !(scrollPosition > 250))"
    @click="toggleFilter"
  >
    <!-- filterTxt -->
    <div class="location-search border">
      <label for="location-input">Location</label>
      <input
        type="text"
        id="location-input"
        placeholder="Where are you going?"
        v-model="filterTxt"
        ref="filterTxtInput"
        @keyup.enter="setFilters"
      />
    </div>
    <!-- dates -->
    <div class="date-filter border">
      <!-- <label>Dates</label> -->
      <div class="flex">
        <date-picker placeholder="Check In" @emitDate="setDates($event)" />
      </div>
    </div>
    <!-- guests -->
    <div class="guests border">
      <!-- <label>Guests</label> -->
      <div>{{ guestCount }} Guests</div>
      <guest-select @selectedGuests="setGuests" />
    </div>
    <div class="nav-btn border pill-pad" @click="setFilters">
      <button class="search-btn bn">Search</button>
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

<script>
import guestSelect from './guestsSelect.cmp';
import datePicker from './datepicker.cmp';
export default {
  name: 'Nav-Filter',
  props: {
    isFilter: {
      type: Boolean,
    },
    viewPort: {
      type: Number,
    },
    breakPoint: {
      type: Number,
    },
  },
  data() {
    return {
      scrollPosition: null,
      filterTxt: '',
      dates: { in: null, out: null },
      guestCount: 1,
      // isFilter: false,
    };
  },
  methods: {
    setGuests(ev) {
      this.guestCount = ev.adultAmount;
      this.guestCount = ev.kidsAmount;
    },
    toggleFilter() {
      this.isFilter = !this.isFilter;
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    setFilters() {
      const { filterTxt, dates, guestCount } = this;

      const filterBy = {
        filterTxt,
        // checkIn: dates.in,
        // checkOut: dates.out,
        guestCount,
      };
      if (filterTxt === '') {
        this.$refs.filterTxtInput.focus();
        return;
      }

      this.$store.commit({ type: 'stay/setFilterBy', filterBy });
      this.$emit('closeFilters', true);
      if (this.$route.name === 'Explore') {
        return;
      }
      this.$router.push({
        name: 'Explore',
        params: {
          filterBy,
        },
      });
    },
    setDates(ev) {
      this.dates.in = ev[0];
      this.dates.out = ev[1];
    },
  },
  computed: {
    hideEl() {
      return this.scrollPosition > 250;
    },
  },
  created() {},
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.updateScroll);
  },
  components: { datePicker, guestSelect },
};
</script>
