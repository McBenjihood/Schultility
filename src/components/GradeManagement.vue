<script setup lang="ts">
import SubjectToggle from "@/components/SubjectToggle.vue";
import {ref} from "vue";
const profilesArray = ref([
  {
    id: 0,
    text: 'Profile 1'
  },
  {
    id: 1,
    text: 'Profile 2'
  },
  {
    id: 2,
    text: 'Profile 3'
  },
])
const props = defineProps(
    {
      dataArray: Array
    }
)
function toggleSubject(id: any){
  const index = props.dataArray.findIndex((obj) => obj.id === id)
  valueArray.value[index].selected = !valueArray.value[index].selected
}
</script>

<template>
  <div class="profileSelector">
    <button
        v-for="item in profilesArray"
        :key="item.id"
        class="selectButton"
    >{{item.text}}</button>
  </div>
  <hr>
  <subject-toggle
      v-for="item in dataArray"
      :key="item.id"
      :id = item.id
      :grade = item.grade
      :subject-name = item.subject
      :selected = item.selected
      @toggle-Subject="toggleSubject"
  ></subject-toggle>
</template>

<style scoped>
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