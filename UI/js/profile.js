let change_text = "Could not fetch";
let get_total = () => {
    let request = new Request(SERVER + 'users/' + user_info[0] + '/parcels', myGet);

    fetch(request).then(function (response) {
        if (response.status !== 200 && response.status !== 403) {
            return change_text;
        } else {
            return response.json();
        }

    }).then((myresponse) => {
        if (myresponse.Title) {
            document.getElementById("total_orders").innerHTML = Object.keys(myresponse.orders).length;
        } else if (myresponse.ERROR) {
            alert(myresponse.ERROR);
        } else {
            document.getElementById("total_orders").innerHTML = "Could not fetch";
        }
    }).catch(error => {
        console.log(error);

        setTimeout(() => {
            alert("No server Response! Check internet connectivity")
        }, 300)
    });
}

let get_delivered = () => {
    let request = new Request(SERVER + 'users/' + user_info[0] + '/delivered', myGet);

    fetch(request).then((response) => {
        if (response.status !== 200 && response.status !== 403) {
            return change_text;
        } else {
            return response.json();
        }

    }).then((myresponse) => {
        if (myresponse.delivered >= 0) {
            document.getElementById("delivered").innerHTML = myresponse.delivered;
        } else if (myresponse.ERROR) {
            alert(myresponse.ERROR);
        } else {
            document.getElementById("delivered").innerHTML = "Could not fetch";
        }
    }).catch(error => {
        console.log(error);

        setTimeout(() => {
            alert("No server Response! Check internet connectivity")
        }, 300)
    });
}

let get_inTransit = () => {
    let request = new Request(SERVER + 'users/' + user_info[0] + '/in-transit', myGet);

    fetch(request).then((response) => {
        if (response.status !== 200 && response.status !== 403) {
            return change_text;
        } else {
            return response.json();
        }

    }).then((myresponse) => {
        if (myresponse.in_transit >= 0) {
            document.getElementById("in_transit").innerHTML = myresponse.in_transit;
        } else if (myresponse.ERROR) {
            alert(myresponse.ERROR);
        } else {
            document.getElementById("in_transit").innerHTML = "Could not fetch";
        }
    }).catch(error => {
        console.log(error);

        setTimeout(() => {
            alert("No server Response! Check internet connectivity")
        }, 300)
    });
}


let load_profile = () => {
    let request = new Request(SERVER + 'user/' + user_info[0], myGet);

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
        }, 300)
    });
}

window.onload = () => {

    let order_promise = new Promise((resolve, reject) => {
        load_profile();
        window.setTimeout(
            function () {
                resolve(myresponse);
            }, 1200);
    });
    order_promise.then((myresponse) => {
        if (myresponse.user_id) {
            document.getElementById("user_name").innerHTML = myresponse.username;
            document.getElementById("full_name").innerHTML = myresponse.firstname + ' ' + myresponse.secondname;
            document.getElementById("gender").innerHTML = myresponse.gender;
            document.getElementById("email").innerHTML = myresponse.email;
            get_total();
            get_delivered();
            get_inTransit();
        } else if (myresponse.ERROR) {
            alert(myresponse.ERROR)
        } else if (myresponse.message) {
            alert(myresponse.message)
        } else {
            window.location.replace('sign-in.html');
        }
    });
}