<template>
  <l-map
    :center="center"
    :zoom="zoom"
    id="map"
    ref="map"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
  >

    <l-tile-layer :url="url">

    </l-tile-layer>
    <restaurant
      v-for="marker in markers"
      :key="marker.id"
      :marker="marker"
    >
    </restaurant>
  </l-map>
</template>

<script>
import { LMap, LTileLayer } from "vue2-leaflet";
import Restaurant from "./restaurant";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    LMap,
    LTileLayer,
    Restaurant,
  },
  props: {
    lat: String,
    long: String,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      center: [this.lat, this.long],
      zoom: 12,
      markers: [
        {
          id: 1,
          imageUrl:
            "https://www.pngfind.com/pngs/m/671-6710560_blue-map-marker-png-transparent-png.png",
          coordinates: [this.lat, this.long],
        },
      ],
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
  },
};
</script>

<style>
* {
  margin: 0;
}
#map {
  position: absolute;
  width: 400px;
  height: 200px;
  overflow: hidden;
}
</style>
