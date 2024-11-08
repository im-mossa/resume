let pageIndex = 0
const pageSize = 6
window.stopLoading = false;

window.onload = async () => {
    await loadCategory();
    await loadPageData();
}

window.onscroll = async () => {
    let offSetTop2 = document.getElementById("product-box").lastChild.previousElementSibling.offsetTop;
    if (window.scrollY > offSetTop2 - 400 && !window.stopLoading) {
        ++pageIndex;
        await loadPageData();
    }
}

loadPageData = async () => {
    let catId = getParameterByName("catId");
    let catName = getParameterByName("catName");
    if (catId == undefined || catId == null) {
        await loadProducts(null, 'All', pageIndex, pageSize);
    } else {
        await loadProducts(null, 'Category', pageIndex, pageSize, catId, catName);
    }
}