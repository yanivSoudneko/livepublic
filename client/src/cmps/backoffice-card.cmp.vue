<template>
  <div class="backoffice-card">
    <el-row>
      <el-col v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <!-- {{ stay }} -->
          <img :src="stay.imgUrls[0]" class="image" />
          <div style="padding: 14px;">
            <span>{{ stay.name }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    stay: {
      type: Object,
    },
  },
  name: 'backoffice-card',
  data() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  created() {},
};
</script>
