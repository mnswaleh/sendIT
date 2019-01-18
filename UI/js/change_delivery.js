let request = new Request(SERVER + 'parcels/' + params.get('order'), myGet);

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
        document.getElementById("pick_location").value = myresponse.pickup;
        document.getElementById("delivery_location").value = myresponse.destination;
        document.getElementById("price").value = myresponse.price;
    } else if (myresponse.ERROR) {
        alert(myresponse.ERROR)
    } else{
        alert(myresponse.message)
    }
}).catch(error => {
    console.log(error);

    setTimeout(() => {
        alert("No server Response! Check internet connectivity")
    }, 2000)
});

document.getElementById("btn_backPage").href="view_order.html?order=" + params.get('order');

document.getElementById("form_changeDelivery").onsubmit = function (event) {
    event.preventDefault()
    let formData = FormDataToJSON(document.getElementById('form_changeDelivery'));

    let myPost = {
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: formData
    };

    let request = new Request(SERVER + 'parcels/'+ params.get('order') +'/destination', myPost);

    fetch(request).then(function (response) {
        if (response.status !== 200 && response.status !== 403) {
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
        } else{
            location.reload(true);
        }
    }).catch(error => {
        console.log(error);

        setTimeout(() => {
            alert("No server Response! Check internet connectivity")
        }, 2000)
    });
}
