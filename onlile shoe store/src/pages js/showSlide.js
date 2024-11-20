const mainBox = document.getElementById("product-box");
window.onload = async () => {
    await loadCategory();
    let id = getParameterByName("Id");
    if (id != undefined || id != null) {
        const sliderApi = new SliderApi();
        await sliderApi.getById(id, (data) => {
            mainBox.innerHTML = "";
            fillTheForm(data);
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "There is no information on this page.",
        }).then(() => {
            location.href = "/online%20shoe%20store/index.html";
        });
    }
}
function fillTheForm(data) {
    const mainItemTemplate = document.getElementById("product-item-template");
    for (let index = 0; index < data.length; index++) {
        let template = mainItemTemplate.innerHTML;
        template = template.replace(/__ID__/g, data[index].id);
        template = template.replace(/__TITLE__/g, data[index].title);
        template = template.replace(/__IMG__/g, data[index].image);
        mainBox.innerHTML += template;
    }
}