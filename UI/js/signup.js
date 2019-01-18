document.getElementById("form_signup").onsubmit = function (event) {
    event.preventDefault()
    let formData = FormDataToJSON(document.getElementById('form_signup'));

    let myPost = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: formData
    };

    let request = new Request(SERVER + 'auth/signup', myPost);

    fetch(request).then(function (response) {
        return response.json();
    }).then(function (myresponse) {
        if (myresponse.user) {
            window.location.replace('sign-in.html');
        } else if (myresponse.message) {
            var firstKey = Object.keys(myresponse.message)[0];
            alert(myresponse.message[firstKey]);
        } else {
            alert(myresponse.ERROR);
        }
    }).catch(error => {
        console.log(error);
    
        setTimeout(() => {
            alert("No server Response! Check internet connectivity")
        }, 2000)
    });
}