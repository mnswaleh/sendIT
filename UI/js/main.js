function FormDataToJSON(FormElement) {
    var formData = new FormData(FormElement);
    var ConvertedJSON = {};
    for (const [key, value] of formData.entries()) {
        ConvertedJSON[key] = value;
    }

    return JSON.stringify(ConvertedJSON)
}

document.getElementById("order_cancel").onclick = function () {
    confirm("Cancel delivery order 456789?," + " " + prompt("Enter Your password"));
};
