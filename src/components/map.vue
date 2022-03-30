<template>
<div class="mapContainer">
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
</div>
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
      latitude: 0,
      longitude: 0,
      markers: [
        {
          id: 1,
          imageUrl: "https://img.icons8.com/android/344/marker.png",
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
    location() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.markers = [
          {
            id: 1,
            imageUrl: "https://img.icons8.com/android/344/marker.png",
            coordinates: [this.lat, this.long],
          },
          {
            id: 2,
            imageUrl: "https://img.icons8.com/android/344/marker.png",
            coordinates: [this.latitude, this.longitude],
          },
        ];
      });
    },
  },
  created: function () {
    this.location();
  },
};
</script>

<style>
* {
  margin: 0;
}

.mapContainer{
  display: block;
  width: 20%;
}


#map {
  position: absolute;
  width: 46vw;
  height: 50vh;
  overflow: hidden;
}
</style>
