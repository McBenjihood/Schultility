<script setup lang="ts">
 import {ref} from "vue";
 let averageGrade = ref(10);
 let deficitPoints = ref(9);
 let plusPoints = ref(8);
 let bestGrade = ref(7);
 let worstGrade = ref(6000);
</script>

<template>
  <div class="home">
    <div class="infoDisplay">
        <p>Durchschnitt : {{ averageGrade }}</p>
        <p>Mangelpunkte : {{deficitPoints}}</p>
        <p>Pluspunkte : {{ plusPoints }}</p>
        <p>Beste Note : {{ bestGrade }}</p>
        <p>Schwächste Note : {{ worstGrade}}</p>
    </div>
  </div>
</template>

<style scoped>
.home{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.infoDisplay {
  font-size: 0.9em;
  border: darkslategray 2px solid;
  border-radius: 15px;
  margin: 0;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1em;
  box-sizing: border-box; /* This is the key fix */
}
.infoDisplay p{
  margin: 0;
  padding: 0;
  white-space: nowrap;
}
</style>
