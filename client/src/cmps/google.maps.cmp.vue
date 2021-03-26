<template>
  <section class="maps">
    <GmapMap
      :class="{ 'big-row': isBigMap }"
      ref="mapRef"
      :center="{
        lat: markers[0].position.lat || lat,
        lng: markers[0].position.lng || lng,
      }"
      :zoom="markers.length > 1 ? 12 : 16"
      map-type-id="terrain"
      style="width: 100%; height: 50vh"
      :options="{
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: true,
        scrollwheel: false,
        mapTypeControl: false,
      }"
    >
      <GmapMarker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :clickable="false"
        :draggable="false"
        @click="center = m.position"
      />
    </GmapMap>
  </section>
</template>
<style lang="scss" scoped>
.big-row {
  height: 100vh !important;
  width: 100%;
}
</style>
<script>
export default {
  props: {
    isBigMap: { type: Boolean },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    stays: { type: Array },
  },
  data() {
    return {
      markers: [],
    };
  },
  created() {
    if (this.stays && this.stays.length) {
      this.markers = this.stays.map((stay) => {
        const { loc } = stay;
        const latLgn = { position: { lat: loc.lat, lng: loc.lng } };
        return latLgn;
      });
    } else if (this.lat && this.lng) {
      this.markers = [{ position: { lat: this.lat, lng: this.lng } }];
    }
  },
};
</script>