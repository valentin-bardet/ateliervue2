<template>
  <div class="MyEvent">
    <p>{{AuthError}}</p>
    <div v-if="!AuthError">
      <div v-if="loaded">
        <section>
          <div id="infos">
            <h1>{{event.libelle_event}}</h1>
            <!-- <p><b>Latitude :</b> {{event.lat}}</p> -->
            <!-- <p><b>Longitude:</b> {{event.long}}</p> -->
            <!-- <p><b>Id du createur:</b> {{event.createur_id}}</p> -->
            <p><i class="las la-calendar-alt"></i>{{event.date}} <b>{{event.horaire}}</b></p>
            <p><i class="las la-map-marker-alt"></i> {{event.libelle_lieu}}</p>
          </div>
          <div id="participants">
            <h2><b>Participants</b></h2>
            <div v-for="user in participants">
              <p>{{user.nom}} {{user.prenom}}</p>
            </div>
            <button @click="ouvrirInviter">Inviter plus de monde</button>
            <div v-if="inviter">
              <article v-for='noninvite in noninvites'>
                {{noninvite.prenom}} {{noninvite.nom}}<button @click='inviteSomeone(noninvite.id)'>invite</button>
              </article>

              <article v-for='invite in invites.users'>
                {{invite.prenom}} {{invite.nom}} <button>Deja invite</button>
              </article>
              <article v-for='non in refus'>
                {{non.prenom}} {{non.nom}} <button>Refusé</button>
              </article>

            </div>
          </div>
        </section>

        <Map
          style="max-width=400px"
          :lat="event.lat"
          :long="event.long"
        />
        <div class="right">
          <Conversation :id="event.id" />

        </div>
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
import Map from "@/components/map.vue";
import Conversation from "@/components/conversation.vue";
export default {
  name: "MyEvent",
  components: {
    Map,
    Conversation,
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
      inviter: false,
      users: null,
      noninvites: null,
      invites: null,
      refus: null,
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
          this.event.horaire = this.event.horaire.slice(0, -3);
          this.participants = response.data.users;
          this.loading = false;
          this.loaded = true;
        })
        .catch((error) => (this.error = error.response.data.message));
      this.invitationUsers();
    },
    ouvrirInviter() {
      this.inviter = !this.inviter;
    },
    inviteSomeone(id) {
      this.$apiWeb
        .post(`invitation/${this.id}/?token=${this.token}&id_user=${id}`)
        .then((response) => {
          this.invitationUsers();
        })
        .catch((error) => (this.error = error.response.data.message));
    },
    invitationUsers() {
      this.$apiWeb
        .get(`NeparticipePas/${this.id}/?token=` + this.token)
        .then((response) => {
          this.refus = response.data.users;
        })
        .catch((error) => (this.error = error.response.data.message));
      this.$apiWeb
        .get(`getUsersNonInvite/${this.id}/?token=` + this.token)
        .then((response) => {
          this.noninvites = response.data.users;
        })
        .catch((error) => (this.error = error.response.data.message));
      this.$apiWeb
        .get(`getUsersInviteNonRefuse/${this.id}/?token=` + this.token)
        .then((response) => {
          if (response.data !== "rien") {
            this.invites = response.data;
          } else {
            this.invites = false;
          }
        })
        .catch((error) => (this.error = error.response.data.message));
    },
  },
  created() {
    this.checkAuth();
  },
};
</script>

<style lang='scss' scoped>
.right {
  position: absolute;
  right: 0;
}
.MyEvent {
  padding: 2em;
}
section {
  display: flex;
  justify-content: center;
  #infos {
    width: 50vw;
    text-align: left;
    padding-right: 2em;
    h1 {
      font-weight: bold;
      font-size: 1.7em;
      margin-bottom: 0.6em;
    }
    i {
      font-size: 50px;
      padding-right: 0.5em;
    }
    p {
      display: flex;
      align-items: center;
      font-size: 1.4em;
      margin-bottom: 1em;
      b {
        padding-left: 1em;
      }
    }
  }
  #participants {
    width: 50vw;
  }
}
</style>
