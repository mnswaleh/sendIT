var request = new XMLHttpRequest();
document.getElementById("form_login").onsubmit = function (event) {
    document.getElementById("error_feedback").innerHTML = "";
    event.preventDefault()
    var formData = FormDataToJSON(document.getElementById('form_login'));

    request.open('POST', 'http://127.0.0.1:5000/api/v2/auth/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(this.response);
            if (data.ERROR) {
                document.getElementById("error_feedback").innerHTML = data.ERROR;
            } else {
                localStorage.setItem('token', data.access);
                window.location.replace("delivery_orders.html");
            }
        } else {
            alert('Ooops! Something went wrong');
        }
    }

    request.send(formData);
}