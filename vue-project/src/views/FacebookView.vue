<script setup lang="ts">
const FACEBOOK_API_URL = "https://graph.facebook.com/";
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const url = FACEBOOK_API_URL + "me?access_token=" + ACCESS_TOKEN;
const load = async () => {
  const res = await fetch(url).then(response => response.json()).catch(err => {
    console.error(err);
  });
  if (res) {
    console.log(res);
  }
}

load();

</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>aa</h2>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
