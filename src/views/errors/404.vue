<template>
  <div id="notfound">
    <div class="notfound">
      <div class="notfound-404">
        <div></div>
        <h1>404</h1>
      </div>
      <h2>Not found</h2>
      <p>The page you are looking for might have been
        removed had its name changed or is temporarily unavailable.</p>
      <v-btn @click="$router.push({name: 'dashboard'})" depressed>Dashboard</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'four_o_four',
};
</script>

<style scoped>
</style>
