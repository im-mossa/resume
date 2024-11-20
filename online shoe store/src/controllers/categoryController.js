loadCategory = async () => {
    const categoryApi = new CategoryApi();
    await categoryApi.getAll(function (data) {
        const mainItemTemplate = document.getElementById("category-item-template").innerHTML;
        const mainBox = document.getElementById("category-box");
        for (let index = 0; index < data.length; index++) {
            let template = mainItemTemplate;
            template = template.replace(/__ID__/g, data[index].id);
            template = template.replace(/__TITLE__/g, data[index].title);
            template = template.replace(/__IMG__/g, data[index].image);
            mainBox.innerHTML += template;
        }
    });
}

