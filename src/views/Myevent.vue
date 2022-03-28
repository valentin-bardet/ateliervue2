<template>
  <div class="MyEvent">
    <p>{{AuthError}}</p>
    <div v-if="!AuthError">
      <div v-if="loaded">
        <h1>This is Your Event Page</h1>
        <p><b>Nom Evenement :</b> {{event.libelle_event}}</p>
        <p><b>Nom Lieu :</b> {{event.libelle_lieu}}</p>
        <p><b>Latitude :</b> {{event.lat}}</p>
        <p><b>Longitude:</b> {{event.long}}</p>
        <p><b>Id du createur:</b> {{event.createur_id}}</p>
        <p><b>Date:</b> {{event.date}}</p>
        <p><b>Heure:</b> {{event.horaire}}</p>
        <Map
          :lat="event.lat"
          :long="event.long"
        />
      </div>

      <img
        v-if="
        loading"
        src="../assets/loader.gif"
        alt="loading"
      >
    </div>

  </div>
</template>
<script>
import Map from "../components/map.vue";
export default {
  name: "MyEvent",
  components: {
    Map,
  },
  data() {
    return {
      AuthError: null,
      id: this.$route.params.idevent,
      token: this.$store.state.token,
      access_token: this.$store.state.access_token,
      event: [],
      participants: [],
      loading: false,
      loaded: false,
    };
  },
  methods: {
    checkAuth() {
      this.$apiAuth
        .get("check", {
          headers: { Authorization: "Bearer" + this.access_token },
        })
        .then((response) => {
          this.loading = true;
          this.$store.commit("setUser", response.data);
          this.UpdateState();
          this.load();
        })
        .catch((error) => (this.AuthError = error.response.data.message));
    },
    UpdateState() {
      this.$apiWeb
        .post("lastConnection/?token=" + this.token)
        .catch((error) => console.log(error.response.data.message));
    },
    load() {
      this.$apiWeb
        .get(`myEvent/${this.id}?token=` + this.token)
        .then((response) => {
          this.event = response.data.infos[0];
          this.participants = response.data.users;
          this.loading = false;
          this.loaded = true;
        })
        .catch((error) => (this.error = error.response.data.message));
    },
  },
  created() {
    this.checkAuth();
  },
};
</script>
