document.addEventListener('DOMContentLoaded', (event) => {
    
    const avgButton = document.getElementById('buttonPressed');
    if (avgButton) {
        avgButton.addEventListener('click', getAllGradesAverage);
    }
});

async function getAllGradesAverage(){

    const result = await chrome.storage.local.get(['theGradeArray']);
    const arrayAllGradesUnrounded = result.theGradeArray || []; 
    

    const result1 = await chrome.storage.local.get(['theAvgGradeArray']);
    const arrayAverageGradesUnrounded = result1.theAvgGradeArray || [];
    console.log(arrayAverageGradesUnrounded);

    

    const overallAverageElement = document.getElementById("OverallAverage");
    const newAverage = getAverage(roundGrades(arrayAverageGradesUnrounded));
    
    overallAverageElement.innerHTML = removeDecimals(newAverage);

    
    
}

function removeDecimals(num){
    return Math.trunc(num * 1000) / 1000;
}

function roundGrades(grades){
    function roundHalf(num) {
      return Math.round(num * 2) / 2;
    }

    const finalResult = [];

    for (let i = 0; i < grades.length; i++) {
      finalResult.push(roundHalf(grades[i]));
    }
    return finalResult;
}

function getAverage(grades){
    let countUnvavaileable = 0;
    let finalResult = 0;

    grades.forEach(element => {
        if(element === 0){
            countUnvavaileable++;
        }
    });
    for(let i = 0; i < grades.length; i++){
        finalResult += grades[i];
    }

    return finalResult / (grades.length - countUnvavaileable);
}
