let selectedSize = null;
let selectedColor = null;
let currentProduct = null;
window.onload = async () => {
    let id = getParameterByName("id");
    const productApi = new ProductApi();
    await productApi.getById(id, function (dataList) {
        data = dataList[0];
        currentProduct = data;
        // productImage
        document.getElementById("product-image").src = data.image;
        // productTitle
        document.getElementById("product-title").innerHTML = 
        `${data.category.title} - ${data.title}`;
        // productPrice
        document.getElementById("product-price").innerHTML = data.price;
        // productDescription
        document.getElementById("description").innerHTML = data.description;
        // productColor
        const colors = document.getElementById("colors");
        const colorsTemplate = document.getElementById("product-color-template").innerHTML;
        colors.innerHTML = "";
        for (let index = 0; index < data.colors.length; index++) {
            let template = colorsTemplate;
            template = template.replace(/__TITLE__/g, data.colors[index].title);
            template = template.replace(/__ID__/g, data.colors[index].id);
            template = template.replace(/__HEXVALUE__/g, data.colors[index].hexValue);
            colors.innerHTML += template;
        }
        // productSize
        const sizesEle = document.getElementById("sizes");
        const sizesTemplate = document.getElementById("product-size-template").innerHTML;
        sizes.innerHTML = "";
        for (let index = 0; index < data.sizes.length; index++) {
            let template = sizesTemplate;
            template = template.replace(/__TITLE__/g, data.sizes[index].title);
            template = template.replace(/__ID__/g, data.sizes[index].id);
            sizesEle.innerHTML += template;
        }
    });
}
changeSize = (ele, id, title) => {
    let oldsize = document.getElementsByClassName("product-size-selected");
    for (let index = 0; index < oldsize.length; index++) {
        oldsize[index].classList.remove("product-size-selected");
    }
    ele.children[0].classList.add("product-size-selected");
    selectedSize = {
        id: id,
        title: title,
    }
}
changeColor = (ele, id, title, hexValue) => {
    let oldcolor = document.getElementsByClassName("product-color-selected");
    for (let index = 0; index < oldcolor.length; index++) {
        oldcolor[index].classList.remove("product-color-selected");
    }
    ele.children[0].classList.add("product-color-selected");
    selectedColor = {
        id: id,
        title: title,
        hexValue: hexValue,
    }
}

let addToBasket = () => {
    if (selectedColor == null) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Selected Color!",
        });
        return;
    }
    if (selectedSize == null) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Selected Size!",
        });
        return;
    }
    BasketDB.addToBasket(currentProduct, selectedSize, selectedColor);
}