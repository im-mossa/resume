goToPayment = async () => {
    debugger;
    let form = document.getElementById("main-form");
    if (!form.checkValidity()) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "please fill all data!",
        });
        return;
    }
    let userData = {
        address: form["address"].value,
        firstName: form["firstName"].value,
        lastName: form["lastName"].value,
        password: form["password"].value,
        phone: form["phone"].value,
        postalCode: form["postalCode"].value,
        username: form["username"].value
    }
    let items = [];
    let dataList = BasketDB.load();

    dataList.forEach((basket) => {
        if (basket != null) {
            let item = {
                product: {
                    colors: [
                        {
                            id: basket.colorId
                        }
                    ],
                    id: basket.id,
                    sizes: [
                        {
                            id: basket.sizeId
                        }
                    ]
                },
                quantity: basket.qty
            }
            items.push(item);
        }
    });
    let data = {
        items: items,
        user: userData
    }
    showLoading();
    let api = new TransactionApi();
    await api.goToPayment(data, function (response) {
        location.href = response[0];
    });
}
