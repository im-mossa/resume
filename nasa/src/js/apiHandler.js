class ApiHandler {
    getData(data, onSuccess, onError) {
        fetch(data)
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                } else {
                    throw new Error("Exeption!");
                }
            })
            .then(data => onSuccess(data))
            .catch(error => onError(error));
    }
} 

