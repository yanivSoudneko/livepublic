<template>
	<div class="explore">
		<h1>Explore</h1>
		<stay-list />
	</div>
</template>


<script>
// @ is an alias to /src

import stayList from "../cmps/stayList.cmp";
export default {
	name: "Explore",
	components: {
		stayList,
	},
};
</script>
