let request = new Request(SERVER + 'parcels/' + params.get('order'), myGet);
let location_current = "";

fetch(request).then(function (response) {
    if (response.status !== 200 && response.status !== 403) {
        window.location.replace('sign-in.html');
    } else {
        return response.json();
    }

}).then(function (myresponse) {
    if (myresponse.order_no) {
        document.getElementById("order_number").value = myresponse.order_no;
        document.getElementById("weight").value = myresponse.weight;
        document.getElementById("status").value = myresponse.status;
        document.getElementById("current_location").value = myresponse.current_location;
        document.getElementById("price").value = myresponse.price;
    } else if (myresponse.ERROR) {
        alert(myresponse.ERROR)
    } else if (myresponse.message) {
        alert(myresponse.message)
    } else {
        alert('Ooops! Something went wrong');
    }
}).then(function(){
    location_current = document.getElementById('current_location').value;
});

document.getElementById("form_update").onsubmit = function (event) {
    event.preventDefault()
    let toupdate = 'status'
    let formData = FormDataToJSON(document.getElementById('form_update'));

    let myPost = {
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: formData
    };

    if (document.getElementById('current_location').value !== location_current){
        toupdate = 'presentLocation'
    }

    let request = new Request(SERVER + 'parcels/'+ params.get('order') +'/' + toupdate, myPost);

    fetch(request).then(function (response) {
        if (response.status !== 200 && response.status !== 403 && response.status !== 400) {
            window.location.replace('sign-in.html');
        }else{
            return response.json();
        }
    }).then(function (myresponse) {
        if (myresponse.message) {
            var firstKey = Object.keys(myresponse.message)[0];
            alert(myresponse.message[firstKey]);
        } else if (myresponse.ERROR) {
            alert(myresponse.ERROR)
        } else if (myresponse.order_no) {
            location.reload(true);
        }
        else {
            alert('Ooops! Something went wrong');
        }
    });
}
