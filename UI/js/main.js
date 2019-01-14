const SERVER = "http://127.0.0.1:5000/api/v2/";

let params = new URLSearchParams(location.search);
let access_token = localStorage.getItem('token');
let user_info = localStorage.getItem('user');

let myHeaders = new Headers();

myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", 'Bearer ' + access_token);

let myGet = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

function FormDataToJSON(FormElement) {
    var formData = new FormData(FormElement);
    var ConvertedJSON = {};
    for (const [key, value] of formData.entries()) {
        ConvertedJSON[key] = value;
    }

    return JSON.stringify(ConvertedJSON);
}

function logout(){
    let myPost = {
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    let request = new Request(SERVER + 'auth/logout', myPost);

    fetch(request).then(function (response) {
        if (response.status !== 200 && response.status !== 403) {
            window.location.replace('sign-in.html');
        }else{
            return response.json();
        }
    }).then(function (myresponse) {
        if (myresponse.message) {
            localStorage.setItem('token', myresponse.access);
            localStorage.setItem('user', myresponse.user);
            location.reload(true);
        } else if (myresponse.ERROR) {
            alert(myresponse.ERROR);
        } 
        else {
            alert('Ooops! Something went wrong');
        }
    });
}
