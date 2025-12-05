function getData() {
    const AllGrades = getAllGrades();
    let AllAVGGrades = getAllAVGGrades();
    let AllPeriods = getAllPeriods();

    AllPeriods = removeEmptySubjects(AllAVGGrades, AllPeriods);
    console.log(AllPeriods);
    AllAVGGrades = removeEmptyGrades(AllAVGGrades);
    console.log(AllAVGGrades);

    const DataArray = AllGrades.map((grades, index) => {
        return {index: index,subject: AllPeriods[index], avg: AllAVGGrades[index], grades: grades};
    });

    if (DataArray.length > 0) {
        console.log("Extracted Data:");
        console.log(DataArray);
        browser.storage.local.set({ STORAGE_DataArray: DataArray }, () => {
            console.log("Content Script: Grade array has been saved to browser.storage.");
        });
    }else{
        console.log("Schultility-Extension: No Grades detected on this Site. Not saving anything");
    }
}

function getAllGrades(){
    // Extracting tbody elements from html, to later group grades together.
    let rawNodes = document.querySelectorAll(
        ".clean tbody"
    );
    let NodesArray = Array.from(rawNodes);

    const finalResult = [];
    NodesArray.forEach((parentNode) => {

        //Filtering out unneeded HTML Elements, to only get elements, containing Grade-Data
        const allChildren = Array.from(parentNode.childNodes);
        const evenNodes = allChildren.filter((_, index) => index % 2 === 0);
        const slicedNodes = evenNodes.slice(2);
        const trElements = slicedNodes.filter((node) => {
            return !node.classList.contains('last_line_top_pruefungsgruppe');
        });

        //Extracting Grade-Data from remaining HTML Elements and saving the extracted Grades to Array
        const extractedNumbers = [];
        trElements.forEach((tr) => {
            const targetNode = tr.childNodes[7];
            if (targetNode && targetNode.firstChild) {
                const rawText = targetNode.firstChild.textContent.trim();
                if (rawText !== "") {
                    extractedNumbers.push(rawText);
                }
            }
        });
        //Array only containing Grade from specific subject gets added to Array containing all Grades for each Subject
        if (extractedNumbers.length > 0) {
            finalResult.push(extractedNumbers);
        }
    });

    //return finalResult;

    return finalResult.map((element) => {
        return element.map((element) => {
            return Number(element);
        })
    })
}

function getAllAVGGrades() {
    let rawTds = document.querySelectorAll(
        ".div_noten tbody tr > td:nth-of-type(2)"
    );
    let TDArray = Array.from(rawTds);

    const threeDecimalPlaceRegex = /^-?\d+\.\d{3}$/;

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

    var averageGradesCollection = [];

    for (let i = -1; i < filteredTDArray1.length; i = i + 2) {
        averageGradesCollection.push(filteredTDArray1[i]);
    }
    averageGradesCollection.shift();

    return averageGradesCollection;
}

function getAllPeriods() {
    let rawTds = document.querySelectorAll(
        ".div_noten tbody tr > td:nth-of-type(1) > b"
    );
    return Array.from(rawTds).map((b_element) => b_element.innerText);
}

function removeEmptySubjects(grades, periods){
    return periods.flatMap((period,index) => {
        if (grades[index] !== 0){
            return period
        }else{
            return [];
        }
    })
}

//Check this Function
function removeEmptyGrades(grades){
    return grades.flatMap((grade) => {
        if(grade !== 0){
            return grade;
        }else{
            return [];
        }
    })
}

getData();


