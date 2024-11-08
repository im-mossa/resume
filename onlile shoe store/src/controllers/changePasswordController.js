const currentUserJson = getCookie("currentUser");
const currentUser = JSON.parse(currentUserJson);
let form = document.getElementById("main-form");
(async () => {
    fillForm = (currentUser) => {
        if (currentUser && currentUser.firstName) {
            form["username"].value = currentUser.username;
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please log in to your user panel first.",
            }).then(() => {
                location.href = "/onlile%20shoe%20store/login.html";
            });
        }
    }
    await fillForm(currentUser);
})();
changeProfile = async () => {
    debugger;
    if (!form.checkValidity()) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "please fill all data!",
        });
        return;
    }

    let userData = {
        address: currentUser.address,
        customerId: currentUser.customerId,
        firstName: currentUser.firstName,
        id: currentUser.id,
        lastName: currentUser.lastName,
        oldPassword: form["old-password"].value,
        password: form["password"].value,
        phone: currentUser.phone,
        postalCode: currentUser.postalCode,
        repeatPassword: form["password"].value,
        token: currentUser.token,
        username: currentUser.username
    }
    showLoading();
    let api = new UserApi();
    await api.changePassword(userData, currentUser.token, function (data) {
        const currentUser = data[0];
        setCookie("currentUser", JSON.stringify(currentUser), 5);
        setCookie("token", currentUser.token, 5);
        location.href = "/onlile%20shoe%20store/src/panel/panel.html";
    });
}

