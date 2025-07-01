function getAllGrades(){
let rawTds = document.querySelectorAll('.clean tbody tr .td_einzelpruefungen:nth-of-type(4)');
let TDArray = Array.from(rawTds);

let GradeArray = [];

for(let i = 0;i < TDArray.length; i++){
    const tdElement = TDArray[i];

    if (tdElement.childNodes.length > 0) {
        let gradeText = tdElement.childNodes[0].nodeValue;
        let gradeNumber = Number(gradeText.trim());

        if (!isNaN(gradeNumber)) {
            GradeArray.push(gradeNumber);
        } else {
            console.log(`Warnung: Konnte keine Zahl aus dem Text "${gradeText.trim()}" extrahieren.`);
        }
    }
}

console.log(GradeArray);

chrome.storage.local.set({ theGradeArray: GradeArray }, () => {
    console.log('Content Script: Grade array has been saved to chrome.storage.');
});


}

function getAllAverageGrades(){

    let rawTds = document.querySelectorAll('.div_noten tbody tr > td:nth-of-type(2)');
    let TDArray = Array.from(rawTds);

    const threeDecimalPlaceRegex = /^-?\d+\.\d{3}$/;

    let filteredTDArray = TDArray.filter(td => {
        const textContent = td.textContent.trim();
        return threeDecimalPlaceRegex.test(textContent);
    });


    var averageGradesCollection = []

    for (let i = -1; i < filteredTDArray.length; i = i + 2) {
        averageGradesCollection.push(filteredTDArray[i]);
    };
    averageGradesCollection.shift();

    let finalAvgGradesCollection = [];
    for(let i = 0; i < averageGradesCollection.length; i++){
        const tdElement = Number(averageGradesCollection[i].innerText);
        finalAvgGradesCollection.push(tdElement);
    }

    console.log(finalAvgGradesCollection);

    chrome.storage.local.set({ theAvgGradeArray: finalAvgGradesCollection}, () => {
        console.log('Content Script: Grade array has been saved to chrome.storage.');
    });
}

function getAllPeriods(){

    let rawTds = document.querySelectorAll('.div_noten tbody tr > td:nth-of-type(1) > b');
    let TDArray = Array.from(rawTds).map(b_element => b_element.innerText);

    console.log(rawTds);
    console.log(TDArray);

    let rawTdsGrades = document.querySelectorAll('.div_noten tbody tr > td:nth-of-type(2)');
    let TDArrayGrades = Array.from(rawTdsGrades);

    
    const threeDecimalPlaceRegex = /^-?\d+\.\d{3}$/;

    let filteredTDArray = TDArrayGrades.filter(td => {
        const textContent = td.textContent.trim();
        return threeDecimalPlaceRegex.test(textContent);
    });

    cons
    

}

getAllGrades();
getAllAverageGrades();
getAllPeriods();
