<script setup lang="ts">
import SubjectToggle from "@/components/SubjectToggle.vue";
import {onMounted, ref} from "vue";
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

//Interface for the Object Array that gets passed as Props to define types for values.
interface ObjectArray {
  index: number,
  grade: number,
  subject: string
}
//Defining Props for this Component
defineProps<{
  DataArray: ObjectArray[],
}>()

//Value representing currently selected Profile.
let selectedProfileID = 0;

//Array that the ProfileConfigArray that gets pulled from storage gets saved into.
let ProfileConfigArray: object[] = [];

//async function retrieving ProfileConfigArray from browser.local storage. If no data was able to bhe retrieved as no data was ever saved to Browser storage, it just returns an empty array.
async function retrieveProfileConfigArray() {
  const result = await chrome.storage.local.get(["ProfileConfigArray_BROWSER_STORAGE"]);
  return result.theGradeArray || [];
}
//Loads the ProfileConfigArray Array on Mount and then assigns it to a variable.
onMounted(async () => {
  ProfileConfigArray = await retrieveProfileConfigArray();
})



//Function that sets the selected Profile to the Profile corresponding to the Button the user pressed.
function changeProfile(profileID: number){
  selectedProfileID = profileID;
}
//Function to toggle Subject on or off when pressing the Switch. Further Detail on functionality below.
function toggleSubject(index: number){
  const obj = {
    ProfileID: selectedProfileID,
    SubjectIndex: index
  }
  const checkIndex = ProfileConfigArray.findIndex((object) => object.ProfileID == obj.ProfileID && object.SubjectIndex == obj.SubjectIndex)
  if(checkIndex != -1){
    //Entry already exists and will be toggled now / deleted from this array
    console.log("Exists")
    ProfileConfigArray.splice(checkIndex, 1)
    console.log(ProfileConfigArray)
  }else {
    console.log("Doesnt Exist yet")
    //Entry doesnt exist, and will be saved to browser Storage
    ProfileConfigArray.push(obj);
    console.log(ProfileConfigArray)
  }
  chrome.storage.local.set({ ProfileConfigArray_BROWSER_STORAGE: ProfileConfigArray }, () => {
    console.log("Content Script: Grade array has been saved to browser.storage.");
  });
}
function getSelected(){

}
</script>

<template>
  <div class="profileSelector">
    <button
        v-for="item in profilesArray"
        :key="item.id"
        class="selectButton"
        @click="changeProfile(item.id)"
    >{{item.text}}</button>
  </div>
  <hr>
  <subject-toggle
      v-for="item in DataArray"
      :key=item.index
      :index = item.index
      :grade = item.grade
      :selected = getSelected()
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
  background-color: #46627f; /* Lighter Blue Gray on hover */
}
</style>