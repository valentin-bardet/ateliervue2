<template>
  <div class="userProfil">
    <p>{{ AuthError }}</p>
    <div v-if="!AuthError">
      <div>
        <img
          id="avatar"
          :src="
            `https://eu.ui-avatars.com/api/background=random&background=random&rounded=true&name=` +
            $store.state.user.prenom
          "
          alt="Avatar"
        />
      </div>

      <form
        @submit.prevent="editinfo()"
        class="columns is-multiline"
      >
        <b-field
          horizontal
          label="mail"
          class="column is-4 is-offset-4 mb-1 p-1"
        >
          <b-input type="mail" v-model="user.mail" autofocus> </b-input>
        </b-field>

        <b-field
          horizontal
          label="prenom"
          class="column is-4 is-offset-4 mb-1 p-1"
        >
          <b-input type="text" v-model="user.prenom" autofocus> </b-input>
        </b-field>

        <b-field
          horizontal
          label="nom"
          class="column is-4 is-offset-4 mb-1 p-1"
        >
          <b-input type="text" v-model="user.nom" autofocus> </b-input>

          <button id="check" class="button">
            <i class="fas fa-check" style="color: #3ec487"></i>
          </button>
        </b-field>
      </form>

      <button id="bin" class="button" @click="deleteUser()">
        <p id="Pdelete">Delete account</p>
        <i class="fa-solid fa-trash-can" style="color: red"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "userProfil",
  components: {},
  data() {
    return {
      AuthError: null,
      user: this.$store.state.user,
      token: this.$store.state.token,
      access_token: this.$store.state.access_token,
      loading: false,
      editingConv: false,
      prenom:this.$store.state.user.prenom,
      nom:this.$store.state.user.nom,
      mail:this.$store.state.user.mail,
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
          this.user = this.$store.state.user;
          this.loading = false;
        })
        .catch((error) => (this.AuthError = error.response.data.message));
    },

    lo() {
      this.$store.state.token = null;
      this.$router.push("/login");
    },

    deleteUser() {
      this.$buefy.dialog.confirm({
        type: "is-danger",
        cancelText: "Annuler",
        confirmText: "Accepter",
        message: `<strong>Delete your account ?</strong>`,
        onConfirm: () => {
          this.$apiWeb
            .delete(`userSupp/?token=` + this.token)
            .then((response) => {
              this.$store.state.token = null;
              this.$router.push("/login");
              this.$buefy.toast.open("Account delete");
              this.$apiWeb.get("channels").then((response) => {
                this.convs = response.data;
                //     this.$store.state.token = null;
                // this.$router.push("/login");
              });
            });
        },
      });
    },

    UpdateState() {
      this.$apiWeb
        .post("lastConnection/?token=" + this.token)
        .catch((error) => console.log(error.response.data.message));
    },

    editinfo() {
      if (!this.user.nom) {
        this.$buefy.toast.open("Renseigner un nom !");
      } else if (!this.user.prenom) {
        this.$buefy.toast.open("Renseigner un prenom !");
      } else if (!this.user.nom) {
        this.$buefy.toast.open("Renseigner un nom !");
      } else {
        
        if (this.user.mail == this.mail) {
          this.$apiWeb
            .post(
              `updateUser/?token=` +
                this.token +
                "&nom=" +
                this.user.nom +
                "&prenom=" +
                this.user.prenom
            )
            .then((response) => {
              this.$store.state.token = null;
              this.$router.push("/login");
              this.$store.commit("setUser", response.data);
              
              this.$buefy.toast.open("USer modif");
              
            });
        } else {
          this.$apiWeb
            .post(
              `updateUser/?token=` +
                this.token +
                "&nom=" +
                this.user.nom +
                "&mail=" +
                this.user.mail +
                "&prenom=" +
                this.user.prenom
            )
            .then((response) => {
              this.$store.state.token = null;
              this.$router.push("/login");
              this.$store.commit("setUser", response.data);
              // console.log(response.data);
              this.$buefy.toast.open("USer modif");
             
            });
        }
      }
    },
  },

  created() {
    this.checkAuth();
  },
};
</script>

<style scoped>
#Pdelete {
  margin-right: 10%;
}
#avatar {
  width: 150px;
  margin-top: 30px;
  margin-bottom: 30px;
}

#check {
  border: 1px solid #3ec487;
}
</style>
