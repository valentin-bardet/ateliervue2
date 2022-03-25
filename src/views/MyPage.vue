<template>
  <div class="mypage">
    <h1>This is The Page</h1>
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
      this.axios
        .get(
          "http://api.reunionou.app:19180/myPage/?token=4c252d21a886af0c69ca6180f5dcb7994d297a39d70c8b9940879b3a45b3257a"
        )
        .then((response) => {
          console.log(response.data);
        });
    },
  },
  created() {
    this.load();
  },
};
</script>
