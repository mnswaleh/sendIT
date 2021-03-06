let  login_user = () => {
    let formData = FormDataToJSON(document.getElementById('form_login'));

    let myPost = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: formData
    };

    request = new Request(SERVER + 'auth/login', myPost);

    fetch(request).then((response) => {
        myresponse = response.json();
    }).catch(error => {
        console.log(error);

        setTimeout(() => {
            alert("No server Response! Check internet connectivity")
        }, 2000)
    });
}

document.getElementById("form_login").onsubmit = function (event) {
    event.preventDefault();
    document.getElementById("error_feedback").innerHTML = "";
    
    let login_promise = new Promise((resolve, reject) => {
        login_user();
        window.setTimeout(
            function () {
                resolve(myresponse);
            }, 2020);
    });
    login_promise.then((myresponse) => {
        if (myresponse.access) {
            localStorage.setItem('token', myresponse.access);
            localStorage.setItem('user', myresponse.user);
            let user_location = (myresponse.user[1] == "admin") ? "admin.html" : "delivery_orders.html";
            window.location.replace(user_location);
        } else if (myresponse.ERROR) {
            document.getElementById("error_feedback").innerHTML = myresponse.ERROR;
        } else if (myresponse.message) {
            let firstKey = Object.keys(myresponse.message)[0];
            document.getElementById("error_feedback").innerHTML = myresponse.message[firstKey];
        }
    });

}
