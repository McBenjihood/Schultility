<script setup lang="ts">
import gradeSelector from '/src/components/GradeManagement.vue';
import {computed, onMounted, ref} from "vue";
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
  console.log("AllGradesArray: " + allGradesArray.value);
  avgGradeArray.value = await retrieveDataTheAvgGradeArray();
  console.log("avgGradesArray: " + avgGradeArray.value);
  subjectArray.value = await retrieveDataSubjectList();
  console.log("subjectArray: " + subjectArray.value);

  console.log(avgGradeArray.value)
  console.log(subjectArray.value)
  removeEmptySubjects()
  console.log(avgGradeArray.value)
  console.log(subjectArray.value)

  avgGradeArray.value = roundArray(avgGradeArray.value);

})

 let averageGrade = computed(() => {
   return 0;
 });
 let deficitPoints = computed(() => {
   return 0;
 });
 let plusPoints = computed(() => {
   return 0;
 });
 let bestGrade = computed(() => {
   return 0;
 });
 let worstGrade = computed(() => {
   return 0;
 });

function removeEmptySubjects() {
   avgGradeArray.value.forEach((element: number, index: number) => {
     if(element == 0){
       avgGradeArray.value.splice(index, 1);
       subjectArray.value.splice(index, 1);
     }
   })
 }
function removeEmptyGrades(){
  return 0;
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
    <div class="infoDisplay">
        <p>Durchschnitt :</p> <p>{{ averageGrade }}</p>
        <p>Mangelpunkte :</p> <p>{{deficitPoints}}</p>
        <p>Pluspunkte :</p> <p>{{ plusPoints }}</p>
        <p>Beste Note :</p> <p>{{ bestGrade }}</p>
        <p>Schwächste Note :</p> <p>{{ worstGrade }}</p>
    </div>
    <div class="GradeSelectClass">
      <grade-selector></grade-selector>
    </div>
  </div>
</template>

<style scoped>
.infoDisplay, .GradeSelectClass {
  font-size: 0.9em;
  border: darkslategray 2px solid;
  border-radius: 15px;
  margin: 0;
  margin-bottom: 0.5em;
  padding: 10px;
}
.home{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.infoDisplay {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1em;
}
.infoDisplay p{
  margin: 0;
  padding: 0;
  white-space: nowrap;
}
</style>
