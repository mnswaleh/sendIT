let signup_user = () => {
    let formData = FormDataToJSON(document.getElementById('form_signup'));

    let myPost = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: formData
    };

    let request = new Request(SERVER + 'auth/signup', myPost);

    fetch(request).then((response) => {
        myresponse = response.json();
    }).catch(error => {
        console.log(error);
    
        setTimeout(() => {
            alert("No server Response! Check internet connectivity")
        }, 950)
    });
}

document.getElementById("form_signup").onsubmit = function (event) {
    let error_messages = document.getElementsByClassName('error_feedback');
    for ( var i_error = 0; i_error < error_messages.length ; i_error++){
        error_messages[i_error].innerHTML = "";
    }

    event.preventDefault()
    let signup_promise = new Promise((resolve, reject) => {
        signup_user();
        window.setTimeout(
            function () {
                resolve(myresponse);
            }, 1000);
    });
    signup_promise.then((myresponse) => {
        if (myresponse.user) {
            window.location.replace('sign-in.html');
        } else if (myresponse.message) {
            let firstKey = Object.keys(myresponse.message)[0];
            document.getElementById(firstKey).innerHTML = myresponse.message[firstKey];
        } else {
            let error_message = myresponse.ERROR;
            let error_id = error_message.split(',')[0];
            document.getElementById(error_id).innerHTML = error_message.split(',')[1];
        }
    });
}