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

    let totalRoundedAverageGradeDOM = document.getElementsByClassName('.allGradesAverage b:nth-of-type(2)');
    let totalRoundedAverageGrade = 0;

    function roundHalf(num) {
        return Math.round(num*2)/2;
    }

    for(let i = 0; i < arrayAverageGradesUnrounded.length; i++){
        console.log(roundHalf(arrayAverageGradesUnrounded[i]));
    }
    
}
