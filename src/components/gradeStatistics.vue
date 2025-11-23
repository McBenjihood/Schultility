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
  Array.map((obj, index) => {
    obj.avg = temp[index];
  })
}

//Watch methods that detect when reactive props change.
watch(() => props.PropDataArray, async (newValue) =>{
  DataArray.value = newValue;
  mapRoundedGradesToArray(DataArray.value);
  console.log(DataArray.value);
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

  console.log(toRaw(DataArray.value.filter((obj, index) => {
    return ActiveToggles.some(toggle => toggle.SubjectIndex == obj.index);
  })))
  return toRaw(DataArray.value.filter((obj, index) => {
    return ActiveToggles.some(toggle => toggle.SubjectIndex == obj.index);
  }))
})

function shortenDecimal(number: number){
  return Math.floor(number * 1000) / 1000;
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
  return 0;
});
const bestGrade = computed(() => {
  return "WIP";
});
const worstGrade = computed(() => {
  return "WIP";
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