<template>
  <section class="maps">
    <GmapMap
      ref="mapRef"
      :center="{ lat, lng }"
      :zoom="16"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
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
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="false"
        :draggable="false"
        @click="center = m.position"
      />
    </GmapMap>
  </section>
</template>
<script>
export default {
  props: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  data() {
    return {
      markers: [{ position: { lat: this.lat, lng: this.lng } }],
    };
  },
  created() {
    console.log({ lat: this.lat, lng: this.lng });
  },
};
</script>