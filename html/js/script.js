document.addEventListener('DOMContentLoaded', (event) => {

    const avgButton = document.getElementById('buttonPressed');
    if (avgButton) {
        avgButton.addEventListener('click', getAllGradesAverage);
    }
    
});

document.addEventListener('DOMContentLoaded', (event) => {
    async function retrieveDataTheGradeArray() {
        const result = await chrome.storage.local.get(['theGradeArray']);
        const arrayAllGradesUnrounded = result.theGradeArray || [];
        return arrayAllGradesUnrounded;
    }
    async function retrieveDataTheAvgGradeArray() {
        const result1 = await chrome.storage.local.get(['theAvgGradeArray']);
        const arrayAverageGradesUnrounded = result1.theAvgGradeArray || [];
        return arrayAverageGradesUnrounded;
    }
    async function retrieveDataPeriodList() {
        const result2 = await chrome.storage.local.get(['periodList']);
        const arrayAllPeriods = result2.periodList || [];
        return arrayAllPeriods;
    }   
     
    printDataSelectionGrid(retrieveDataTheAvgGradeArray(), retrieveDataPeriodList());
});

async function getAllGradesAverage() {
    // Importing all the scraped Array's of Data from the Schulnetz

    const result = await chrome.storage.local.get(['theGradeArray']);
    const arrayAllGradesUnrounded = result.theGradeArray || [];

    const result1 = await chrome.storage.local.get(['theAvgGradeArray']);
    const arrayAverageGradesUnrounded = result1.theAvgGradeArray || [];

    const result2 = await chrome.storage.local.get(['periodList']);
    const arrayAllPeriods = result2.periodList || [];

    let arrayBoolSwitches = [];
    for(let i = 0; i < arrayAverageGradesUnrounded.length; i++){
        let bool = true;
        arrayBoolSwitches.push(bool);
    }
}

function printDataSelectionGrid(arrayAverageGradesUnrounded, arrayAllPeriods){

    console.log(Array.from(arrayAverageGradesUnrounded)); 
    console.log(Array.from(arrayAllPeriods));

    const node = document.createElement("div");
    node.classList.add("switchRow");
    document.getElementById("toggleSwitches").appendChild(node);
    //creates first element, a div with classname switchRow

    const nodeA = document.createElement("div");
    const nodeB = document.createElement("div");
    nodeA.classList.add("layoutDiv");
    nodeB.classList.add("layoutDiv");
    let elements1 = document.getElementsByClassName('switchRow');
    let requiredElement1 = elements1[0];
    requiredElement1.appendChild(nodeA);
    requiredElement1.appendChild(nodeB);
    //adds 2 sub divs into the (current) switchRow div.

   
    const nodeC = document.createElement("div");
    const nodeD = document.createElement("div");
    nodeC.classList.add("statsText");
    nodeD.classList.add("statsText");
    let elements2 = document.getElementsByClassName('layoutDiv');
    let requiredElement2 = elements2[0];
    requiredElement2.appendChild(nodeC);
    requiredElement2 = elements2[1];
    requiredElement2.appendChild(nodeD);
    /*
    var docFragment = document.createDocumentFragment();
    docFragment.appendChild(nodeA);
    docFragment.appendChild(nodeB);
    var twoDivsHTMLCollection = docFragment.children;
    let requiredElement2 = twoDivsHTMLCollection[0];
    requiredElement2.appendChild(nodeC);
    requiredElement2.appendChild(nodeD);
    */
    
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

    grades.forEach(element => {
        if (element === 0) {
            countUnvavaileable++;
        }
    });
    for (let i = 0; i < grades.length; i++) {
        finalResult += grades[i];
    }

    return finalResult / (grades.length - countUnvavaileable);
}
