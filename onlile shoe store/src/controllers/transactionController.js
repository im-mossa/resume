let form = document.getElementById("main-form");
(async () => {
    const currentCookie = getCookie("currentUser");
    const currentUser = JSON.parse(currentCookie);
    fillForm = (currentUser) => {
        if (currentUser && currentUser.firstName) {
            form["firstName"].value = currentUser.firstName;
            form["lastName"].value = currentUser.lastName;
            form["phone"].value = currentUser.phone;
            form["postalCode"].value = currentUser.postalCode;
            form["username"].value = currentUser.username;
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please log in to your user panel first.",
            }).then(() => {
                location.href = "/online%20shoe%20store/login.html";
            });
        }
    }
    await fillForm(currentUser);
})();
goToPayment = async () => {
    if (!form.checkValidity()) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "please fill all data!",
        });
        return;
    }

    // اطلاعات کاربر
    let userData = {
        address: form["address"].value,
        firstName: form["firstName"].value,
        lastName: form["lastName"].value,
        password: form["password"].value,
        phone: form["phone"].value,
        postalCode: form["postalCode"].value,
        username: form["username"].value
    };

    // بارگذاری داده‌های سبد خرید و تبدیل آن‌ها به قالب مورد نظر
    let items = [];
    let dataList = BasketDB.load();
    dataList.forEach((basket) => {
        if (basket) {
            let item = {
                id: basket.id,
                product: {
                    addDate: "string",
                    category: {
                        id: 0,
                        image: "string",
                        title: "string"
                    },
                    colors: [
                        {
                            hexValue: basket.colorHex || "string",
                            id: basket.colorId,
                            title: basket.colorTitle ? basket.colorTitle.trim() : "string"
                        }
                    ],
                    description: "string",
                    id: basket.id,
                    image: basket.image || "string",
                    price: basket.price || 0,
                    sizes: [
                        {
                            id: basket.sizeId,
                            title: basket.sizeTitle || "string"
                        }
                    ],
                    title: basket.title || "string",
                    visitCount: 0
                },
                quantity: basket.qty,
                unitPrice: basket.price
            };
            items.push(item);
        }
    });

    // داده نهایی برای ارسال به سرور
    let data = {
        items: items,
        user: userData
    };


    showLoading();
    let api = new TransactionApi();

    // ارسال داده‌ها به API و هدایت کاربر به صفحه پرداخت در صورت موفقیت‌آمیز بودن درخواست
    await api.goToPayment(data, function (response) {
        location.href = response[0];
    });
}
