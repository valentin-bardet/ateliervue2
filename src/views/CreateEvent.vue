<template>
  <div class="CreateEvent login box column is-half is-offset-one-quarter mt-6">
    <p>{{ AuthError }}</p>
    <div v-if="!AuthError">
      <h1 class="title">Create a new event</h1>
      <form
        @submit.prevent="newEvent"
        v-if="success"
      >
        <!--  -->
        <div>
          <b-field label="Nom Event :">
            <b-input
              type="text"
              required
              v-model="libelle_event"
            > </b-input>
          </b-field>
        </div>
        <!--  -->
        <div id="app-autocomplete-here">
          <label><i class="las la-map-marker-alt"></i></label>
          <input
            class="input"
            type="text"
            v-model="libelle_lieu"
            placeholder="Adress"
            v-on:keyup="onKeypressCity($event)"
            v-on:keydown="onKeypressCity($event)"
          />
          <!-- LISTING : SUGGESTIONS HERE -->
          <div
            class="autocomplete-here-suggestions-container"
            v-if="suggestionsHere.length > 0"
          >
            <ul id="listSug">
              <li v-for="suggestion in suggestionsHere">
                <span v-on:click="onClickSuggestHere(suggestion)">{{
                  suggestion.lib
                }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!--  -->
        <div>
          <label><i class="las la-clock"></i></label>
          <input
            class="input"
            type="time"
            required
            v-model="horaire"
          />
        </div>
        <!--  -->
        <div>
          <label><i class="las la-calendar-alt"></i></label>
          <input
            class="input"
            type="date"
            required
            v-model="date"
          />
        </div>
        <!--  -->

        <div>
          <button
            id="valider"
            class="button is-primary"
          >
            <h3>Valider</h3>
          </button>
        </div>
        <p>{{ error }}</p>
      </form>

      <img
        v-if="loading"
        src="../assets/loader.gif"
        alt="loading"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "CreateEvent",
  components: {},
  data() {
    return {
      // Valeur du champ 'Ville'
      suggestionsHere: [], // Tableau qui contiendra les suggestions Here
      suggestionSelected: "", // Ville & Code postal sélectionnés
      success: false,
      AuthError: null,
      error: null,
      token: this.$store.state.token,
      access_token: this.$store.state.access_token,
      loading: false,
      lat: null,
      long: null,
      libelle_event: null,
      libelle_lieu: null,
      horaire: null,
      date: null,
      event: null,
      currentFocus: -1,
      fetchTrigger: 0,
    };
  },
  methods: {
    envoi() {
      console.log("oui");
    },
    checkAuth() {
      this.$apiAuth
        .get("check", {
          headers: { Authorization: "Bearer" + this.access_token },
        })
        .then((response) => {
          this.success = true;
          this.loading = true;
          this.$store.commit("setUser", response.data);
          this.UpdateState();

          this.loading = false;
        })
        .catch((error) => (this.AuthError = error.response.data.message));
    },
    UpdateState() {
      this.$apiWeb
        .post("lastConnection/?token=" + this.token)
        .catch((error) => console.log(error.response.data.message));
    },
    newEvent() {
      this.loading = true;
      this.$apiWeb
        .post("postEvent/?token=" + this.token, {
          lat: this.lat,
          long: this.long,
          libelle_event: this.libelle_event,
          libelle_lieu: this.libelle_lieu,
          horaire: this.horaire,
          date: this.date,
        })
        .then((response) => {
          this.event = response.data;
          this.loading = false;
          this.$router.push("/Myevent/" + this.event.id);
        })
        .catch(
          (error) => (
            console.log(error.response.data.message),
            (this.error = error.response.data.message)
          )
        );
    },
    onKeypressCity(e) {
      var value = this.libelle_lieu;

      if (value != undefined && value != "") {
        // Call API Suggestions de HERE pour réécupérer les informations
        fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${value}&limit=7&autocomplete=1`
        )
          .then((result) => result.json())
          .then(
            (result) => {
              var datas = [];
              if (result.features && result.features.length > 0) {
                result.features.map(function (sug) {
                  if (
                    sug.properties.label != undefined &&
                    sug.geometry.coordinates != undefined
                  )
                    datas.push({
                      lib: sug.properties.label,
                      lat: sug.geometry.coordinates[0],
                      long: sug.geometry.coordinates[1],
                    });
                });

                this.suggestionsHere = datas;
              }
            },
            (error) => {
              console.error(error);
            }
          );
      } else {
        this.suggestionsHere = [];
      }
    },
    onClickSuggestHere(suggestion) {
      // On renseigne la ville sélectionner
      this.suggestionSelected = suggestion.lib;
      this.lat = suggestion.long;
      this.long = suggestion.lat;
      this.libelle_lieu = suggestion.lib;

      this.suggestionsHere = [];
    },
  },
  created() {
    this.checkAuth();
  },
};
</script>

<style scoped>
h1 {
  margin-top: 30px;
  margin-bottom: 30px;
}

#valider {
  background-color: #48c78e;
  margin-top: 5%;
}

#listSug {
  background-color: #e6e9f72c;
  border-radius: 0 0 10px 10px;
}

li {
  padding: 3px 0 3px 0;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.151);
}

li:hover {
  background-color: #48c78e63;
}

li:last-of-type {
  border-radius: 0 0 10px 10px;
}
</style>

