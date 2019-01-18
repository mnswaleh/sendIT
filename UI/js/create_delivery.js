function calc_price(){
    let weight = document.getElementById('weight').value;
    let price = document.getElementById('price');
    if (weight < 20){
        price.value = 200;
    } else if (weight < 50){
        price.value = 600;
    } else if (weight < 100){
        price.value = 1000;
    } else if (weight < 200){
        price.value = 5000;
    } else{
        price.value = 10000;
    }
}

document.getElementById("form_createDelivery").onsubmit = function (event) {
    event.preventDefault()
    let formData = FormDataToJSON(document.getElementById('form_createDelivery'));

    let myPost = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: formData
    };

    let request = new Request(SERVER + 'parcels/'+ params.get('order') +'/destination', myPost);

    fetch(request).then(function (response) {
        if (response.status !== 200 && response.status !== 403 && response.status !== 400) {
            window.location.replace('sign-in.html');
        }else{
            return response.json();
        }
    }).then(function (myresponse) {
        if (myresponse.message) {
            var firstKey = Object.keys(myresponse.message)[0];
            alert(myresponse.message[firstKey]);
        } else if (myresponse.Error) {
            alert(myresponse.Error)
        } else{
            alert('Order created');
            location.reload(true);
        }
    }).catch(error => {
        console.log(error);

        setTimeout(() => {
            alert("No server Response! Check internet connectivity")
        }, 2000)
    });
}