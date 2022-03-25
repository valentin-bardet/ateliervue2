<template>
  <div id="map">
  <!--In the following div the HERE Map will render-->
    <div id="mapContainer" style="height:600px;width:100%" ref="hereMap"></div>
  </div>
</template>

<script>
export default {
  name: "HereMap",
  props: {
      appId: String,
    appCode: String,
    lat: String,
    lng: String,
    width: String,
    height: String,
    location: String,
    center: Object
    // center object { lat: 40.730610, lng: -73.935242 }
  },
  data() {
    return {
      platform: null,
      apikey: "dNfkycWFuD4U1M6ytOZ4ue4fLCAAeO3eStTavI82gvM",
      lat : "48.676864",
      lng : "6.163661",
      map: {},
        platform: {},
        geocoder: {}
    };
  },
   mounted() {
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey
    });
    this.platform = platform;
    this.initializeHereMap();

    this.map = new H.Map(
        this.$refs.map,
        this.platform.createDefaultLayers().normal.map,
        {
            zoom: 10,
            center: { lng: this.lng, lat: this.lat }
        }
    );
    this.map.addObject(new H.map.Marker({lat: this.lat, lng: this.lng }));

    
  },
  created() {
    this.platform = new H.service.Platform({
        "app_id": this.appId,
        "app_code": this.appCode
    });
    this.geocoder = this.platform.getGeocodingService();
},
  methods: {
    initializeHereMap() { // rendering map

      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      var map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 10,
        center: this.center
        // center object { lat: 40.730610, lng: -73.935242 }
      });

      addEventListener("resize", () => map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // add UI
      H.ui.UI.createDefault(map, maptypes);
      // End rendering the initial map
    }
  }
  
};
</script>

<style scoped>
#map {
  width: 60vw;
  min-width: 360px;
  text-align: center;
  margin: 5% auto;
  background-color: #ccc;
}
</style>