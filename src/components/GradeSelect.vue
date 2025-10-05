<script setup lang="ts">
import {ref} from "vue";

const profilesArray = ref([
  {
    id: 0,
    text: 'Profile 1',
  },
  {
    id: 1,
    text: 'Profile 2',},
  {
    id: 2,
    text: 'Profile 3',},
])

const valueArray = ref([
  {
    id: 0,
    grade: 5.5,
    subject: 'English',
    selected: false
  }
])
</script>

<template>
  <div class="profileSelector">
    <button v-for="item in profilesArray" :key="item.id" class="selectButton">{{item.text}}</button>
  </div>
  <hr>
  <div class="displaySubjects">
    <div v-for="item in valueArray" :key="item.id" class="subject">
      <p>{{item.subject}} :</p>
      <p>{{item.grade}}</p>
      <label class="switch">
        <input type="checkbox" class="switchOutput" v-model="item.selected">
        <span class="sliderround"></span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 24px;
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
.subject{
  padding: 10px;
  border: darkslategray 2px solid;
  border-radius: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0.1em;
  align-items: center;
  margin-bottom: 0.5em;
}
hr{
  border: darkslategray 1px solid;
}
.profileSelector {
  display: flex;
  justify-content: space-between;
}

.selectButton {
  background-color: #2c3e50; /* Dark Blue Gray */
  border: solid 2px #324F66;
  color: white;
  padding: 5px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  transition-duration: 0.4s;
}
.selectButton:hover {
  background-color: #46627f; /* Lighter Blue Gray on hover */
}
</style>