<script setup lang="ts">

import {ref} from "vue";

const props = defineProps({
  title : String,
  endpoint: String
})

interface loginResponse {
  accessToken: string,
  tokenType: string,
  expiresIn: number,
  username: string,
}

let username = ref("");
let pwd = ref("");

let errorMessage = ref("");

const url = "http://localhost:8080/api/user/";

async function login(username: string, password: string) {
  try {
    let response : loginResponse = await fetchLogin(username, password);
    errorMessage.value = "";

    chrome.storage.local.set({ accesToken_BROWSER_STORAGE: response.accessToken }, () => {
      console.log(response.accessToken)
      console.log("JWT has been saved.");
    });

  }catch(error) {
    errorMessage.value = (error as Error).message;
  }
}

async function fetchLogin(username: string, password: string) {

    const response = await fetch(url + props.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    const resultJson = await response.json();

    if (!response.ok) {
      throw new Error(resultJson.error);
    }
    return resultJson;
}

</script>

<template>
  <div class="loginDiv">
    <h3>{{props.title}}</h3>
    <input type="email" class="inputClass" placeholder="E-Mail eingeben" autocomplete="off" v-model="username">
    <input type="password" class="inputClass" placeholder="Password eingeben" autocomplete="off" v-model="pwd">
    <p :class="{inactive : errorMessage.length == 0}" class="">{{errorMessage}}</p>
    <button class="registerButton" type="submit" @click="login(username, pwd)">{{props.title}}</button>
  </div>
</template>


<style scoped>
.inactive{
  display: none;
}


.inputClass {
  padding: 8px 12px;
  width: 200px;
  background-color: #1e2a36;
  color: #ffffff;
  border: 2px solid #324F66;
  border-radius: 8px;
  outline: none;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.inputClass::placeholder {
  color: #95a5a6;
}

.inputClass:focus {
  border-color: #46627f;
  box-shadow: 0 0 8px rgba(70, 98, 127, 0.4);
  background-color: #253341;
}

.loginDiv {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  color: white;
}

.loginDiv h3, .loginDiv p {
  padding: 0;
  margin: 0;
  font-family: sans-serif;
}

.registerButton {
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

.registerButton:hover {
  background-color: #46627f;
  border-color: #46627f;
}
</style>
