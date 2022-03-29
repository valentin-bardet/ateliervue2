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
        <b-navbar-item tag="router-link" :to="{ path: '/userProfil' }">
        <div v-if="$store.state.token">
          <b-navbar-item id="avatarC" >
            <img
               id="avatar" :src="`https://eu.ui-avatars.com/api/background=random&background=random&rounded=true&name=` + $store.state.user.prenom +'&size=500'" alt="Avatar"/>
              
        </b-navbar-item>
          
        </div>
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
  
</template>

<script>
export default {
  methods: {
    deconnexion(){
      this.$store.state.token = null;
      this.$router.push("/login");
    }
  }
}

</script>

<style lang="scss">

#avatarC{
  
  width: 100px;
  height: 50px;
}
#avatar{
  
  width: 100%;
  height:100%;
}

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