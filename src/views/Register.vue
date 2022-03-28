<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="submitUser">
      <h1>Inscrivez-vous</h1>
      <div>
        <label>Nom</label>
        <input
          type="text"
          required
          v-model="nom"
        >
      </div>
      <div>
        <label>Prenom</label>
        <input
          type="text"
          required
          v-model="prenom"
        >
      </div>
      <div>
        <label>Sexe</label>
        <select
          required
          v-model="sexe"
        >
          <option value="">
            --
          </option>
          <option value="M">
            Homme </option>
          <option value="F">
            Femme </option>
        </select>
      </div>
      <div>
        <label>Mail</label>
        <input
          type="email"
          required
          v-model="mail"
        >
      </div>
      <div>
        <label>Password</label>
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
      <img
        v-if="loading"
        src="../assets/loader.gif"
        alt="loading"
      >
      <p>{{error}}</p>

    </form>
  </div>
</template>
<script>
export default {
  name: "Register",
  components: {},
  data() {
    return {
      nom: "test",
      prenom: "null",
      sexe: "F",
      password: null,
      mail: null,
      error: null,
      loading: false,
    };
  },
  methods: {
    submitUser() {
      this.loading = true;
      this.error = null;
      this.$apiWeb
        .post(
          "register",
          {
            nom: this.nom,
            prenom: this.prenom,
            sexe: this.sexe,
            password: this.password,
            mail: this.mail,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          this.loading = false;
          this.error = null;
          this.$router.push("/login");
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.response.data.message;
        });
    },
  },
  created() {},
};
</script>
