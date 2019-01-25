let calc_price = () => {
    let weight = document.getElementById('weight').value;
    let price = document.getElementById('price');
    if (weight < 20) {
        price.value = 200;
    } else if (weight < 50) {
        price.value = 600;
    } else if (weight < 100) {
        price.value = 1000;
    } else if (weight < 200) {
        price.value = 5000;
    } else {
        price.value = 10000;
    }

    document.getElementById('price_2').value = price.value;
}

let create_order = ()=>{
    let formData = FormDataToJSON(document.getElementById('form_createDelivery'));

    let myPost = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: formData
    };

    let request = new Request(SERVER + 'parcels', myPost);

    fetch(request).then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 403 && response.status !== 400) {
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

document.getElementById("form_createDelivery").onsubmit = (event) => {
    event.preventDefault()
    let create_promise = new Promise((resolve, reject) => {
        create_order();
        window.setTimeout(
            function () {
                resolve(myresponse);
            }, 1000);
    });
    create_promise.then((myresponse) => {
        if (myresponse.message) {
            var firstKey = Object.keys(myresponse.message)[0];
            alert(myresponse.message[firstKey]);
        } else if (myresponse.Error) {
            alert(myresponse.Error)
        }else if (myresponse.login){
            window.location.replace('sign-in.html');
        } else {
            alert('Order created');
            location.reload(true);
        }
    });
}