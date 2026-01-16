const url = "http://localhost:8080/api/user"

interface DataInterface {
    index: number,
    subject: string,
    avg: number,
    grades: number[]
}

interface ConfigInterface {
    ProfileID: number,
    SubjectIndex: number
}

export async function checkAuth(){
    const obj = await chrome.storage.local.get(["accessToken"]);
    try{
        const response = await fetch(url + "/authenticate",{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${obj.accessToken}`
            }
        })
        const jsonResponse = await response.json();
        return jsonResponse.auth;
    }catch (error){
        console.log("Could not check user's authentication");
    }
}


export async function fetchGradeData(){
    const obj = await chrome.storage.local.get(["accessToken"]);
    try {
        const response = await fetch(url + "/getgradedata", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${obj.accessToken}`
            }
        })
        const returnValue = await response.json();
        return returnValue.gradeData;
    }catch (error){
        console.log(error);
    }
}


export async function fetchConfigData(){
    const obj = await chrome.storage.local.get(["accessToken"]);
    try {
        const response = await fetch(url + "/getconfigdata", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${obj.accessToken}`
            }
        })
        const returnValue = await response.json();
        return returnValue.configData;
    }catch (error){
        console.log(error);
    }
}

export async function updateGradeData(gradeData : DataInterface){
    const obj = await chrome.storage.local.get(["accessToken"]);
    try{
        const response = await fetch(url + "/updategradedata", {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${obj.accessToken}`
            },
            body: JSON.stringify({
              gradeData: gradeData
            })
        })
        const returnValue = await response.json();
        console.log(returnValue);
        return returnValue;
    }catch (error){
        console.log(error);
    }
}

export async function updateConfigData(configData : object[]){
    const obj = await chrome.storage.local.get(["accessToken"]);
    try{
        const response = await fetch(url + "/updateconfigdata", {
            method: "Post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${obj.accessToken}`
            },
            body: JSON.stringify({
                configData: configData
            })
        })
        const returnValue = await response.json();
        console.log(returnValue);
        return returnValue;
    }catch (error){
        console.log(error);
    }
}