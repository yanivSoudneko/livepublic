<template>
  <section class="maps">
    <GmapMap
      ref="mapRef"
      :center="{
        lat: markers[0].position.lat || lat,
        lng: markers[0].position.lng || lng,
      }"
      :zoom="markers.length > 1 ? 12 : 16"
      map-type-id="terrain"
      style="width: 97%; height: 50vh"
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
<script>
export default {
  props: {
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
    console.log({ lat: this.lat, lng: this.lng, stays: this.stays });

    if (this.stays && this.stays.length) {
      this.markers = this.stays.map((stay) => {
        const { loc } = stay;
        const latLgn = { position: { lat: loc.lat, lng: loc.lng } };
        return latLgn;
      });
    } else if (this.lat && this.lng) {
      console.log("wtf");
      this.markers = [{ position: { lat: this.lat, lng: this.lng } }];
    }
    console.log("markers", this.markers);
  },
};
</script>