<template>
  <div class="CreateEvent">
    <p>{{AuthError}}</p>
    <div v-if="!AuthError">

      <h1>Create a new event</h1>
      <form
        @submit.prevent="newEvent"
        v-if="success"
      >
        <div>
          <label>Lattitude</label>
          <input
            type="text"
            required
            v-model="lat"
          >
        </div>
        <div>
          <label>Longitude</label>
          <input
            type="text"
            required
            v-model="long"
          >
        </div>
        <div>
          <label>Nom Event</label>
          <input
            type="text"
            required
            v-model="libelle_event"
          >
        </div>
        <div>
          <label>Nom Lieu</label>
          <input
            type="text"
            required
            v-model="libelle_lieu"
          >
        </div>
        <div>
          <label>Heure</label>
          <input
            type="time"
            required
            v-model="horaire"
          >
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            required
            v-model="date"
          >
        </div>

        <div>
          <button>
            <h3>
              Valider
            </h3>
          </button>
        </div>
        <p>{{error}}</p>

      </form>
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
  name: "CreateEvent",
  components: {},
  data() {
    return {
      success: false,
      AuthError: null,
      error: null,
      token: this.$store.state.token,
      access_token: this.$store.state.access_token,
      loading: false,
      lat: "46.702246",
      long: "7.703246",
      libelle_event: null,
      libelle_lieu: null,
      horaire: null,
      date: null,
      event: null,
    };
  },
  methods: {
    checkAuth() {
      this.$apiAuth
        .get("check", {
          headers: { Authorization: "Bearer" + this.access_token },
        })
        .then((response) => {
          this.success = true;
          this.loading = true;
          this.$store.commit("setUser", response.data);
          this.UpdateState();

          this.loading = false;
        })
        .catch((error) => (this.AuthError = error.response.data.message));
    },
    UpdateState() {
      this.$apiWeb
        .post("lastConnection/?token=" + this.token)
        .catch((error) => console.log(error.response.data.message));
    },
    newEvent() {
      this.$apiWeb
        .post("postEvent/?token=" + this.token, {
          lat: this.lat,
          long: this.long,
          libelle_event: this.libelle_event,
          libelle_lieu: this.libelle_lieu,
          horaire: this.horaire,
          date: this.date,
        })
        .then((response) => {
          this.loading = true;
          this.event = response.data;
          this.loading = false;
          this.$router.push("/Myevent/" + this.event.id);
        })
        .catch(
          (error) => (
            console.log(error.response.data.message),
            (this.error = error.response.data.message)
          )
        );
    },
  },
  created() {
    this.checkAuth();
  },
};
</script>
