signUp = async () => {
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
    showLoading();
    let api = new UserApi();
    await api.signUp(userData, function (data) {
        const currentUser = data[0];
        setCookie("currentUser", JSON.stringify(currentUser), 5);
        setCookie("token", currentUser.token, 5);
        location.href = "/onlile%20shoe%20store/src/panel/panel.html";
    });
}

