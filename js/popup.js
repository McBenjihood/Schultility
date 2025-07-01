function gradeExtract() {
    let rawTds = document.querySelectorAll('.clean tbody tr .td_einzelpruefungen:nth-of-type(4)');
    let TDArray = Array.from(rawTds);

    console.log(TDArray);
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
    return GradeArray;
}

let GradeArray = gradeExtract();

for(let i = 0;i < GradeArray.length; i++){
    console.log(GradeArray[i]);
}
console.log(GradeArray.length);






