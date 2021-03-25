<template>
  <section class="category-container">
    <h1 class="category-header">Inspiration Destionations</h1>
    <div class="category-list">
      <!-- <div class="categories "> -->
      <div class="category" @click="exploreCity('Tel Aviv')">
        <img src="@/assets/img/telAviv.jpg" alt="live anywhere" />
        <p>Tel Aviv</p>
      </div>
      <div class="category" @click="exploreCity('Tokyo')">
        <img src="@/assets/img/tokyo.jpg" alt="Unique stays" />
        <p>Tokyo</p>
      </div>
      <div class="category" @click="exploreCity('Paris')">
        <img src="@/assets/img/paris.jpg" alt="Paris" />
        <p>Paris</p>
      </div>
      <div class="category" @click="exploreCity('New York')">
        <img src="@/assets/img/newYork.jpg" alt="New York" />
        <p>New York</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.category-list {
  display: grid;
  max-width: 1210px;
  margin-bottom: 100px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: 1rem;
  .category {
    margin: 0 auto;
    cursor: pointer;
    width: 100%;
    img {
      border-radius: 10px;
      width: 100%;
      border-radius: 10px;
      object-fit: cover;
      max-width: 90%;
    }
    p {
      min-width: 10%;
    }
  }
}
</style>

<script>
export default {
  name: "Category-List",
  methods: {
    exploreCity(cityName) {
      this.$router.push({
        name: "Explore",
        params: { filterBy: { filterTxt: cityName, size: 20 } },
      });
    },
  },
};
</script>
