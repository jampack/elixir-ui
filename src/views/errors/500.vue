<template>
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <div></div>
        <h1>500</h1>
      </div>
      <h2>Server error</h2>
      <p>Something is wrong, lets try refreshing.</p>
      <a @click="refresh">Refresh</a>
    </div>
  </div>
</template>

<script>
export default {
  name: '404',
  methods: {
    refresh() {
      window.location.reload();
    },
  },
};
</script>

<style scoped>
</style>
