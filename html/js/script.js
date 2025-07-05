document.addEventListener("DOMContentLoaded", (event) => {
  const avgButton = document.getElementById("buttonPressed");
  if (avgButton) {
    avgButton.addEventListener("click", printStats);
  }
});

document.addEventListener("DOMContentLoaded", async (event) => {
  let arrayBoolSwitches = [];
  for (let i = 0; i < (await retrieveDataTheAvgGradeArray().length); i++) {
    let bool = true;
    arrayBoolSwitches.push(bool);
  }

  printDataSelectionGrid(
    await retrieveDataPeriodList(),
    await retrieveDataTheAvgGradeArray()
  );

  setToggledSwitches();
});

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
  });
  return boolArray;
}

function setToggledSwitches(){
  var checkedValue = document.querySelectorAll(".switchOutput");
  let boolArray = [];
  checkedValue.forEach((element) => {
    element.checked = true;
  });
}

async function printStats() {
  //retrieving necessary data from chrome storage api
  let theAvgGradeArray = await retrieveDataTheAvgGradeArray();
  let theAllGradeArray = await retrieveDataTheGradeArray();

  //printing average Grade from all selected grades.
  let insertOverallAverage = document.getElementById("OverallAverage");
  let tempResult = getSelectedGradesAverage(getToggledSwitches(),theAvgGradeArray);
  if(isNaN(tempResult)){
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
  insertDeficitPoints.innerHTML = getDeficitPoints(roundGrades(theAvgGradeArray), getToggledSwitches());
}

function getDeficitPoints(gradesArray, toggleSwitches){
  let arrayCheck = [];


  
  gradesArray.forEach((element) => {
    if (element != 0) {
      arrayCheck.push(element);
    }
  });
  let deficitPointsTotal = 0;
  arrayCheck.forEach((element) => {
    if (element < 4) {
      let deficitPoint = 4 - element;
      deficitPointsTotal += deficitPoint;
    }
  });
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

function getSelectedGradesAverage(boolArray, gradesArray) {
  let indexCount = -1;
  let gradeCalcNumber = 0;
  let boolTrueCount = 0;
  let array = roundGrades(gradesArray);
  let arrayCheck = [];

  array.forEach((element) => {
    if (element != 0) {
      arrayCheck.push(element);
    }
  });

  boolArray.forEach((element) => {
    indexCount++;
    if (boolArray[indexCount] == true) {
      boolTrueCount++;
      gradeCalcNumber += arrayCheck[indexCount];
      arrayCheck.push(arrayCheck[indexCount]);
    }
  });
  let resultCalc = gradeCalcNumber / boolTrueCount;
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
