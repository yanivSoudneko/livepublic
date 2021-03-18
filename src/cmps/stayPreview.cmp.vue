<template>
	<div class="stay-preview">
		<!-- <el-carousel
			:autoplay="false"
			trigger="click"
			@click.native="sendToDetails"
		> -->
		<el-carousel :autoplay="false">
			<el-carousel-item
				v-for="(img, idx) in stay.imgUrls"
				:key="idx"
				autoplay="false"
				trigger="click"
				@click.native="$router.push('stay/' + stay._id)"
			>
				<img :src="img" class="slider-image" />
			</el-carousel-item>
		</el-carousel>
		<div class="stay-details">
			<div class="ratings-data">stars/reviews link</div>
			<p class="name">{{ stay.name }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "stay-preview",
	props: {
		stay: {
			type: Object,
		},
	},
};
</script>

<style>
</style>