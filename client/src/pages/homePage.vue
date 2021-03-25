<template>
  <div class="home">
    <inspirtion-destionation />
    <h1 class="stays-header">Popular Stays</h1>
    <loader v-if="!topRated.stays" />
    <stay-list v-if="topRated.stays" :stayData="topRated"></stay-list>
    <category-list />
    <div class="become-host-header">
      <div class="host-header-content">
        <h1>Your world is worth sharing</h1>
        <p>Turn your extra space into your next opportunity.</p>
      </div>
      <div>
        <!-- <button class="host-header-btn">Become a host</button> -->
      </div>
    </div>
    <h1 class="stays-header">Top Rated Stays in New York</h1>
    <loader v-if="!topRatedNY.stays" />
    <stay-list v-if="topRatedNY.stays" :stayData="topRatedNY"></stay-list>
  </div>
</template>

<style lang="scss" scoped>
.home {
  max-width: 1210px;
  margin: 0 auto;
  .become-host-header {
    display: flex;
    flex-direction: column;
    padding: 50px;
    justify-content: space-between;
    color: white;
    height: 50vh;
    background-image: url("https://a0.muscache.com/im/pictures/eff28e1d-51c4-49ff-8266-68d6929ea1ec.jpg?im_w=1680");
    background-size: cover;
    max-width: 1210px;
    margin: 0 auto;
    border-radius: 15px;
    margin-bottom: 100px;
    .host-header-content {
      width: 25vw;
    }
    .host-header-btn {
      font-size: 16px !important;
      line-height: 20px !important;
      letter-spacing: normal !important;
      color: rgb(72, 72, 72) !important;
      padding: 14px 24px !important;
      border-radius: 15px;
      border: none;
      text-decoration: none;
      outline: none;
      cursor: pointer;
    }
  }
}
</style>
<script>
import locationList from "../cmps/locationList.cmp";
import inspirtionDestionation from "../cmps/inspiration-destination.cmp";
import categoryList from "../cmps/categoryList.cmp";
import stayList from "../cmps/stayList.cmp";
import loader from "../cmps/loader.cmp";
export default {
  name: "Home",
  data() {
    return {
      topRated: {},
      topRatedNY: {},
    };
  },
  created() {
    this.$store.commit({ type: "stay/setFilterBy", filterBy: null });
    this.$store.dispatch({ type: "stay/loadLocations" });
    // toprated
    this.$store
      .dispatch({
        type: "stay/fetchFiltered",
        filterBy: { rating: "rating", size: 4 },
      })
      .then(({ stays, filterBy }) => {
        this.topRated = { stays, filterBy };
        console.log(
          "🚀 ~ file: homePage.vue ~ line 80 ~ .then ~ this.topRated",
          this.topRated
        );
      });
    //top rated in NY
    this.$store
      .dispatch({
        type: "stay/fetchFiltered",
        filterBy: { rating: "rating", filterTxt: "New York", size: 4 },
      })
      .then(({ stays, filterBy }) => {
        this.topRatedNY = { stays, filterBy };
        console.log(
          "🚀 ~ file: homePage.vue ~ line 90 ~ .then ~ 		this.topRatedNY",
          this.topRatedNY
        );
      });
    // toggle hero image on
    this.$store.commit({
      type: "toggleHeroImage",
      toggleShow: true,
    });
  },
  components: {
    locationList,
    categoryList,
    stayList,
    inspirtionDestionation,
    loader,
  },
};
</script>
