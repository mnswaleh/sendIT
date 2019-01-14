function get_total() {
    let request = new Request(SERVER + 'users/' + user_info[0] + '/parcels', myGet);

    fetch(request).then(function (response) {
        if (response.status !== 200 && response.status !== 403) {
            window.location.replace('sign-in.html');
        } else {
            return response.json();
        }

    }).then(function (myresponse) {
        if (myresponse.Title) {
            document.getElementById("total_orders").innerHTML = Object.keys(myresponse.orders).length;
        } else if (myresponse.ERROR) {
            alert(myresponse.ERROR);
        } else {
            alert('Ooops! Something went wrong');
        }
    });
}

function get_delivered() {
    let request = new Request(SERVER + 'users/' + user_info[0] + '/delivered', myGet);

    fetch(request).then(function (response) {
        if (response.status !== 200 && response.status !== 403) {
            window.location.replace('sign-in.html');
        } else {
            return response.json();
        }

    }).then(function (myresponse) {
        if (myresponse.delivered >= 0) {
            document.getElementById("delivered").innerHTML = myresponse.delivered;
        } else if (myresponse.ERROR) {
            alert(myresponse.ERROR);
        } else {
            alert('Ooops! Something went wrong');
        }
    });
}

function get_inTransit(){
    let request = new Request(SERVER + 'users/' + user_info[0] + '/in-transit', myGet);

    fetch(request).then(function (response) {
        if (response.status !== 200 && response.status !== 403) {
            window.location.replace('sign-in.html');
        } else {
            return response.json();
        }

    }).then(function (myresponse) {
        if (myresponse.in_transit >= 0) {
            document.getElementById("in_transit").innerHTML = myresponse.in_transit;
        } else if (myresponse.ERROR) {
            alert(myresponse.ERROR);
        } else {
            alert('Ooops! Something went wrong');
        }
    });
}

let request = new Request(SERVER + 'user/' + user_info[0], myGet);

fetch(request).then(function (response) {
    if (response.status !== 200 && response.status !== 403) {
        window.location.replace('sign-in.html');
    } else {
        return response.json();
    }

}).then(function (myresponse) {
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
        alert('Ooops! Something went wrong');
    }
});