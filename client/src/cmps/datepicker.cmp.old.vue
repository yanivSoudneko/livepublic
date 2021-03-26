<template>
  <div class="block">
    <span v-if="label !== ''" class="demonstration">{{ label }}</span>
    <el-date-picker
      v-model="selectedDate"
      type="date"
      :placeholder="placeholder"
      @change="emitDate"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      selectedDate: "",
    };
  },
  methods: {
    emitDate() {
      this.$emit("emitDate", this.selectedDate);
    },
  },
};
</script>