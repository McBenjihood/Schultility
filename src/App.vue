<script setup lang="ts">
</script>

<template>
  <div class="home">
    <div class="titleElement">
      <h1>Schultility</h1>
    </div>
    <nav class="menu">
      <router-link to="/" class="routerLinkClass">Home</router-link> |
      <router-link to="/about" class="routerLinkClass">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style scoped>
  .titleElement{
    padding: 0;
    margin: 0;
    text-align: center;
  }
  .titleElement h1{
    padding: 0; margin: 0;
  }
  .home{
    padding: 1em;
    margin: 0;
    color: white;
    font-family: sans-serif;
    background-color: rgb(12, 12, 22);
    display: flex;
    flex-direction: column;
  }
  .menu{
    text-align: center;
  }
  .routerLinkClass{
    color: white;
  }
</style>
