<template>
  <div class="mesEventsCrees">
    <p>{{ AuthError }}</p>
    <div v-if="!AuthError">
      <h1>Yours created events</h1>
      <div v-if="loaded">
        <div v-for="event in events">
          <div class="container">
            <div id="info-container" class="notification is-white">
              <div class="columns">
                <div id="libelleC" class="column is-half">
                <router-link :to="`/Myevent/${event.id}`">
                  <p id="libelle">{{ event.libelle_event }} </p>
                </router-link>
                </div>
                <div class="column"><strong>{{event.date}}</strong> <p>{{event.horaire	}}</p></div>
              </div>
<button @click="funcDelete(conv.id, conv.label)" class="delete is-medium "></button>
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
    deleteRdv(id, label){
      this.$buefy.dialog.confirm({
        type: 'is-danger',
        cancelText: 'Annuler',
        confirmText: 'Accepter',
        message: `Supprimer la conversation <strong>${label}</strong> ?`,
        onConfirm: () => {
          this.$api.delete('channels/' + id).then(response => {
            
            this.$buefy.toast.open('Conversation supprimée')
            this.$api.get('channels').then(response => {
              this.convs = response.data
              
            })
          })
        }
      })
    },
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


<style scoped>
#libelle{
  color: #188FA7;
  text-decoration: none;
  align-items: center;
  
}
#libelleC{
  color: #188FA7;
  text-decoration: none;
 
}
#info-container {
  margin-top: 20px;
}

.notification{
  border: 1px solid #48C78E;
  border-radius: 10px;
}
</style>