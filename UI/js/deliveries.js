let table = document.getElementById("table_body");

function load_deliveries() {
    let request = new Request(SERVER + 'users/' + user_info[0] + '/parcels', myGet);

    fetch(request).then(function (response) {
        if (response.status !== 200 && response.status !== 403) {
            window.location.replace('sign-in.html');
        } else {
            return response.json();
        }

    }).then(function (myresponse) {
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
                oCell.innerHTML = delivery.pickup;
                oCell = newRow.insertCell();
                oCell.innerHTML = delivery.destination;
                oCell = newRow.insertCell();
                oCell.innerHTML = delivery.price;
                oCell = newRow.insertCell();
                oCell.innerHTML = delivery.status;
                oCell = newRow.insertCell();
                oCell.innerHTML = '<a href="view_order.html?order=' + delivery.order_no + '">View</a>';
                num++;
            });
        } else {
            alert(myresponse.ERROR);
        }
    }).catch(error => {
        console.log(error);

        setTimeout(() => {
            alert("No server Response! Check internet connectivity")
        }, 2000)
    });
}

window.onload = load_deliveries();
