<script setup lang="ts">
</script>

<template>
  <div class="home">
    <div class="titleElement">
      <h1>Schultility</h1>
    </div>
    <nav class="menu">
      <router-link to="/" class="routerLinkClass">Home</router-link>
      <p>|</p>
      <router-link to="/about" class="routerLinkClass">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style scoped>
.titleElement {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0;
  margin: 0;
}

.titleElement h1 {
  padding: 0;
  margin: 0;
}

.home {
  padding: 1em;
  margin: 0;
  color: white;
  font-family: sans-serif;
  background-color: rgb(12, 12, 22);
  display: flex;
  flex-direction: column;
}

.menu {
  display: flex;
  align-items: baseline;
  justify-content: center;
}
.menu, .menu p, .menu routerLinkClass{
  margin: 0;
  padding: 0;
}

.routerLinkClass {
  color: white;
}
</style>