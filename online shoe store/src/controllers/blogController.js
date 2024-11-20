loadBlog = async () => {
    const blogApi = new BlogApi();
    await blogApi.getAll(function (data) {
        const mainItemTemplate = document.getElementById("blog-item-template").innerHTML;
        const mainBox = document.getElementById("blog-box");
        for (let index = 0; index < data.length; index++) {
            let template = mainItemTemplate;
            template = template.replace(/__ID__/g, data[index].id);
            template = template.replace(/__TITLE__/g, data[index].title);
            template = template.replace(/__IMG__/g, data[index].image);
            mainBox.innerHTML += template;
        }
    });
}

