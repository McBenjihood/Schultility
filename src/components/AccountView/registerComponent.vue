<script setup lang="ts">

</script>

<template>
  <div class="loginDiv">
    <h3>REGISTRIERUNG</h3>
    <input type="text" class="inputClass" placeholder="Enter E-mail address" autocomplete="off">
    <!-- <input type="password" class="inputClass"/> -->
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

.inputClass {
  padding: 5px;
  width: 200px;
  border: 2px solid darkslategray;
  border-radius: 8px;
  outline: none;
  font-size: 0.8rem;
}

.inputClass:focus {
  box-shadow: 0 0 5px darkslategray;
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