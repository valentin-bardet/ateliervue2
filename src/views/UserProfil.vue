<template>
<div class="userProfil">
    <p>{{AuthError}}</p>
    <div v-if="!AuthError">
    <div>
        
<img
               id="avatar" :src="`https://eu.ui-avatars.com/api/background=random&background=random&rounded=true&name=` + $store.state.user.prenom" alt="Avatar"/>    </div>
    
<form @submit.prevent="editinfo(user.id, user.mail, user.prenom,user.nom)" class="columns is-multiline">

      <b-field horizontal label="mail" class="column is-4 is-offset-4 mb-1 p-1">
        <b-input type="mail" v-model="user.mail" autofocus>
        </b-input>
      </b-field>

     <b-field horizontal label="prenom" class="column is-4 is-offset-4 mb-1 p-1">
        <b-input type="text" v-model="user.prenom" autofocus>
        </b-input>
      </b-field>

      <b-field horizontal label="nom" class="column is-4 is-offset-4 mb-1 p-1">
        <b-input type="text" v-model="user.nom" autofocus>
        </b-input>

         <button id="check" class="button"><i class="fas fa-check " style="color:#3EC487"></i></button>
      </b-field>
     
    </form>

     <button id="bin" class="button" @click="deleteUser()"><p id="Pdelete">Delete account</p><i class="fa-solid fa-trash-can" style="color:red"></i></button>

     
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
      user: [],
      token: this.$store.state.token,
      access_token: this.$store.state.access_token,
      loading: false,
      editingConv: false,
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

    lo(){
        this.$store.state.token = null;
        this.$router.push("/login");
    },

      deleteUser(){
        this.$buefy.dialog.confirm({
            type: 'is-danger',
            cancelText: 'Annuler',
            confirmText: 'Accepter',
            message: `<strong>Delete your account ?</strong>`,
            onConfirm: () => {
            this.$apiWeb.delete(`userSupp/?token=` + this.token).then(response => {
                this.$store.state.token = null;
                this.$router.push("/login");
                this.$buefy.toast.open('Account delete')
                this.$apiWeb.get('channels').then(response => {
                this.convs = response.data
            //     this.$store.state.token = null;
            // this.$router.push("/login");
                
            })
            
          })
        },
            
      })
    },

    UpdateState() {
      this.$apiWeb
        .post("lastConnection/?token=" + this.token)
        .catch((error) => console.log(error.response.data.message));
    },

       editinfo(id, mail, prenom, nom){
      if (!nom) {
        this.$buefy.toast.open("Renseigner un nom !")
      } else if (!prenom) {
        this.$buefy.toast.open("Renseigner un prenom !")
      } else if (!nom) {
        this.$buefy.toast.open("Renseigner un nom !")
      } else {
        let donnees = {
          mail: mail,
          prenom: prenom,
          nom: nom,
        }
        this.$apiWeb.post(`updateUser/?token=` + this.token +'&nom='+donnees.nom +'&mail='+donnees.mail+'&prenom='+donnees.prenom).then(response => {
            this.$store.commit("setToken", response.data.user);
            this.$store.commit("setAccess_token", response.data.user);
            this.$buefy.toast.open("Conversation modifié")
            this.editingConv = false
          
        })
      }
    },
  },



  created() {
    this.checkAuth();
  },
};
</script>

<style scoped>
#Pdelete{
    margin-right: 10%;
}
#avatar {
  width: 150px;
  margin-top: 30px;
  margin-bottom: 30px;
}

#check{
    border: 1px solid #3EC487;
}
</style>
