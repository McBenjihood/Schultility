const url = "http://localhost:8080/api/user"

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
        const response = await fetch(url + "/gradedata", {
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
        const response = await fetch(url + "/configdata", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${obj.accessToken}`
            }
        })
        const returnValue = await response.json();
        return returnValue.configData;
    }catch (error){
        console.log("temp");
    }
}