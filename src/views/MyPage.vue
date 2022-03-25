<template>
  <div class="mypage">
    <h1>This is Your Page</h1>
    <p>Nom :{{user.nom}}</p>
    <p>Prenom :{{user.prenom}}</p>
    <p>Mail :{{user.mail}}</p>


    <div class="buttons">
    <b-button type="is-primary">Primary</b-button>
    <button class="button is-danger">Danger</button>
  </div>
  </div>
  
</template>
<script>
export default {
  name: "Mypage",
  components: {},
  data() {
    return {
      user: null,
    };
  },
  methods: {
    load() {
      this.$apiWeb
        .get(
          "myPage/?token=4c252d21a886af0c69ca6180f5dcb7994d297a39d70c8b9940879b3a45b3257a"
        )
        .then((response) => (this.user = response["data"][0]))
        .catch((error) => console.log(error.response));
    },
  },
  created() {
    this.load();
  },
};
</script>
