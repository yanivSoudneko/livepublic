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
.inputs{
  input{
    height: 56px !important;
    width: 100% !important;
    border: none !important;
    outline: none !important;
    margin: 0px !important;
    padding: 26px 12px 10px !important;
    background-color: transparent !important;
    font-family: inherit !important;
    font-size: 14px !important;
    font-weight: inherit !important;
    line-height: 18px !important;
    appearance: none !important;
    cursor: pointer !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    color: rgb(113, 113, 113) !important;
    border: 1px solid grey !important;
    &:nth-child(1){
     border-top-left-radius: 10px;

    }
    &:nth-child(2){
     border-top-right-radius: 10px;

    }
  }
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
      // this.checkDate();
      this.selectedDates = this.selectedDates.map((date) => this.fixDate(date));
      this.$emit("emitDate", this.selectedDates);
    },
    fixDate(date) {
      var d = new Date(date);
      d.setDate(d.getDate());
      return d;
    },
    // checkDate() {
    //   console.log('this.selectedDates[0].getTime:', this.selectedDates[0].getTime());
    //   console.log('this.selectedDates[1].getTime:', this.selectedDates[1].getTime());
    //   if (this.selectedDates[0].getTime() < this.selectedDates[1].getTime()) {
    //     console.log('hi');
    //   } else {
    //     console.log('Bye');
    //   }
    // },
  },
  computed: {
    date1() {
      return this.selectedDates[0].toLocaleDateString("en-US");
    },
    date2() {
      return this.selectedDates[1].toLocaleDateString("en-US");
    },
  },
  created() {
    // this.checkDate();
    this.$emit("emitDate", this.selectedDates);
  },
};
</script>
