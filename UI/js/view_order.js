let request = new Request(SERVER + 'parcels/' + params.get('order'), myGet);

fetch(request).then(function (response) {
    if (response.status !== 200 && response.status !== 403) {
        window.location.replace('sign-in.html');
    } else {
        return response.json();
    }

}).then(function (myresponse) {
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
        alert('Ooops! Something went wrong');
    }
});

document.getElementById("btn_change").href="change_delivery.html?order=" + params.get('order');

document.getElementById("order_cancel").onclick = function () {
    let cancel_con = confirm("Cancel delivery order "+ params.get('order') +"?");

    if (cancel_con == true){
        let myPost = {
            method: 'PUT',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };
    
        let request = new Request(SERVER + 'parcels/'+ params.get('order') +'/cancel', myPost);
    
        fetch(request).then(function (response) {
            if (response.status !== 200 && response.status !== 403) {
                window.location.replace('sign-in.html');
            }else{
                return response.json();
            }
        }).then(function (myresponse) {
            if (myresponse.message) {
                alert(myresponse.message);
            } else if (myresponse.ERROR) {
                alert(myresponse.ERROR);
            } else if (myresponse.status == "canceled") {
                location.reload(true);
            }
            else {
                alert('Ooops! Something went wrong');
            }
        });
    }
};