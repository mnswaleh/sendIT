const SERVER = "https://api-sendit.herokuapp.com/api/v2/";

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
