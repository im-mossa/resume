class BaseApi {
    getData = async (suffix, success) => {
        let url = ApiAddress.getApiURL(suffix);
        let response = await fetch(url);
        if (response.status == 200) {
            this.onsuccess(response, success);
        } else {
            this.onError();
        }
    }
    postData = async (suffix, data,success) => {
        let url = ApiAddress.getApiURL(suffix);
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.status == 200) {
            this.onsuccess(response, success);
            showButtom();
        } else {
            this.onError();
            showButtom();
        }
    }
    putDataWithToken = async (suffix, data, token, success) => {
        let url = ApiAddress.getApiURL(suffix);
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (response.status == 200) {
            this.onsuccess(response, success);
            showButtom();
        } else {
            this.onError();
            showButtom();
        }
    }

    putDataWithToken2 = (suffix, data, token, success) => {
        let url = ApiAddress.getApiURL(suffix);
            
        var req = new XMLHttpRequest();
        req.open("PUT", url, true);
        req.setRequestHeader('Authorizetion', 'Bearer ' + token);
        req.setRequestHeader('Access-Control-Allow-Origin', '*');
        req.setRequestHeader('Content-type', 'application/json');
        req.onreadystatechange = () => {
            if (this.readyState == 4 && this.status == 200) {
                success(JSON.parse(this.responseText).data);
            }
        }
        req.send(JSON.stringify(data));
    }
    postDataWithToken = async (suffix, data, token, success) => {
        let url = ApiAddress.getApiURL(suffix);
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (response.status == 200) {
            this.onsuccess(response, success);
            showButtom();
        } else {
            this.onError();
            showButtom();
        }
    }    
    getDataWithToken = async (suffix, token, success) => {
        let url = ApiAddress.getApiURL(suffix);
        let response = await fetch(url, {
            method: "GET",
            headers: new Headers({
                "Authorization": "Bearer " + token
            })
        });
        
        if (response.status == 200) {
            this.onsuccess(response, success);
        } else {
            this.onError();
            deleteCookie("token");
            deleteCookie("currentUser");
        }
        

        // var req = new XMLHttpRequest();
        // req.open("GET", url);
        // req.setRequestHeader('Authorizetion', 'Bearer ' + token);
        // req.setRequestHeader('Access-Control-Allow-Origin', '*');
        // req.onreadystatechange = () => {
        //     if (this.readyState == 4 && this.status == 200) {
        //         success(JSON.parse(this.responseText).data);
        //     }
        // }
        // req.send();

    }
    onsuccess = async (response, callBack) => {
        let json = await response.json();
        switch (json.status) {
            case "OK":
                callBack(json.data);
                break;
            case "NOT_FOUND":
                this.onError2(json);
                break;

            default:
                this.onError();
                break;
        }
    }
    onError = async () => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error on getting information from server!",
        });
    }
    onError2 = async (json) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: json.message,
        });
    }
}