document.addEventListener("DOMContentLoaded", async (event) => {
  let profileButtonList = document.querySelectorAll(".profileButtons");
  profileButtonList = Array.from(profileButtonList);
  for (let i = 0; i < profileButtonList.length; i++) {
    let valueAttr = Number(profileButtonList[i].getAttribute("value"));
    profileButtonList[i].addEventListener("click", () => {
      setCurrentProfile(valueAttr);
    });
  }

  printDataSelectionGrid(
    await retrieveDataPeriodList(),
    await retrieveDataTheAvgGradeArray()
  );

  setCurrentProfile(3);

  const avgButton = document.getElementById("buttonPressed");
  if (avgButton) {
    avgButton.addEventListener("click", printStats);
  }

  var checkboxes = document.querySelectorAll(".switchOutput");
  let enabledSettings = [];

  checkboxes.forEach(async function (checkbox) {
    checkbox.addEventListener("change", async function () {
      
      let index = 0;

      let profileButtonList = document.querySelectorAll(".profileButtons");
      for (let i = 0; i < profileButtonList.length; i++) {
        if (profileButtonList[i].getAttribute("id") == "selectedProfile") {
          index = Number(profileButtonList[i].getAttribute("value"));
        }
      }

      let nestedArray = await getAllProfiles();
      let saveCurrentProfile = getToggledSwitches();
      nestedArray[index] = saveCurrentProfile;

      chrome.storage.local.set({ arrayNestedProfiles: nestedArray }, () => {
        console.log(
          "Content Script: Grade array has been saved to chrome.storage."
        );
      });
    });
  });
});

async function getCurrentProfile(index) {
  const result = await chrome.storage.local.get(["arrayNestedProfiles"]);
  const arrayNestedProfiles1 = result.arrayNestedProfiles || [];
  return arrayNestedProfiles1[index];
}

async function getAllProfiles() {
  const result = await chrome.storage.local.get(["arrayNestedProfiles"]);
  const arrayNestedProfiles1 = result.arrayNestedProfiles || [];
  return arrayNestedProfiles1;
}

async function setCurrentProfile(index) {
  if (index != 3) {
    let profileButtonList = document.querySelectorAll(".profileButtons");
    let prevIndex = 0;
    for (let i = 0; i < profileButtonList.length; i++) {
      if (profileButtonList[i].getAttribute("id") == "selectedProfile") {
        prevIndex = Number(profileButtonList[i].getAttribute("value"));
      }
    }
    profileButtonList[prevIndex].removeAttribute("id");
    profileButtonList[index].id = "selectedProfile";

    let nestedArray = await getAllProfiles();
    let savePrevProfile = getToggledSwitches();
    nestedArray[prevIndex] = savePrevProfile;

    chrome.storage.local.set({ arrayNestedProfiles: nestedArray }, () => {
      console.log(
        "Content Script: Grade array has been saved to chrome.storage."
      );
    });
    let currentSelectedProfile = await getCurrentProfile(index);
    if (
      currentSelectedProfile[0] == true ||
      currentSelectedProfile[0] == false
    ) {
      setToggledSwitches(currentSelectedProfile);
    } else {
      let nestedArray = [];
      for (let i = 0; i < 3; i++) {
        let trueArray = [];
        for (let i = 0; i < getToggledSwitches().length; i++) {
          trueArray.push(true);
        }
        nestedArray.push(trueArray);
      }
      console.log(nestedArray);
      chrome.storage.local.set({ arrayNestedProfiles: nestedArray }, () => {
        console.log(
          "Content Script: Grade array has been saved to chrome.storage."
        );
      });
    }
  } else {
    let currentSelectedProfile = await getCurrentProfile(0);
    if (
      currentSelectedProfile[0] == true ||
      currentSelectedProfile[0] == false
    ) {
      setToggledSwitches(currentSelectedProfile);
    }
    let nestedArray = await getAllProfiles();
    let savePrevProfile = getToggledSwitches();
    nestedArray[prevIndex] = savePrevProfile;

    chrome.storage.local.set({ arrayNestedProfiles: nestedArray }, () => {
      console.log(
        "Content Script: Grade array has been saved to chrome.storage."
      );
    });
  }
}

async function retrieveDataTheGradeArray() {
  const result = await chrome.storage.local.get(["theGradeArray"]);
  const arrayAllGradesUnrounded = result.theGradeArray || [];
  return arrayAllGradesUnrounded;
}
async function retrieveDataTheAvgGradeArray() {
  const result1 = await chrome.storage.local.get(["theAvgGradeArray"]);
  const arrayAverageGradesUnrounded = result1.theAvgGradeArray || [];
  return arrayAverageGradesUnrounded;
}
async function retrieveDataPeriodList() {
  const result2 = await chrome.storage.local.get(["periodList"]);
  const arrayAllPeriods = result2.periodList || [];
  return arrayAllPeriods;
}

function getToggledSwitches() {
  var checkedValue = document.querySelectorAll(".switchOutput");
  let boolArray = [];
  checkedValue.forEach((element) => {
    boolArray.push(element.checked);
    console.log(element.checked);
  });
  return boolArray;
}
function setToggledSwitches(boolArray) {
  var checkedValue = document.querySelectorAll(".switchOutput");
  for (let i = 0; i < boolArray.length; i++) {
    checkedValue[i].checked = boolArray[i];
  }
}

async function printStats() {
  let theAvgGradeArray = getToggledGrades(
    getToggledSwitches(),
    removeInvalidGrades(Array.from(await retrieveDataTheAvgGradeArray()))
  );
  let theAllGradeArray = await retrieveDataTheGradeArray();

  //printing average Grade from all selected grades.
  let insertOverallAverage = document.getElementById("OverallAverage");
  let tempResult = getSelectedGradesAverage(roundGrades(theAvgGradeArray));
  if (isNaN(tempResult)) {
    tempResult = 0;
  }
  insertOverallAverage.innerHTML = tempResult;

  //calculates best and worst grades using highly advanced ai powered matrix algorithms

  let insertBestGrade = document.getElementById("BestGrade");
  insertBestGrade.innerHTML = highestLowestGrade(theAllGradeArray, 0);

  let insertWorstGrade = document.getElementById("WorstGrade");
  insertWorstGrade.innerHTML = highestLowestGrade(theAllGradeArray, 1);

  //Calculating Deficitpoints
  let insertDeficitPoints = document.getElementById("DeficitPoints");
  insertDeficitPoints.innerHTML = getDeficitPoints(
    roundGrades(theAvgGradeArray)
  );

  //Calculating pluspoints
  let insertPlusPoints = document.getElementById("PlusPoints");
  insertPlusPoints.innerHTML = getPlusPoints(roundGrades(theAvgGradeArray));
}

function removeInvalidGrades(gradesArray) {
  let arrayCheck = [];
  gradesArray.forEach((element) => {
    if (element != 0) {
      arrayCheck.push(element);
    }
  });
  return arrayCheck;
}

function getToggledGrades(toggleSwitches, gradesArray) {
  let arrayCheck = [];
  for (let i = 0; i < toggleSwitches.length; i++) {
    if (toggleSwitches[i] == true) {
      arrayCheck.push(gradesArray[i]);
    }
  }
  return arrayCheck;
}

function getDeficitPoints(gradesArray) {
  let deficitPointsTotal = 0;

  gradesArray.forEach((element) => {
    if (element < 4) {
      let deficitPoint = 4 - element;
      deficitPointsTotal += deficitPoint;
    }
  });
  return deficitPointsTotal;
}

function getPlusPoints(gradesArray) {
  let deficitPointsTotal = 0;
  let plusPointsTotal = 0;

  gradesArray.forEach((element) => {
    if (element < 4) {
      let deficitPoint = 4 - element;
      deficitPointsTotal += deficitPoint;
    }
  });
  deficitPointsTotal *= 2;

  gradesArray.forEach((element) => {
    if (element >= 4) {
      let plusPoint = element - 4;
      plusPointsTotal += plusPoint;
    }
  });

  return plusPointsTotal - deficitPointsTotal;
}

function highestLowestGrade(gradesArray, toggle) {
  let highestGrade = 0;
  let lowestGrade = 6;

  if (toggle == 0) {
    for (let i = 0; i < gradesArray.length; i++) {
      if (gradesArray[i] > highestGrade) {
        highestGrade = gradesArray[i];
      }
    }

    return highestGrade;
  } else {
    for (let i = 0; i < gradesArray.length; i++) {
      if (gradesArray[i] < lowestGrade) {
        lowestGrade = gradesArray[i];
      }
    }
    return lowestGrade;
  }
}

function getSelectedGradesAverage(gradesArray) {
  let gradeCalcNumber = 0;

  gradesArray.forEach((element) => {
    gradeCalcNumber += element;
  });

  let resultCalc = gradeCalcNumber / gradesArray.length;
  resultCalc *= 1000;
  resultCalc = Math.floor(resultCalc);
  resultCalc /= 1000;
  return resultCalc;
}

function printDataSelectionGrid(arrayAllPeriods, arrayAverageGradesUnrounded) {
  let index = arrayAverageGradesUnrounded.length;
  let currentRow;
  for (let i = 0; i < index; i++) {
    if (i % 2 == 0) {
      currentRow = document.createElement("div");
      currentRow.classList.add("switchRow");
      document.getElementById("toggleSwitches").appendChild(currentRow);
    }
    if (arrayAverageGradesUnrounded[i] == 0) {
      continue;
    }

    const nodeA = document.createElement("div");
    nodeA.classList.add("layoutDiv");
    let elements1 = document.getElementsByClassName("switchRow");
    let requiredElement1 = elements1[0];
    currentRow.appendChild(nodeA);

    const nodeB = document.createElement("div");
    nodeB.classList.add("statsText");
    nodeA.appendChild(nodeB);

    const nodeC = document.createElement("p");
    nodeC.classList.add("subjectName");
    nodeC.innerHTML = arrayAllPeriods[i] + " :";

    const nodeD = document.createElement("p");
    nodeD.classList.add("InputGrade");
    nodeD.innerHTML = arrayAverageGradesUnrounded[i];

    nodeB.appendChild(nodeC);
    nodeB.appendChild(nodeD);

    const nodeE = document.createElement("label");
    nodeE.classList.add("switch");
    nodeA.appendChild(nodeE);

    const nodeF = document.createElement("input");
    nodeF.type = "checkbox";
    nodeF.classList.add("switchOutput");
    nodeE.appendChild(nodeF);

    const nodeG = document.createElement("span");
    nodeG.classList.add("sliderround");
    nodeE.appendChild(nodeG);
  }

  function isNumber(value) {
    return typeof value === "number";
  }

  if (!isNumber(arrayAverageGradesUnrounded[0])) {
    let errorDiv;
    let appendDiv;

    console.log("didnt load grades");
    appendDiv = document.getElementById("toggleSwitches");
    errorDiv = document.createElement("div");
    errorDiv.classList.add("errorDiv");
    appendDiv.appendChild(errorDiv);

    let elements1 = document.getElementsByClassName("errorDiv");
    let requiredElement1 = elements1[0];
    errorDiv = document.createElement("h1");
    errorDiv.classList.add("errorText");
    errorDiv.innerHTML = "Noten konnten leider nicht geladen werden :(";
    requiredElement1.appendChild(errorDiv);
  }
}

function removeDecimals(num) {
  return Math.trunc(num * 1000) / 1000;
}

function roundGrades(grades) {
  function roundHalf(num) {
    return Math.round(num * 2) / 2;
  }

  const finalResult = [];

  for (let i = 0; i < grades.length; i++) {
    finalResult.push(roundHalf(grades[i]));
  }
  return finalResult;
}

function getAverage(grades) {
  let countUnvavaileable = 0;
  let finalResult = 0;

  grades.forEach((element) => {
    if (element === 0) {
      countUnvavaileable++;
    }
  });
  for (let i = 0; i < grades.length; i++) {
    finalResult += grades[i];
  }

  return finalResult / (grades.length - countUnvavaileable);
}
