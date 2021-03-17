<template>
  <div class="category-list">
    <h1 class="category-header">Live anywhere</h1>
    <div class="categories flex">
      <div class="category">
        <img
          src="https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=480"
          alt="entire homes"
        />
        <p>Entire Homes</p>
      </div>
      <div class="category">
        <img
          src="https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=480"
          alt="entire homes"
        />
        <p>Entire Homes</p>
      </div>
      <div class="category">
        <img
          src="https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=480"
          alt="entire homes"
        />
        <p>Entire Homes</p>
      </div>
      <div class="category">
        <img
          src="https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=480"
          alt="entire homes"
        />
        <p>Entire Homes</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.category-list {
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 1210px;

  .category-header {
    padding-left: 36px;
  }
  .category {
    margin: 0 auto;
    img {
      width: 270px;
      height: 300px;
      border-radius: 30px;
    }
  }
}
</style>

<script>
export default { name: "Category-List" };
</script>