getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
deleteCookie = (cname) => {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

showLoading = () => {
    let timerInterval;
    Swal.fire({
        title: "Please Wait...!",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
    });
    document.querySelector(".action-btn").style.display = "none";
    const btn2 = document.querySelector(".action-btn2");
    if(btn2) {
        btn2.style.display = "none";
    }
    document.querySelector(".please-wait").style.display = "block";
}
showButtom = () => {
    document.querySelector(".action-btn").style.display = "block";
    const btn2 = document.querySelector(".action-btn2");
    if(btn2) {
        btn2.style.display = "block";
    }
    document.querySelector(".please-wait").style.display = "none";
}

checkUser = () => {
    const currentUser = getCookie("currentUser");
    if(currentUser == undefined || currentUser == null || currentUser == "") {
        location.href = "/onlile%20shoe%20store/login.html";
    } else {
        location.href = "/onlile%20shoe%20store/src/panel/panel.html";
    }
}

logOutSystem = () => {
    deleteCookie("currentUser");
    deleteCookie("token");
    location.href = "/onlile%20shoe%20store/login.html";
}