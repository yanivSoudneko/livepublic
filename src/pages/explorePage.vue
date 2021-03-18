<template>
  <div class="explore">
    <explore-list />
    <category-list />
    <div class="become-host-header">
	<div class="host-header-content">
      <h1>Your world is worth sharing</h1>
      <p>Turn your extra space into your next opportunity.</p>
      <div >
      <button class="become-host-btn">Become a host</button>
	  </div>
      </div>
    </div>
	<stay-list />
  </div>
</template>

<style lang="scss" scoped>
.explore {
  .become-host-header {
    display: flex;
    color: white;
    height: 60vh;
    background-image: url("https://a0.muscache.com/im/pictures/eff28e1d-51c4-49ff-8266-68d6929ea1ec.jpg?im_w=1680");
    max-width: 1210px;
    margin: 0 auto;
    border-radius: 20px;
    margin-bottom: 100px;
  }
  .become-host-btn{
    cursor: pointer;
  }
  .host-header-content{
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>
<script>
import exploreList from "../cmps/exploreList.cmp";
import categoryList from "../cmps/categoryList.cmp";
import stayList from "../cmps/stayList.cmp";
export default {
	name: "Explore",
	created() {
		this.$store.dispatch({ type: "stay/load" });
	},
	components: {
		exploreList,
		categoryList,
		stayList
	},
};
</script>
