<script setup lang="ts">
import router from "@/router";

async function logout() {
  try {
    await chrome.storage.local.set({ accessToken: "" });
  }
  finally {
    router.push("/");
  }
}
</script>

<template>
  <h1>Account-Management </h1>
  <button @click="logout()" class="btn">
    Log Out
  </button>
</template>

<style scoped>
.btn {
  background-color: #2c3e50;
  border: solid 2px #324F66;
  color: white;
  padding: 8px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 5px;
  cursor: pointer;
  border-radius: 12px;
  transition-duration: 0.4s;
}

.btn:hover {
  background-color: #46627f;
  border-color: #46627f;
}
</style>