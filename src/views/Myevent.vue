<template>
  <div class="MyEvent">
    <p>{{AuthError}}</p>
    <div v-if="!AuthError">
      <div v-if="loaded">
        <section>
          <div id="infos" class="box">
            <h1 class="title is-2">{{event.libelle_event}}</h1>
            <!-- <p><b>Latitude :</b> {{event.lat}}</p> -->
            <!-- <p><b>Longitude:</b> {{event.long}}</p> -->
            <!-- <p><b>Id du createur:</b> {{event.createur_id}}</p> -->
            <p><i class="las la-calendar-alt"></i>{{event.date}} <b>{{event.horaire}}</b></p>
            <p><i class="las la-map-marker-alt"></i> {{event.libelle_lieu}}</p>
          </div>
          <div id="participants" class="box">
            <h2><b>Participants</b></h2>
            <div class="part" v-for="user in participants">
              <p>{{user.nom}} {{user.prenom}}</p>
            </div>
            <button class="button is-light" @click="ouvrirInviter">Inviter plus de monde</button>
            <div class="divInvite" v-if="inviter">
              <article class="invite" v-for='noninvite in noninvites'>
                {{noninvite.prenom}} {{noninvite.nom}} <button class="button is-light is-small" @click='inviteSomeone(noninvite.id)'>invite</button>
              </article>

              <article class="invite" v-for='invite in invites.users'>
                {{invite.prenom}} {{invite.nom}}  <button class="button is-warning is-light is-small ">Deja invite</button>
              </article>

            </div>
          </div>
        </section>
        <div id="carte">
        <Map
          :lat="event.lat"
          :long="event.long"
        />
        </div>
        <div class="right box message">
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
      this.$apiWeb
        .get(`getUsersInvite/${this.id}/?token=` + this.token)
        .then((response) => {
          this.invites = response.data;
        })
        .catch((error) => (this.error = error.response.data.message));
      this.$apiWeb
        .get(`getUsersNonInvite/${this.id}/?token=` + this.token)
        .then((response) => {
          this.noninvites = response.data.users;
        })
        .catch((error) => (this.error = error.response.data.message));
    },
    ouvrirInviter() {
      this.inviter = !this.inviter;
    },
    inviteSomeone(id) {
      this.$apiWeb
        .post(`invitation/${this.id}/?token=${this.token}&id_user=${id}`)
        .then((response) => {
          this.$apiWeb
            .get(`getUsersInvite/${this.id}/?token=` + this.token)
            .then((response) => {
              this.invites = response.data;
            })
            .catch((error) => (this.error = error.response.data.message));
          this.$apiWeb
            .get(`getUsersNonInvite/${this.id}/?token=` + this.token)
            .then((response) => {
              this.noninvites = response.data.users;
            })
            .catch((error) => (this.error = error.response.data.message));
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
#espace{
  width: 10px;
}
.part{
}

.divInvite{
  
 

  .nonInvite{
    p{
      color: wheat;
      
    }
    color: yellow;

    button{
     
    }
  }

  .invite{
    border-bottom: 1px solid rgba(0, 0, 0, 0.151);
    padding-bottom: 3px;
    margin: 10px;
    color: blue;
   
    text-align: left;
    margin-left: 16vw;
    
    width: 15vw;

    button{
      
    }
  }

  
}
#carte{
  width: 200px;
}

.message{
  height: 50vh;
  width: 45vw;
}

.right {
  position: absolute;
  right: 0;
  margin-right: 5vh;
  margin-left: 5vh;
}
.MyEvent {
  padding: 2em;
}
section {
  display: flex;
  justify-content: center;
  .box{
  height: 30vh;
}
  #infos {
    width: 50vw;
    text-align: left;
    padding-right: 2em;
        margin-right: 20px;

    
    // h1 {
    //   font-weight: bold;
    //   font-size: 1.7em;
    //   margin-bottom: 0.6em;
    // }
    i {
      font-size: 40px;
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

#participants::-webkit-scrollbar {
    background-color: #fff;
    width: 16px;
}

/* background of the scrollbar except button or resizer */
#participants::-webkit-scrollbar-track {
    background-color: #fff;
}

/* scrollbar itself */
#participants::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 4px solid #fff;
}

/* set button(top and bottom of the scrollbar) */
#participants::-webkit-scrollbar-button {
    display:none;
}

  #participants {
    width: 50vw;
    margin-left: 20px;
    overflow-y: scroll;
    scrollbar-width: thin;
    
  }


}
</style>
