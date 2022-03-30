<template>
  <div class="conversation">

    <img
      v-if="
        loading"
      src="../assets/loader.gif"
      alt="loading"
    >
    <div
      id="load"
      v-if="!loading"
    >
      <div class="scroll">
        <div
          class="message"
          v-for="conv in conversation"
        >
          <h3>{{conv.user.prenom}} {{conv.user.nom}} : </h3>
          <p>{{conv.message}}</p>
        </div>
      </div>
      <form @submit.prevent="send">
        <div>
          <input
          class="input is-link is-small"
            type="texte"
            required
            v-model="mess"
          >

          <button class="button is-info is-light">
            <h3>
              Envoyer
            </h3>
          </button>
        </div>
        <p>{{errorForm}}</p>
      </form>
      <div v-if="!proprietaire">
        <button
          v-if="status == null || !status"
          @click="viens"
        >
          <h3>
            Je viens
          </h3>
        </button>
        <button
          v-if="status == null || status"
          @click="viensPas"
        >
          <h3>
            Je ne viens pas
          </h3>
        </button>
      </div>
      <p>{{error}}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "conversation",
  props: {
    id: String,
  },
  data() {
    return {
      loading: true,
      conversation: [],
      error: null,
      mess: null,
      errorForm: null,
      status: null,
      token: this.$store.state.token,
      proprietaire: false,
    };
  },
  methods: {
    load() {
      this.$apiWeb
        .get(`ListComments/` + this.id)
        .then((response) => {
          this.conversation = response.data;
          this.loading = false;
        })
        .catch(
          (error) => (
            (this.loading = false), (this.error = error.response.data.message)
          )
        );
      this.$apiWeb
        .get(`getRole/` + this.id + "/?token=" + this.token)
        .then((response) => {
          if (response.data.role == "proprietaire") {
            this.proprietaire = true;
          }
          if (response.data.role == "invite") {
            this.proprietaire = false;
          }
        })
        .catch(
          (error) => (
            (this.loading = false), console.log(error.response.data.message)
          )
        );
    },
    send() {
      this.$apiWeb
        .post(
          `AddComment/` +
            this.id +
            "/?token=" +
            this.token +
            "&comment=" +
            this.mess
        )
        .then((response) => {
          this.load();
          this.mess = null;
        })
        .catch((error) => (this.errorForm = error.response.data.message));
    },
    viens() {
      this.$apiWeb
        .post(`Venir/` + this.id + "/?token=" + this.token)
        .then(() => {
          this.load();
          this.status = true;
        })
        .catch((error) => console.log(error.response.data.message));
    },
    viensPas() {
      this.$apiWeb
        .post(`PasVenir/` + this.id + "/?token=" + this.token)
        .then(() => {
          this.load();
          this.status = false;
        })
        .catch((error) => console.log(error.response.data.message));
    },
    getStatus() {
      this.$apiWeb
        .get(`getStatus/` + this.id + "/?token=" + this.token)
        .then((response) => {
          if (response.data == "oui") {
            this.status = true;
          }
          if (response.data == "non") {
            this.status = false;
          }
          if (response.data == "rien") {
            this.status = null;
          }
        })
        .catch(
          (error) => (
            (this.loading = false), console.log(error.response.data.message)
          )
        );
    },
  },
  created: function () {
    this.load();
    this.getStatus();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.scroll {

  max-height: 35vh;
  padding-right: 20px;
  overflow-y: scroll;
  
  
}



.conversation {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .message {
    display: flex;
    justify-content: space-between;
    h3 {
      font-weight: bold;
    }
  }
}
</style>
