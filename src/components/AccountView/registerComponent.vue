<script setup lang="ts">
import CredInput from "@/components/AccountView/CredInput.vue";
</script>

<template>

  <div class="registerDiv">
    <cred-input
        :title="'Register'"
    ></cred-input>
  </div>

  <div class="registerMenu">
    <router-link to="/account/login" class="routerLinkClass">Zurück zum Login</router-link>
  </div>
</template>


<style scoped>
.loginDiv {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

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