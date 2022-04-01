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
          <p id="messageText">{{conv.message}}</p>
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

          <button class="envoie button is-info is-light">
              Envoyer
          </button>
        </div>
        <p>{{errorForm}}</p>
      </form>
      <div v-if="!proprietaire">
        <button class="jeViens button is-success is-light"
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
          class="VienPas button  is-danger is-light"
        >
          
            Je ne viens pas
          
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

form{
  input{
    position: absolute;
    bottom: 5%;
    left: 25%;
    right: 25%;
    width: 50%;
    height: 9%;
  }
}

 .envoie{

    position: absolute;
    height: 9%;
    bottom: 5%;
    right: 2%;
    width: 20%;
  }

  .VienPas{
    position: absolute;
    height: 9%;
    bottom: 5%;
    left: 2%;
    width: 20%;
  }

  .jeViens{
    position: absolute;
    height: 9%;
    bottom: 17%;
    left: 2%;
    width: 20%;
  }


.scroll {
  

  max-height: 35vh;
  padding-right: 20px;
  overflow-y: scroll;
  word-wrap: break-word;

  &::-webkit-scrollbar {
    background-color: #fff;
    width: 10px;
}

/* background of the scrollbar except button or resizer */
&::-webkit-scrollbar-track {
    background-color: #fff;
}

/* scrollbar itself */
&::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 1px solid #fff;
}

/* set button(top and bottom of the scrollbar) */
&::-webkit-scrollbar-button {
    display:none;
}
  
  
}



.conversation {
    background-color: #fff;

  word-wrap: break-word;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .message {
    word-wrap: break-word;
      background-color: #fff;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #fff;
    h3 {
      font-weight: bold;
    }
    p{
word-wrap: break-word;
    }
  }
}
</style>
