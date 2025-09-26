<script setup lang="ts">
import gradeSelector from '/src/components/GradeSelect.vue';
 import {ref} from "vue";
 let averageGrade = ref(10);
 let deficitPoints = ref(9);
 let plusPoints = ref(8);
 let bestGrade = ref(7);
 let worstGrade = ref(6);
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
