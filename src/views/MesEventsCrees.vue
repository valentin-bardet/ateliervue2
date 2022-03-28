<template>
  <div class="mesEventsCrees">
    <p>{{AuthError}}</p>
    <div v-if="!AuthError">
      <h1>Yours created events</h1>
      <div v-if="loaded">
        <div v-for="envent in events">
          <router-link :to="`/Myevent/${envent.id}`">{{envent.libelle_event}}</router-link>
        </div>

      </div>

      <img
        v-if="loading"
        src="../assets/loader.gif"
        alt="loading"
      >
    </div>

  </div>
</template>
<script>
export default {
  name: "MesEventsCrees",
  components: {},
  data() {
    return {
      loaded: false,
      AuthError: null,
      events: [],
      token: this.$store.state.token,
      access_token: this.$store.state.access_token,
      loading: false,
      success: false,
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
        .get("myEvents/?token=" + this.token)
        .then((response) => {
          this.events = response.data.events;
          this.loading = false;
          this.loaded = true;
        })
        .catch((error) => console.log(error.response.data.message));
    },
  },
  created() {
    this.checkAuth();
  },
};
</script>
