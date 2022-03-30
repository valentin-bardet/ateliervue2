<template>
  <div class="MyEvents">
    <p>{{ AuthError }}</p>
    <div v-if="!AuthError">
      <h1 class="title">Your events</h1>
      <div v-if="loaded">
        <div v-for="event in events">
          <div class="container is-vcentered">
            <div id="info-container" class="notification is-white is-vcentered">
              <div class="columns is-vcentered efefefefef">
                <div id="libelleC" class="column is-half">
                  <router-link :to="`/Event/${event.id}`" id="lien">
                    <p id="libelle" class="is-vcentered title is-5">
                      {{ event.libelle_event }} at
                      <b>{{ event.libelle_lieu }}</b>
                    </p>
                  </router-link>
                </div>

                <div id="avatar-container">
                  
                  <img
                    id="avatar"
                    :src="
                      `https://eu.ui-avatars.com/api/background=random&background=random&rounded=true&name=` +
                      event.creator.prenom
                    "
                    alt="texte a affiché si mon image ne s'affiche pas" title="texte_au_passage_de_la_souris">
                  <p id="avatar-nom"><strong>{{event.creator.prenom}} {{event.creator.nom}}</strong>
                  </p>
                </div>
                
                <div class="column">
                  <strong>{{ event.date }}</strong>
                  <p>{{ event.horaire }}</p>
                </div>

                <button
                  class="button is-danger is-light"
                  @click="viensPas(event.id)"
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- CHARGEMENT -->
      <img v-if="loading" src="../assets/loader.gif" alt="loading" />
    </div>
  </div>
</template>
<script>
export default {
  name: "MyEvents",
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
        .get("AllMyEvents/?token=" + this.token)
        .then((response) => {
          this.events = response.data.events;
          this.loading = false;
          this.loaded = true;
        })
        .catch((error) => console.log(error.response.data.message));
    },
    viens(id) {
      this.$apiWeb
        .post(`Venir/` + id + "/?token=" + this.token)
        .then((response) => {
          this.load();
          this.status = true;
        })
        .catch((error) => console.log(error.response.data.message));
    },
    viensPas(id) {
      this.$apiWeb
        .post(`PasVenir/` + id + "/?token=" + this.token)
        .then((response) => {
          this.load();
          this.status = false;
        })
        .catch((error) => console.log(error.response.data.message));
    },
  },
  created() {
    this.checkAuth();
  },
};
</script>


<style scoped lang="scss">
#avatar-container{
position: relative;

  #avatar{
  height: 100%;
  width: 100%;
}
  #avatar-nom{
    position: absolute;
   top: 30%;
   right: -70px;
    opacity: 0;
  }
  &:hover{
#avatar-nom{
  opacity: 1;
}
  } 
}

.is-danger {
  margin-right: 15px;
}
#libelle {
  color: #188fa7;
  text-decoration: none;
  align-items: center;
}
#libelleC {
  color: #188fa7;
  text-decoration: none;
}
#info-container {
  margin-top: 20px;
}

.notification {
  border: 1px solid #48c78e;
  border-radius: 10px;
}

.suppButton:hover {
  background-color: red;
}

.title {
  margin-top: 3%;
  margin-bottom: 2%;
}
#lien {
  text-decoration: none;
}
</style>