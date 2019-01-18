function login_user(){
    document.getElementById("error_feedback").innerHTML = "";
    event.preventDefault()
    let formData = FormDataToJSON(document.getElementById('form_login'));

    let myPost = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: formData
    };

    let request = new Request(SERVER + 'auth/login', myPost);

    fetch(request).then(function (response) {
        return response.json();
    }).then(function (myresponse) {
        if (myresponse.access) {
            localStorage.setItem('token', myresponse.access);
            localStorage.setItem('user', myresponse.user);
            let user_location = (myresponse.user[1] == "admin") ? "admin.html" : "delivery_orders.html";
            window.location.replace(user_location);
        } else if (myresponse.ERROR) {
            document.getElementById("error_feedback").innerHTML = myresponse.ERROR;
        } else if (myresponse.message) {
            var firstKey = Object.keys(myresponse.message)[0];
            document.getElementById("error_feedback").innerHTML = myresponse.message[firstKey];
        }
    });
}

document.getElementById("form_login").onsubmit = function (event) {
    login_user();
}
