<template>
  <div class="conversation">
    <h1>Messages</h1>
    <img
      v-if="
        loading"
      src="../assets/loader.gif"
      alt="loading"
    >
    <div v-if="!loading">
      <div
        class="message"
        v-for="conv in conversation"
        :key="conv.message"
      >

        <h3>{{conv.user.prenom}} {{conv.user.nom}} : </h3>
        <p>{{conv.message}}</p>

      </div>
      <p>{{error}}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "conversation",
  props: {
    id: String,
  },
  data() {
    return {
      loading: true,
      conversation: [],
      error: null,
    };
  },
  methods: {
    load() {
      this.$apiWeb
        .get(`ListComments/` + this.id)
        .then((response) => {
          this.conversation = response.data;
          this.loading = false;
        })
        .catch(
          (error) => (
            (this.loading = false), (this.error = error.response.data.message)
          )
        );
    },
  },
  created: function () {
    this.load();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.conversation {
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .message {
    display: flex;
    justify-content: space-evenly;
    h3 {
      font-weight: bold;
    }
  }
}
</style>
