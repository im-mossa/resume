loadPanelData = () => {
    const mainItemTemplate = document.getElementById("template");
    const mainBox = document.getElementById("cards");
    const api = new panelApi();
    const currentUserJson = getCookie("currentUser");
    const currentUser = JSON.parse(currentUserJson);
    api.getById(currentUser.token, (data) => {
        for (let index = 0; index < data.length; index++) {
            let template = mainItemTemplate.innerHTML;
            template = template.replace(/__FIRST_NAME__/g, data[index].customer.firstName);
            template = template.replace(/__LAST_NAME__/g, data[index].customer.lastName);
            template = template.replace(/__PHONE__/g, data[index].customer.phone);
            template = template.replace(/__POSTAL_CODE__/g, data[index].customer.postalCode);
            template = template.replace(/__ADDRESS__/g, data[index].customer.address);
            mainBox.innerHTML += template;
            template.style.display = "block";
        }
    })
}