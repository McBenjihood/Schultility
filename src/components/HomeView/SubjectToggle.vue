<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  index: Number,
  grade: Number,
  subjectName: String,
  selected: Boolean
})
defineEmits(['toggle-Subject'])

const isInsufficient  = computed(() => {
  if(props.grade >= 4){
    return false
  }else {
    return true
  }
})
</script>

<template>
  <div class="subject">
    <p>{{subjectName}} :</p>
    <p :class="{insufficient: isInsufficient}">{{grade}}</p>
    <label class="switch">
      <input type="checkbox" class="switchOutput" :checked="selected" @click="$emit('toggle-Subject',index)">
      <span class="sliderround"></span>
    </label>
  </div>
</template>

<style scoped>
.insufficient {
  color: #FFA500;
}
.switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 24px;
  flex-shrink: 0;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.sliderround {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}

.sliderround:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked+.sliderround {
  background-color: #2196f3;
}

input:focus+.sliderround {
  box-shadow: 0 0 1px #2196f3;
}

input:checked+.sliderround:before {
  -webkit-transform: translateX(28px);
  -ms-transform: translateX(28px);
  transform: translateX(28px);
}

.subject {
  padding: 10px;
  border: darkslategray 2px solid;
  border-radius: 15px;
  margin-bottom: 0.5em;
  display: grid;
  grid-template-columns: 1fr auto auto;
  column-gap: 1em;
  align-items: center;
}
.subject p:first-of-type {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}
.subject p:nth-of-type(2) {
  margin: 0;
  white-space: nowrap;
  font-weight: bold;
}
</style>