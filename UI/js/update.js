let location_current = "";

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

let update_order = (request_url)=>{
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

    request = new Request(request_url + toupdate, myPost);
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

document.getElementById("form_update").onsubmit = (event) => {
    event.preventDefault();
    
    request_url = SERVER + 'parcels/'+ params.get('order') +'/';
    let delivery_promise = new Promise((resolve, reject) => {
        update_order(request_url);
        window.setTimeout(
            function () {
                resolve(myresponse);
            }, 1000);
    });
    delivery_promise.then((myresponse) => {
        if (myresponse.message.current_location) {
            alert(myresponse.message.current_location);
        }else if (myresponse.message.status) {
            alert(myresponse.message.status);
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
            document.getElementById("status").value = myresponse.status;
            document.getElementById("current_location").value = myresponse.current_location;
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

