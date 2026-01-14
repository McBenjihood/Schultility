<script setup lang="ts">
//Imports
import GradeManager from '@/components/HomeView/GradeManagement.vue';
import Statistics from '@/components/HomeView/gradeStatistics.vue';
import {fetchConfigData, fetchGradeData, updateConfigData, updateGradeData} from "@/assets/js/api_functions";
import {onMounted, ref, toRaw} from "vue";
import {authStore} from "@/assets/js/auth";


//DataArray contains GradeIndex, Grade itself and the subject name.
const DataArray = ref<object[]>([])
//ConfigArray contains Objects which contain GradeIndex and profileID of Toggled Grade.
const ConfigArray = ref<object[]>([]);
//activeProfileID contains the Number corresponding to the current active Profile.
let ActiveProfileID = ref<number>(0);

//Interface
interface DataInterface {
  index: number,
  subject: string,
  avg: number,
  grades: number[]
}
interface ConfigInterface {
  ProfileID: number,
  SubjectIndex: number
}

//Functions retrieving Data from Browser storage.
async function retrieveData() {
  const result = await chrome.storage.local.get(["STORAGE_DataArray"]);
  return result.STORAGE_DataArray || [];
}

//async function retrieving ProfileConfigArray from browser.local storage. If no data was able to bhe retrieved as no data was ever saved to Browser storage, it just returns an empty array.
async function retrieveProfileConfigArray() {
  const result = await chrome.storage.local.get(["ProfileConfigArray_BROWSER_STORAGE"]);
  return result.ProfileConfigArray_BROWSER_STORAGE || [];
}

//Retrieving Data from Browser Storage and getting ToggleConfigs from Storage aswell.
onMounted(async () => {
  await authStore.initialize();
  if(authStore.isAuthenticated) {
    //Fetching Grade / Configdata from Backend
    const localDataArray = await retrieveData();
    const localConfigData = await retrieveProfileConfigArray();

    await fetchGradeData().then((array) => {
      if(array == null){
        DataArray.value = localDataArray;
      }else {
        DataArray.value = toRaw(array);
        console.log(array);
      }
    })
    await fetchConfigData().then((array) => {
      if(array == null) {
        ConfigArray.value = localConfigData;
      }else {
        ConfigArray.value = toRaw(array);
        console.log(array);
      }
      ConfigArray.value = toRaw(array);
      console.log("Fetched ConfigData");
    })

    await updateGradeData(localDataArray);
  }else{
    //Saving Array from Browser storage, to local variables.
    DataArray.value = await retrieveData();
    console.log(DataArray.value);
    //Assigning local Variables their manipulated Data, which can then be passed to other components for further use.
    ConfigArray.value = await retrieveProfileConfigArray();
    console.log(ConfigArray.value);
  }
})

//Assignes emited Values to local variables (ConfigArray, activeProfileID)
function updateToggles(arr: Array<any>) {
  ConfigArray.value = arr;
}
function updateActiveProfileID(num: number) {
  ActiveProfileID.value = num;
}
</script>

<template>
  <div class="home">
    <Statistics
        :PropConfigArray="ConfigArray"
        :PropDataArray="DataArray"
        :profileID = "ActiveProfileID"
    ></Statistics>
    <div class="GradeSelectClass">
      <grade-manager
      :DataArray="DataArray"
      :ConfigArray="ConfigArray"
      @emitToggles="updateToggles"
      @emitID="updateActiveProfileID"></grade-manager> <!-- Save emitted data into DataArray which is ref and should update values in child components hopefully -->
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
