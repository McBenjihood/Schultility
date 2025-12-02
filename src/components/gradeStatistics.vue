<script setup lang="ts">
import {computed, watch, toRaw, ref} from "vue";

//Interfaces for props
interface ConfigInterface {
  ProfileID: number,
  SubjectIndex: number
}
interface DataInterface {
  index: number,
  subject: string,
  avg: number,
  grades: number[]
}
interface Props {
  PropConfigArray: ConfigInterface[],
  PropDataArray: DataInterface[],
  profileID: number
}
//Define Props
const props = defineProps<Props>();

//Local versions of Variables
let ConfigArray = ref<ConfigInterface[]>([])
let DataArray = ref<DataInterface[]>([])
let ProfileID = ref(0);

//Rounds Array of numbers to either full or .5
function roundArray(array : number[]){
  array.forEach((element: number,index: number) => {
    array[index] =  Math.round(element * 2) / 2;
  })
  return array;
}

//As the name implies, uses the roundArray function to round the grades and then map them back onto/into the original DataArray.
function mapRoundedGradesToArray(Array: DataInterface[]){
  let temp = roundArray(Array.map(obj => {return obj.avg}));
  Array.forEach((element, index) => {
    element.avg = temp[index];
  })
  return Array;
}

//Watch methods that detect when reactive props change.
watch(() => props.PropDataArray, async (newValue) =>{
  DataArray.value = newValue;
  DataArray.value = mapRoundedGradesToArray(DataArray.value);
});
watch(()=> props.PropConfigArray, async (newValue) =>{
  ConfigArray.value = newValue;
}, {immediate: true,deep: true});
watch(()=> props.profileID, async (newValue) =>{
  ProfileID.value = newValue;
}, {immediate: true});


const getComputableSubjects = computed(() => {
  const ActiveToggles = ConfigArray.value
      .filter(obj => toRaw(obj).ProfileID == ProfileID.value)
      .map(obj => toRaw(obj));
  return toRaw(DataArray.value.filter((obj) => {
    return ActiveToggles.some(toggle => toggle.SubjectIndex == obj.index);
  }))
})



function shortenDecimal(number: number){
  return Math.floor(number * 1000) / 1000;
}

function concatArrays(calcArray: number[][]){
  let concatArray: number[] = [];
  calcArray.forEach((grades) => {
    concatArray = concatArray.concat(grades);
  })
  return concatArray;
}

const averageGrade = computed(() => {
  const calcArray = getComputableSubjects.value.map((obj) => {return obj.avg});
  const sum = calcArray.reduce((accumulator, currentValue) =>{ return accumulator + currentValue}, 0);
  if(!isNaN(sum / calcArray.length)){
    return shortenDecimal(sum / calcArray.length);
  }else {
    return 0;
  }

});
const deficitPoints = computed(() => {
  const calcArray = getComputableSubjects.value.map((obj) => {return obj.avg});
  const sum = calcArray.reduce((accumulator, currentValue) =>{
    const deficitPoint = 4- currentValue;
    if (deficitPoint > 0) {
      return accumulator + deficitPoint;
    }else {
      return accumulator;
    }

  }, 0);
  return shortenDecimal(sum);
});
const plusPoints = computed(() => {
  const calcArray = getComputableSubjects.value.map((obj) => {return obj.avg});
  const sumDeficitPoints = calcArray.reduce((accumulator, currentValue) =>{
    const deficitPoint = 4 - currentValue;
    if (deficitPoint > 0) {
      return accumulator + deficitPoint;
    }else {
      return accumulator;
    }

  }, 0);

  const sumPlusPoints = calcArray.reduce((accumulator, currentValue) =>{
    const deficitPoint =  currentValue - 4;
    if (deficitPoint > 0) {
      return accumulator + deficitPoint;
    }else {
      return accumulator;
    }

  }, 0);

  return shortenDecimal(sumPlusPoints - sumDeficitPoints * 2);
});
const bestGrade = computed(() => {
  const calcArray = getComputableSubjects.value.map((obj) => {return obj.grades});
  let concatArray = concatArrays(calcArray);
  if (Math.max(...concatArray) > 0){
    return Math.max(...concatArray);
  }else return 0;
});
const worstGrade = computed(() => {
  const calcArray = getComputableSubjects.value.map((obj) => {return obj.grades});
  let concatArray = concatArrays(calcArray);
  if (Math.min(...concatArray) < 10){
    return Math.min(...concatArray);
  }else return 0;
});

const countInsufficientGrades = computed(() => {
  const calcArray = getComputableSubjects.value.map((obj) => {return obj.avg});
  const sum = calcArray.reduce((accumulator, currentValue) =>{
    if (currentValue < 4) {
      return accumulator + 1;
    }else {
      return accumulator;
    }

  }, 0);
  return sum;
})
</script>

<template>
  <div class="infoDisplay">
    <p>Durchschnitt :</p> <p>{{ averageGrade }}</p>
    <p>Mangelpunkte :</p> <p>{{deficitPoints}}</p>
    <p>Pluspunkte :</p> <p>{{ plusPoints }}</p>
    <p>Beste Note :</p> <p>{{ bestGrade }}</p>
    <p>Schwächste Note :</p> <p>{{ worstGrade }}</p>
    <p>Anz. Ungenügend :</p> <p>{{ countInsufficientGrades }}</p>

  </div>
</template>

<style scoped>
.infoDisplay {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.5em 2em;
  align-items: center;
}
.infoDisplay p {
  margin: 0;
  padding: 0;
  white-space: nowrap;
}
</style>