loadAbout = async () => {
    const aboutApi = new AboutApi();
    await aboutApi.getAll(function (data) {
        const mainBox = document.getElementById("about-box");
        for (let index = 0; index < data.length; index++) {
            if (data[index].title == "about-us") {
                mainBox.innerHTML = data[index].description;
            }
        }
    });
}

