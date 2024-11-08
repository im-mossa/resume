loadProducts = async (currentItem, target, pageIndex, pageSize, catId, catName) => {
    const oldItem = document.getElementsByClassName("tag-btn");
    for (ele of oldItem) {
        ele.classList.remove("tag-btn-selected");
    }
    if (currentItem == null) {
        currentItem = document.getElementById("popular-tag-btn");
    }
    if (currentItem != null) {
        currentItem.classList.add("tag-btn-selected");
    }
    if (!catName) {
        document.getElementById("product-main-title").innerText =
            target + ' Product';
    } else {
        document.getElementById("product-main-title").innerText =
            catName + ' Product';
    }
    await loadProductsData(target, pageIndex, pageSize, catId);
}

loadProductsData = async (target, pageIndex, pageSize, catId) => {
    const productApi = new ProductApi();
    const mainItemTemplate = document.getElementById("product-item-template");
    const mainBox = document.getElementById("product-box");
    switch (target) {
        case 'Popular':
            await productApi.getPopularProducts(callback);
            break;
        case 'New':
            await productApi.getNewProducts(callback);
            break;
        case 'All':
            await productApi.getAll(pageIndex, pageSize, callbackProducts);
            break;
        case 'Category':
            await productApi.getByCategoryId(catId, pageIndex, pageSize, callbackProducts);
            break;
        default:
            // در اینجا میتوانید کدی برای حالت پیشفرض اضافه کنید
            break;
    }

    function callback(data) {
        mainBox.innerHTML = "";
        fillTheForm(data);
    }
    function callbackProducts(data) {
        fillTheForm(data);
        if (data.length == 0) {
            window.stopLoading = true;
        }
    }
    function fillTheForm(data) {
        for (let index = 0; index < data.length; index++) {
            let template = mainItemTemplate.innerHTML;
            template = template.replace(/__ID__/g, data[index].id);
            template = template.replace(/__TITLE__/g, data[index].title);
            template = template.replace(/__IMG__/g, data[index].image);
            mainBox.innerHTML += template;
        }
    }
}
