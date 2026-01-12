<script setup lang="ts">
import {checkAuth} from "./assets/js/API";
import router from "@/router";

async function handleNav(){
  if(await checkAuth()){
    console.log("/account/manage")
    await router.push("/account/manage");
  }else {
    console.log("/account/manage");
    await router.push("/account/login");
  }
}
</script>

<template>
  <div class="home">
    <div class="titleElement">
      <h1>Schultility</h1>
      <button to="/account/login" @click="handleNav" class="btn">
        <img src="/src/assets/img/account_circle.svg">
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
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
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