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

    /*
    let filteredTDArray1 = TDArray.filter(td => {
        let textContent = td.textContent.trim();

        if(textContent.includes("--")){
            td.textContent = "0.000";
            return threeDecimalPlaceRegex.test(textContent);
        }else{
            return threeDecimalPlaceRegex.test(textContent);
        }        
    });

    
        let filteredTDArray2 = filteredTDArray1.map(td =>   {
        const textContent = td.textContent.trim();
        if(textContent.includes("--")){
            return 0;
        }else{
            return Number(textContent)
        }
    });
    */

    const filteredTDArray1 = [];

    for (const td of TDArray) {
      const textContent = td.textContent.trim();

      if (textContent.includes("--")) {
        filteredTDArray1.push(0);
        filteredTDArray1.push(0);
      } else if (threeDecimalPlaceRegex.test(textContent)) {
        filteredTDArray1.push(parseFloat(textContent));
      }
    }

    var averageGradesCollection = []

    for (let i = -1; i < filteredTDArray1.length; i = i + 2) {
        averageGradesCollection.push(filteredTDArray1[i]);
    };
    averageGradesCollection.shift();


    console.log("averageGradesCollection:");
    console.log(averageGradesCollection);

    chrome.storage.local.set({ theAvgGradeArray: averageGradesCollection}, () => {
        console.log('Content Script: Grade array has been saved to chrome.storage.');
    });
}

function getAllPeriods(){
    let rawTds = document.querySelectorAll('.div_noten tbody tr > td:nth-of-type(1) > b');
    let TDArray = Array.from(rawTds).map(b_element => b_element.innerText);

    console.log("Periods Array:");
    console.log(TDArray);


    chrome.storage.local.set({ periodList: TDArray}, () => {
        console.log('Content Script: Grade array has been saved to chrome.storage.');
    });

}

getAllGrades();
getAllAverageGrades();
getAllPeriods();
