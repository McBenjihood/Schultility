<script setup lang="ts">
import {computed} from "vue";

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
</script>

<template>
  <div class="infoDisplay">
    <p>Durchschnitt :</p> <p>{{ averageGrade }}</p>
    <p>Mangelpunkte :</p> <p>{{deficitPoints}}</p>
    <p>Pluspunkte :</p> <p>{{ plusPoints }}</p>
    <p>Beste Note :</p> <p>{{ bestGrade }}</p>
    <p>Schwächste Note :</p> <p>{{ worstGrade }}</p>
  </div>
</template>

<style scoped>
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