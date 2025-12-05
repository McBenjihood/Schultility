<script setup lang="ts">

</script>

<template>
  <div class="loginDiv">
    <input type="text" class="inputClass">
    <input type="password" class="inputClass"/>
  </div>

  <div class="registerMenu">
    <p>Noch kein Konto? </p>
    <router-link to="/account/register" class="routerLinkClass">Registriere</router-link>
    <p> dich hier.</p>
  </div>
</template>

<style scoped>
.inputClass {
  padding: 10px;
  border: 2px solid darkslategray;
  border-radius: 8px;
  outline: none;
  font-size: 1rem;
}

.inputClass:focus {
  box-shadow: 0 0 5px darkslategray;
}

.registerMenu {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.3em;
}
.registerMenu, .registerMenu p, .registerMenu .routerLinkClass {
  margin: 0;
  padding: 0;
}

.routerLinkClass {
  color: white;
}
</style>