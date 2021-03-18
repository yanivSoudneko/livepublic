<template>
  <div class="category-list">
    <h1 class="category-header">Live anywhere</h1>
    <!-- <div class="categories "> -->
    <div class="category">
      <img
        src="https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=480"
        alt="entire homes"
      />
      <p>Entire Homes</p>
    </div>
    <div class="category">
      <img
        src="https://a0.muscache.com/im/pictures/36f53e61-db8d-403c-9122-5b761c0e4264.jpg?im_w=480"
        alt="Unique stays"
      />
      <p>Unique stays</p>
    </div>
    <div class="category">
      <img
        src="https://a0.muscache.com/im/pictures/a596c528-a2e9-4417-9bbe-ceb68b2f6b9c.jpg?im_w=480"
        alt="Cabins and cottages"
      />
      <p>Cabins and cottages</p>
    </div>
    <div class="category">
      <img
        src="https://a0.muscache.com/im/pictures/10a638e1-6aff-4313-8033-1275cec83987.jpg?im_w=480"
        alt="Pets Allowed"
      />
      <p>Pets Allowed</p>
    </div>
  </div>
  <!-- </div> -->
</template>

<style lang="scss">
.category-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 0px 0px;
  grid-template-areas:
    "header header header header"
    ". . . .";
  margin: 0 auto;
  max-width: 1210px;
  margin-bottom: 100px;

  .category-header {
    grid-area: header;
    // padding-left: 36px;
  }
  .category {
    margin: 0 auto;
    img {
      width: 270px;
      height: 300px;
      border-radius: 10px;
    }
  }
}
</style>

<script>
export default { name: "Category-List" };
</script>