<template>
  <el-dropdown class="guest-select" trigger="click" :hide-on-click="false">
    <span class="el-dropdown-link">
      Select Guests<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>
        <div class="flex j-between a-center">
          <span>Adults</span>
          <div class="select-amount flex j-between a-center">
            <el-button
              :disabled="adultAmount <= 0"
              icon="el-icon-minus"
              @click="setCount('adultAmount', -1)"
              circle
            ></el-button>
            <span>{{ adultAmount }}</span>
            <el-button
              icon="el-icon-plus"
              @click="setCount('adultAmount', 1)"
              circle
            ></el-button>
          </div>
        </div>
      </el-dropdown-item>
      <el-dropdown-item>
        <div class="flex j-between a-center">
          <span>Kids</span>
          <div class="select-amount flex j-between a-center">
            <el-button
              :disabled="kidsAmount <= 0"
              icon="el-icon-minus"
              @click="setCount('kidsAmount', -1)"
              circle
            ></el-button>
            <span>{{ kidsAmount }}</span>
            <el-button
              icon="el-icon-plus"
              @click="setCount('kidsAmount', 1)"
              circle
            ></el-button>
          </div>
        </div>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.guest-select {
  .el-dropdown-link {
    cursor: pointer;
    color: #717171;
    .el-icon-arrow-down {
      font-size: 16px;
    }
  }
}
.el-dropdown-menu {
  width: 300px;
  .select-amount {
    width: 125px;
    button {
      display: flex;
      justify-content: center;
      padding: 8px 6px 8px 8px;
    }
  }
}
</style>

<script>
export default {
  name: "Guest-Select",
  data() {
    return { adultAmount: 0, kidsAmount: 0 };
  },
  methods: {
    setCount(field, diff) {
      if (this[field] <= 0 && diff === -1) return;
      this[field] += diff;
      const { adultAmount, kidsAmount } = this;
      this.$emit("selectedGuests", { adultAmount, kidsAmount });
    },
  },
};
</script>





