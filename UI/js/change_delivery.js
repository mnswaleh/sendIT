request = new Request(SERVER + 'parcels/' + params.get('order'), myGet);

let fetch_order = () => {
    fetch(request).then((response) => {
        if (response.status !== 200 && response.status !== 403) {
            myresponse.login = "login afresh";
        } else {
            myresponse = response.json();
        }

    }).catch(error => {
        console.log(error);

        setTimeout(() => {
            alert("No server Response! Check internet connectivity")
        }, 950)
    });
}

let change_delivery = (request_url)=>{
    let formData = FormDataToJSON(document.getElementById('form_changeDelivery'));

    let myPost = {
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: formData
    };

    let request = new Request(request_url, myPost);

    fetch(request).then((response) => {
        if (response.status !== 200 && response.status !== 403 && response.status !== 400) {
            myresponse.login = "login afresh";
        } else {
            myresponse = response.json();
        }
    }).then(function (myresponse) {
        
    }).catch(error => {
        console.log(error);

        setTimeout(() => {
            alert("No server Response! Check internet connectivity")
        }, 950)
    });
}

document.getElementById("form_changeDelivery").onsubmit = (event) => {
    event.preventDefault()
    let request_url = SERVER + 'parcels/' + params.get('order') + '/destination';
    let delivery_promise = new Promise((resolve, reject) => {
        change_delivery(request_url);
        window.setTimeout(
            function () {
                resolve(myresponse);
            }, 1000);
    });
    delivery_promise.then((myresponse) => {
        if (myresponse.message.delivery_location) {
            alert(myresponse.message.delivery_location);
        }else if (myresponse.message) {
            alert(myresponse.message);
        } else if (myresponse.Error) {
            alert(myresponse.Error)
        } else if(message.login) {
            window.location.replace('sign-in.html');
        } else {
            location.reload(true);
        }
    });
}

window.onload = () => {
    document.getElementById("btn_backPage").href = "view_order.html?order=" + params.get('order');

    let order_promise = new Promise((resolve, reject) => {
        fetch_order();
        window.setTimeout(
            function () {
                resolve(myresponse);
            }, 1000);
    });
    order_promise.then((myresponse) => {
        if (myresponse.order_no) {
            document.getElementById("order_number").value = myresponse.order_no;
            document.getElementById("weight").value = myresponse.weight;
            document.getElementById("pick_location").value = myresponse.pickup;
            document.getElementById("delivery_location").value = myresponse.destination;
            document.getElementById("price").value = myresponse.price;
        } else if (myresponse.ERROR) {
            alert(myresponse.ERROR)
        } else if(myresponse.message) {
            alert(myresponse.message)
        } else {
            window.location.replace('sign-in.html');
        }
    });
}
