<template>
  <div class="stay" v-if="stay">
    <h1>f</h1>
    {{ stay }}
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Stay',
  data() {
    return {
      stayId: null,
      stay: null,
    };
  },
  methods: {},
  // computed: {
  //   // getById(){
  //   //   this.store.getters
  //   // }
  // },
  components: {},
  created() {
    const { stayId } = this.$route.params;
    console.log('stayId', stayId);
    this.stayId = stayId;
    this.$store.dispatch({ type: 'stay/load' }).then(() => {
      this.$store.dispatch({ type: 'stay/getById', stayId }).then(stay => {
        this.stay = stay;
      });
    });
  },
};
</script>
