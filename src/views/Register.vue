<template>

  <div class="login">
    
    <div id="bc" class="login box column is-half is-offset-one-quarter mt-6">
    <form @submit.prevent="submitUser" class="all">
      <h1 class="title is-4 has-text-centered">Create account</h1>
      <!--  -->
      <div class="flex">
        <p>Prenom : </p>
      <b-field class="mb-2">
        <b-input type="is-success" maxlength="30" required v-model="prenom"
        >
        </b-input>
      </b-field>
      </div>
      <!--  -->
      <div class="flex">
      <p>nom : </p>
      <b-field size="is-small"  class="mb-2">
        <b-input type="is-success" maxlength="30" required
          v-model="nom">
        </b-input>
      </b-field>
      </div>
      <!--  -->
      <div class="flex">
        <p>sexe : </p>
      <b-field  size="is-small" class="mb-2 select">
            <b-select placeholder="Sexe" required
          v-model="sexe">
                <option value="M">Homme</option>
                <option value="F">Femme</option>
            </b-select>
        </b-field>
        </div>
      <!--  -->
      <div class="flex">
        <p>mail : </p>
      <b-field  size="is-small" class="mb-2">
        <b-input maxlength="30" type="email"
          required
          v-model="mail">
        </b-input>
      </b-field>
      
        </div>
      <!--  -->
      <div class="flex">
        <p>password : </p>
      <b-field  size="is-small" class="mb-2">
        <b-input type="password" v-model="password" required> </b-input>
      </b-field>
       </div>

      <div>
        <div class="has-text-centered mt-5 mb-3">
          <button class="button" type="is-success" id="Valider">
            valid
            </button>
         
        </div>
      </div>
      <p>{{ error }}</p>
      <router-link to="/login">Login</router-link>

      
    </form>
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

<style scoped>

#Valider {
  border: 1px solid #48C78E;
  background-color: #48C78E;
  color: white;
}
#Valider:hover {
  background-color: white;
  color: black;
}

.select{
  justify-content: left;
}

.title{
  color:#48C78E;
}
p{
  width: 12%;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.flex{
  padding-left: 30px;
  display: flex;
  justify-content: center;
}
.mb-2{
  margin-left: 5%;
  width: 80%;
}
</style>