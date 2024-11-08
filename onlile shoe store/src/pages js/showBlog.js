window.onload = async () => {
    let id = getParameterByName("id");
    const blogApi = new BlogApi();
    await blogApi.getById(id, function (dataList) {
        data = dataList[0];
        document.getElementById("blog-image").src = data.image;
        document.getElementById("blog-title").innerHTML = data.title;
        document.getElementById("blog-subTitle").innerHTML = data.subTitle;
        document.getElementById("description").innerHTML = data.description;
        document.getElementById("visit-count").innerHTML = data.visitCount;
        document.getElementById("date").innerHTML = data.addDate;
    });
}