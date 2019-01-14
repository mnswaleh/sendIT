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
        if (myresponse.message) {
            var firstKey = Object.keys(myresponse.message)[0];
            alert(myresponse.message[firstKey]);
        } else if (myresponse.ERROR) {
            alert(myresponse.ERROR);
        } else if (myresponse.user) {
            alert('succesful');
            location.reload(true)
        }
        else {
            alert('Ooops! Something went wrong');
        }
    });
}
