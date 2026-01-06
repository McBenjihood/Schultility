<script setup lang="ts">
import CredInput from "@/components/AccountView/CredInput.vue";
</script>

<template>
  <div class="loginDiv">
    <cred-input
    :title="'Login'"
    ></cred-input>
  </div>

  <div class="registerMenu">
    <p>Noch kein Konto? </p>
    <router-link to="/account/register" class="routerLinkClass">Registriere</router-link>
    <p> dich hier.</p>
  </div>
</template>

<style scoped>

.loginDiv h3{
  padding: 0;
  margin: 0;
}

.registerMenu, .registerMenu p, .registerMenu .routerLinkClass {
  margin: 0;
  padding: 0;
}

.registerMenu {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.3em;
  margin-top: 1em;
}


.routerLinkClass {
  color: white;
}
</style>