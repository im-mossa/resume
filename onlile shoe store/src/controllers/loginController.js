login = async () => {
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
        password: form["password"].value,
        username: form["username"].value
    }
    showLoading();
    let api = new UserApi();
    await api.login(userData, function (data) {
        const currentUser = data[0];
        setCookie("currentUser", JSON.stringify(currentUser), 5);
        setCookie("token", currentUser.token, 5);
        location.href = "/resume/onlile%20shoe%20store/src/panel/panel.html";
    });
}

