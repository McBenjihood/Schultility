<script setup lang="ts">

import {onMounted, ref} from "vue";

const props = defineProps({
  title : String
})

let email = ref("");
let pwd = ref("");

</script>

<template>
  <div class="loginDiv">
    <h3>{{props.title}}</h3>
    <input type="email" class="inputClass" placeholder="E-Mail eingeben" autocomplete="off" v-model="email">
    <input type="password" class="inputClass" placeholder="Password eingeben" autocomplete="off" v-model="pwd">
  </div>
</template>

<style scoped>
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

.loginDiv {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}
</style>