<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="auth">
      <h1>Connectez-vous</h1>
      <div>

        <input
          type="email"
          required
          v-model="email"
        >
      </div>
      <div>

        <input
          type="password"
          required
          v-model="password"
        >
      </div>
      <div>
        <button>
          <h3>
            Valider
          </h3>
        </button>
      </div>
      <p>{{error}}</p>
      <router-link to="/register">Pas encore de compte ?</router-link>

    </form>
  </div>
</template>
<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: null,
      password: null,
      error: null,
    };
  },
  methods: {
    auth() {
      this.$apiAuth
        .get("auth", {
          auth: {
            username: this.email,
            password: this.password,
          },
        })
        .then((response) => {
          this.$store.commit("setToken", response.data.token);
          this.$store.commit("setAccess_token", response.data.access_token);
          this.$router.push("/");
          // this.error = "success to connect";
        })
        .catch((error) => {
          this.$store.commit("setToken", null),
            (this.error = error.response.data.message);
        });
    },
  },
  created() {},
};
</script>
