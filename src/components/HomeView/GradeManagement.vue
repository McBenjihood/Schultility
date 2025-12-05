<script setup lang="ts">
import SubjectToggle from "@/components/HomeView/SubjectToggle.vue";
import {ref, toRaw, watch} from "vue";
//Array containing all existing Profiles.
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

const emit = defineEmits(['emitToggles', 'emitID'])

//Interface for the Object Array that gets passed as Props to define types for values.
interface SelectedSubjects {
  ProfileID: number,
  SubjectIndex: number
}
interface ObjectArray {
  index: number,
  subject: string,
  avg: number,
  grades: number[]
}
//Defining Props for this Component
const props = defineProps<{
  DataArray: ObjectArray[],
  ConfigArray: SelectedSubjects[]
}>()

//Value representing currently selected Profile.
let selectedProfileID = ref(0);

//Array that the ProfileConfigArray that gets pulled from storage gets saved into.
let ProfileConfigArray = ref<SelectedSubjects[]>([])

watch(() => props.ConfigArray, (loadedConfig) => {
  ProfileConfigArray.value = loadedConfig;
}, { deep: true });

function checkIndexValue(array: object[], index: number){
  const obj = {
    ProfileID: selectedProfileID.value,
    SubjectIndex: index
  }
  return array.findIndex((object) => object.ProfileID == obj.ProfileID && object.SubjectIndex == obj.SubjectIndex)
}

//Function that sets the selected Profile to the Profile corresponding to the Button the user pressed.
function changeProfile(profileID: number){
  selectedProfileID.value = profileID;
  emitID();
}

//Function to toggle Subject on or off when pressing the Switch. Further Detail on functionality below.
function toggleSubject(index: number){
  const checkIndex = checkIndexValue(ProfileConfigArray.value, index);
  if(checkIndex != -1){
    //Entry already exists and will be toggled now / deleted from this array
    ProfileConfigArray.value.splice(checkIndex, 1)
  }else {
    //Entry doesnt exist, and will be saved to browser Storage
    ProfileConfigArray.value.push({
      ProfileID: selectedProfileID.value,
      SubjectIndex: index
    });
  }

  //Uses imported toRaw Function to save the original data of a Vue created Proxy-Object-thingy.
  const rawConfigArray = toRaw(ProfileConfigArray.value);
  chrome.storage.local.set({ ProfileConfigArray_BROWSER_STORAGE: rawConfigArray }, () => {
    emitToggles();
  });
}


function emitToggles(){
  emit("emitToggles", ProfileConfigArray.value); // -> Emit the toggled Profiles so the stats can be calculated correctly with only selected grades counting.
}

function emitID(){
  emit("emitID", selectedProfileID.value); // -> Emit the activeProfileID so the stats can be calculated correctly with only selected grades counting.
}



function getSelected(index: number){
 const checkIndex = checkIndexValue(ProfileConfigArray.value, index);
 if(checkIndex != -1){
   return true;
 }else{
   return false;
 }
}
</script>

<template>
  <div class="profileSelector">
    <button
        v-for="item in profilesArray"
        :key="item.id"
        @click="changeProfile(item.id)"
        class="selectButton"
        v-bind:class="{active : item.id == selectedProfileID}"
    >{{item.text}}</button>
  </div>
  <hr>
  <subject-toggle
      v-for="item in DataArray"
      :profileID="selectedProfileID"
      :key=item.index
      :index = item.index
      :grade = item.avg
      :selected = getSelected(item.index)
      :subject-name = item.subject
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
  background-color: #46627f;
}

.active{
  background-color: #20203b;
}
</style>