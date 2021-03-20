<template>
  <div class="block">
    <!-- <button @click="$refs.picker.focus()">Open</button> -->
    <!-- <button @click="$refs.picker.focus()">Open</button> -->
    <div class="inputs flex" @click="$refs.picker.focus()">
      <input type="text" v-model="date1" disabled />
      <input type="text" v-model="date2" disabled />
    </div>
    <div class="picker-wrapper">
      <el-date-picker
        ref="picker"
        v-model="selectedDates"
        type="datetimerange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        popper-class="picker-custom"
        :picker-options="datePickerOptions"
        @change="emitDate"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.picker-wrapper {
  visibility: hidden;
  height: 1px;
  width: 1px;
}
.picker-custom {
  position: fixed;
  left: 500px;
  top: 180px;
}
</style>

<script>
export default {
  data() {
    return {
      selectedDates: [new Date(), new Date()],
      datePickerOptions: {
        disabledDate(date) {
          var today = new Date();
          today.setDate(today.getDate() - 1);
          return date < today;
        },
      },
    };
  },
  methods: {
    emitDate() {
      this.selectedDates = this.selectedDates.map(date => this.fixDate(date));
      this.$emit('emitDate', this.selectedDates);
    },
    fixDate(date) {
      var d = new Date(date);
      d.setDate(d.getDate());
      return d;
    },
  },
  computed: {
    date1() {
      return this.selectedDates[0].toLocaleDateString('en-US');
    },
    date2() {
      return this.selectedDates[1].toLocaleDateString('en-US');
    },
  },
  created() {
    this.$emit('emitDate', this.selectedDates);
  },
};
</script>
