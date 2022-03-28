<template>
  <div id="bc" class="login box column is-half is-offset-one-quarter mt-6">
    <form @submit.prevent="auth">
      <h1 class="title is-4 has-text-centered">Login</h1>

      <b-field label="mail :">
        <b-input type="email" maxlength="30" v-model="email" required>
        </b-input>
      </b-field>

      <b-field label="Password :">
        <b-input type="password" v-model="password" required> </b-input>
      </b-field>

      <div>
        <div class="has-text-centered mt-5 mb-3">
          <button class="button" type="is-success" id="Valider">
            valid
            </button>
         
        </div>
      </div>
      <p>{{ error }}</p>
      <router-link to="/register">No account yet?</router-link>
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

<style scoped>

.title{
  color:#48C78E;
}
#Valider {
  border: 1px solid #48C78E;
  background-color: #48C78E;
  color: white;
}
#Valider:hover {
  background-color: white;
  color: black;
}
</style>
