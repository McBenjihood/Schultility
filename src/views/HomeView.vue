<script setup lang="ts">
import GradeManager from '/src/components/GradeManagement.vue';
import Statistics from '/src/components/Statistics.vue';
import {onMounted, ref} from "vue";
const allGradesArray = ref<number[]>([]);
const avgGradeArray = ref<number[]>([]);
const subjectArray = ref<number[]>([]);

async function retrieveDataTheGradeArray() {
  const result = await chrome.storage.local.get(["theGradeArray"]);
  return result.theGradeArray || [];
}
async function retrieveDataTheAvgGradeArray() {
  const result = await chrome.storage.local.get(["theAvgGradeArray"]);
  return result.theAvgGradeArray || [];
}
async function retrieveDataSubjectList() {
  const result = await chrome.storage.local.get(["periodList"]);
  return result.periodList || [];
}

onMounted(async () => {
  allGradesArray.value = await retrieveDataTheGradeArray();
  avgGradeArray.value = await retrieveDataTheAvgGradeArray();
  subjectArray.value = await retrieveDataSubjectList();

  prepareData()
})



 function prepareData(){
   let Array = removeEmptySubjects(subjectArray.value, avgGradeArray.value);
   let finalArray = Array.map((object,index) => {
       return {id: index, subject: object.subject, grade: object.grade}
   })
   console.log(finalArray);
   return finalArray;
 }
function removeEmptySubjects(SubjectArray: number[],GradeArray: number[]) {
  const combined = SubjectArray.map((subject, index) => {
    return { subject: subject, grade: GradeArray[index] };
  });
  return combined.filter((subject, index) => subject.grade !== 0);
}
function roundArray(array : number[]){
  array.forEach((element: number,index: number) => {
    array[index] =  Math.round(element * 2) / 2;
  })
  return array;
}
</script>

<template>
  <div class="home">
    <Statistics></Statistics>
    <div class="GradeSelectClass">
      <grade-manager></grade-manager>
    </div>
  </div>
</template>

<style scoped>

.home{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
<style>
.infoDisplay, .GradeSelectClass {
  font-size: 0.9em;
  border: darkslategray 2px solid;
  border-radius: 15px;
  margin: 0;
  margin-bottom: 0.5em;
  padding: 10px;
}
</style>
