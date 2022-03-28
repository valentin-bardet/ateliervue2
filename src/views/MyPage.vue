<template>
  <div class="mypage">
    <p>{{AuthError}}</p>
    <div v-if="!AuthError">
      <h1>This is Your Page</h1>
      <p>Nom :{{user.nom}}</p>
      <p>Prenom :{{user.prenom}}</p>
      <p>Mail :{{user.mail}}</p>
      <img
        v-if="loading"
        src="../assets/loader.gif"
        alt="loading"
      >
    </div>

  </div>

</template>
<script>
export default {
  name: "Mypage",
  components: {},
  data() {
    return {
      AuthError: null,
      user: [],
      token: this.$store.state.token,
      access_token: this.$store.state.access_token,
      loading: false,
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
    UpdateState() {
      this.$apiWeb
        .post("lastConnection/?token=" + this.token)
        .catch((error) => console.log(error.response.data.message));
    },
  },
  created() {
    this.checkAuth();
  },
};
</script>
