<template>
	<el-dropdown class="guest-select" trigger="click">
		<span class="el-dropdown-link">
			Select Guests<i class="el-icon-arrow-down el-icon--right"></i>
		</span>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item>
				<div class="flex j-between a-center">
					<span>Adults</span>
					<div class="select-amount">
						<el-button icon="el-icon-plus" circle></el-button>
						<span>{{ adultAmount }}</span>
						<el-button icon="el-icon-minus" circle></el-button>
					</div>
				</div>
			</el-dropdown-item>
			<el-dropdown-item>
				<div class="flex j-between a-center">
					<span>Adults</span>
					<div class="select-amount">
						<el-button icon="el-icon-plus" circle></el-button>
						<span>{{ adultAmount }}</span>
						<el-button icon="el-icon-minus" circle></el-button>
					</div>
				</div>
			</el-dropdown-item>
		</el-dropdown-menu>
	</el-dropdown>
</template>

<style lang="scss" scoped>
.el-dropdown-link {
	cursor: pointer;
	color: #409eff;
}
.el-icon-arrow-down {
	font-size: 12px;
}
</style>

<script>
export default {
	name: "Guest-Select",
	data() {
		return { adultAmount: 0, kidsAmount: 0 };
	},
};
</script>



