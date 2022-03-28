<template>
<div id="app">
    <b-navbar class="is-light">
      <template #brand > 
        <b-navbar-item >
            <img
                src="https://etapes.com/app/uploads/2016/05/1464094938.png"
                alt="Coop VueJs"
            >
        </b-navbar-item>
      </template>
      <!--  -->
      <template #start v-if="$store.state.token"> 
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Home
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/MesEventsCrees' }">
          My events
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/CreateEvent' }">
          Create events
        </b-navbar-item>
      </template>

      <template #end >
        <b-navbar-item tag="div">
        <p v-if="$store.state.token">Connecté en tant que <strong>{{ $store.state.user.prenom }}</strong></p>
        </b-navbar-item>
        <b-navbar-item tag="div">
          <div class="buttons" v-if="!$store.state.token">
            <router-link to="/Register" >
            <b-button id="CreationCompte" type="is-success">Create an account</b-button>
              
            </router-link>
            <router-link to="/Login" >
                        <b-button type="is-info is-light">Login</b-button>
            </router-link>
          </div>

          <div v-else>
            <b-button type="is-danger is-light" @click="deconnexion" class="button is-primary is-black">Sign out</b-button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>

    <router-view />
  </div>
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/Mypage">Mypage</router-link> |
      <router-link to="/MesEventsCrees">Mes events crees</router-link> |
      <router-link to="/CreateEvent">CreateEvent</router-link> |
      <router-link to="/login">Login</router-link> |
      <button @click="logout">Logout</button>
      

    </div>
    <router-view/>

    
  </div> -->


  
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setReady', false)

    if (!this.$store.state.token) {
      this.seConnecter()
    } else {
      this.$api.get(`users/${this.$store.state.user.id}/signedin`)
      .then(this.demarrer)
      .catch(this.seConnecter)
    }
  },
  methods: {
    ready(){
      this.$store.commit('setReady', true);
    },
    demarrer(){
      this.$api.get('users').then(response => {
        this.$store.commit('setusers', response.data)
      })
      this.ready();
    },
    seConnecter(){
      this.$store.commit('setToken', false)
      this.$router.push('/connexion')
      this.ready();
    },
    deconnexion(){
      this.$store.state.token = null;
      this.$router.push("/login");
    }
  }
}

</script>

<style lang="scss">
#CreationCompte{
  margin-right: 30px;
}

.is-black{
  margin-right: 10px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>