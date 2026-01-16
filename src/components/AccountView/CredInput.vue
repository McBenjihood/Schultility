<script setup lang="ts">

import {ref} from "vue";
import router from "@/router";


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

let responseMessage = ref("");
const url = "http://localhost:8080/api/user/";

let successfulRegister = ref(false);

async function login(username: string, password: string) {
  try {
    const response = await fetchLogin(username, password);
    responseMessage.value = "";


    if(response.message){
      successfulRegister.value = true;
      responseMessage.value = response.message;
    }else if (response.accessToken){
      await chrome.storage.local.set({ accessToken: response.accessToken });
      await chrome.storage.local.set({ tokenType: response.tokenType })

      await router.push("/");
    }
  }catch(error) {
    responseMessage.value = (error as Error).message;
  }

}

async function navLogin (){
  await router.push("/account/login");
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
    <p :class="{inactive : responseMessage.length == 0}" class="">{{responseMessage}}</p>
    <button class="registerButton" :class="{'inactive': successfulRegister}" type="submit" @click="login(username, pwd)">{{props.title}}</button>
    <button class="registerButton" :class="{'inactive': !successfulRegister}" type="submit" @click="navLogin">Continue</button>
  </div>
</template>


<style scoped>
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

.inactive{
  display: none;
}
</style>
