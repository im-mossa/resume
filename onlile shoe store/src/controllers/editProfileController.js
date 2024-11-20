editProfile = async () => {
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
    const currentUserJson = getCookie("currentUser");
    const currentUser = JSON.parse(currentUserJson);
    let userData = {
        address: form["address"].value,
        customerId: currentUser.customerId,
        firstName: form["firstName"].value,
        id: currentUser.id,
        lastName: form["lastName"].value,
        password: form["password"].value,
        phone: form["phone"].value,
        postalCode: form["postalCode"].value,
        token: currentUser.token,
        username: form["username"].value
    }
    showLoading();
    let api = new UserApi();
    await api.editProfile(userData, currentUser.token, function (data) {
        const currentUser = data[0];
        setCookie("currentUser", JSON.stringify(currentUser), 5);
        setCookie("token", currentUser.token, 5);
        location.href = "/online%20shoe%20store/src/panel/panel.html";
    });
}

