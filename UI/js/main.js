const SERVER = "https://api-sendit.herokuapp.com/api/v2/";

let myresponse = {};
let params = new URLSearchParams(location.search);
let access_token = localStorage.getItem('token') || "FDFAXAF&/SA/(AB>VAB";
let user_info = localStorage.getItem('user') || [0, "user"];

let myHeaders = new Headers();

myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", 'Bearer ' + access_token);

let myGet = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

let request = new Request(SERVER, myGet);

function FormDataToJSON(FormElement) {
    var formData = new FormData(FormElement);
    var ConvertedJSON = {};
    for (const [key, value] of formData.entries()) {
        ConvertedJSON[key] = value;
    }

    return JSON.stringify(ConvertedJSON);
}

function logout() {
    let myPUT = {
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    request = new Request(SERVER + 'auth/logout', myPUT);

    fetch(request).then(function (response) {
        if (response.status !== 200 && response.status !== 403) {
            window.location.replace('sign-in.html');
        } else {
            return response.json();
        }
    }).then(function (myresponse) {
        if (myresponse.ERROR) {
            alert(myresponse.ERROR);
        } else {
            localStorage.setItem('token', myresponse.access);
            localStorage.setItem('user', myresponse.user);
            window.location.replace('sign-in.html');
        }
    }).catch(error => {
        console.log(error);

        setTimeout(() => {
            alert("No server Response! Check internet connectivity")
        }, 950)
    });
}
