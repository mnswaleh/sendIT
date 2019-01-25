let table = document.getElementById("table_body");

let admin_deliveries = (request) => {
    request = new Request(SERVER + 'parcels', myGet);

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

window.onload = () => {

    let deliveries_promise = new Promise((resolve, reject) => {
        admin_deliveries();
        window.setTimeout(
            function () {
                resolve(myresponse);
            }, 1000);
    });
    deliveries_promise.then((myresponse) => {
        if (myresponse.Title) {
            let num = 1;
            myresponse.orders.forEach(delivery => {
                let newRow = table.insertRow();
                let oCell = newRow.insertCell();
                oCell.style.fontWeight = "bold";
                oCell.innerHTML = num;
                oCell = newRow.insertCell();
                oCell.innerHTML = delivery.order_no;
                oCell = newRow.insertCell();
                oCell.innerHTML = delivery.sender;
                oCell = newRow.insertCell();
                oCell.innerHTML = delivery.pickup;
                oCell = newRow.insertCell();
                oCell.innerHTML = delivery.destination;
                oCell = newRow.insertCell();
                oCell.innerHTML = delivery.price;
                oCell = newRow.insertCell();
                oCell.innerHTML = delivery.status;
                oCell = newRow.insertCell();
                oCell.innerHTML = '<a href="update_order.html?order=' + delivery.order_no + '">Update</a>';
                num++;
            });
        } else if (myresponse.ERROR) {
            alert(myresponse.ERROR);
        } else{
            window.location.replace('sign-in.html');
        }
    });
}
