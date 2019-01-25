request = new Request(SERVER + 'parcels/' + params.get('order'), myGet);

let load_order = () => {
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
        }, 2000)
    });
}

let cancel_order = (request) => {

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
        }, 2000)
    });
}

document.getElementById("order_cancel").onclick = () => {
    let cancel_con = confirm("Cancel delivery order " + params.get('order') + "?");

    if (cancel_con == true) {
        let myPost = {
            method: 'PUT',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };

        let request = new Request(SERVER + 'parcels/' + params.get('order') + '/cancel', myPost);

        let order_promise = new Promise((resolve, reject) => {
            cancel_order(request);
            window.setTimeout(
                function () {
                    resolve(myresponse);
                }, 2020);
        });

        order_promise.then((myresponse) => {
            if (myresponse.message) {
                alert(myresponse.message);
            } else if (myresponse.ERROR) {
                alert(myresponse.ERROR);
            } else if (myresponse.login) {
                window.location.replace('sign-in.html');
            } else {
                location.reload(true);
            }
        });
    }
};

window.onload = () => {
    document.getElementById("btn_change").href = "change_delivery.html?order=" + params.get('order');

    let order_promise = new Promise((resolve, reject) => {
        load_order();
        window.setTimeout(
            function () {
                resolve(myresponse);
            }, 2020);
    });
    order_promise.then((myresponse) => {
        if (myresponse.order_no) {
            let date = new Date(myresponse.created)
            date = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
            document.getElementById("pcl_no").innerHTML = myresponse.order_no;
            document.getElementById("date_created").innerHTML = date;
            document.getElementById("weight").innerHTML = myresponse.weight;
            document.getElementById("pickup").innerHTML = myresponse.pickup;
            document.getElementById("destination").innerHTML = myresponse.destination;
            document.getElementById("price").innerHTML = myresponse.price;
            document.getElementById("status").innerHTML = myresponse.status;
        } else if (myresponse.ERROR) {
            alert(myresponse.ERROR)
        } else if (myresponse.message) {
            alert(myresponse.message)
        } else {
            window.location.replace('sign-in.html');
        }
    });
}