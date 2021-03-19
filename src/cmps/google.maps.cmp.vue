<template>
  <section class="maps">
    <GmapMap
      ref="mapRef"
      :center="{ lat: 41.8357441, lng: 23.4911892 }"
      :zoom="10"
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
  data() {
    return {
      markers: [{ position: { lat: 41.8357441, lng: 23.4911892 } }],
    };
  },
};
</script>