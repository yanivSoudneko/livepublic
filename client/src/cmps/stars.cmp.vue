<template>
  <div class="stars">
    <vue-stars
      name="stars"
      :active-color="activeColor"
      :inactive-color="inactiveColor"
      :shadow-color="shadowColor"
      :hover-color="hoverColor"
      :max="5"
      v-model="innerRating"
      :readonly="readonly"
      :char="char"
      @input="handleClick"
    ></vue-stars>
  </div>
</template>



<script>
import { VueStars } from "vue-stars";
export default {
  name: "Stars",
  props: {
    readonly: { type: Boolean },
    rating: { type: Number },
  },
  methods: {
    handleClick() {
      if (this.readonly) return;
      this.$emit("ratingChanged", this.innerRating);
    },
  },
  data() {
    return {
      activeColor: "#ffdd00",
      inactiveColor: "#999999",
      shadowColor: "#ffff00",
      hoverColor: "#dddd00",
      char: "★",
      innerRating: 1,
    };
  },
  components: { VueStars },
  created() {
    if (this.rating) {
      this.innerRating = this.rating;
    }
  },
};
</script>