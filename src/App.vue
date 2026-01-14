<script setup lang="ts">
import {checkAuth} from "./assets/js/api_functions";
import router from "@/router";
import {authStore} from "@/assets/js/auth";
import SettingsWheel from "@/assets/img/settings_wheel.svg";
import AccountCircle from "@/assets/img/account_circle.svg";
import RefreshIcon from "@/assets/img/refresh.svg";

async function handleNav(){
  if(authStore.isAuthenticated){
    await router.push("/account/manage");
  }else {
    await router.push("/account/login");
  }
}

function refreshPage(){
  location.reload();
}

</script>

<template>
<div class="home">
<div class="titleElement">
  <h1>Schultility</h1>
  <!-- Added 'left' class here -->
  <button @click="refreshPage" class="btn left">
    <img :src=RefreshIcon>
  </button>
  <!-- Added 'right' class here -->
  <button @click="handleNav" class="btn right">
    <img :src=" authStore.isAuthenticated ? SettingsWheel : AccountCircle" />
  </button>
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

.titleElement img{
  height: 2.5em;
  display: block;
}

.titleElement h1 {
  padding: 0;
  margin: 0;
}

.btn {
  background-color: transparent;
  border: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
}

/* New specific positions */
.btn.left {
  left: 0;
}

.btn.right {
  right: 0;
}

.btn:hover{
  cursor:pointer;
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