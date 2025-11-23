//Creates Array full of Objects, so one Object can hold all necessary information about a Subject / Grade (Expect ToggleConfig)
export function prepareData(subjectArray: string[], avgGradeArray: number[]){
    const Array = removeEmptySubjects(subjectArray, avgGradeArray);
    return Array.map((object,index) => {
        return {index: index, subject: object.subject, grade: object.grade}
    })
}

//Removes Subjects, where there is no valid Grade.
export function removeEmptySubjects(SubjectArray: string[],GradeArray: number[]) {
    const combined = SubjectArray.map((subject, index) => {
        return { subject: subject, grade: GradeArray[index] };
    });
    return combined.filter((subject) => subject.grade !== 0);
}

export function prepareSingleExamGrades(array: number[]) {
    return array.filter((grade) => grade !== 0);
}
