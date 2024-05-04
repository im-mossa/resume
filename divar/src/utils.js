// تابعی برای نمایش اطلاعات خانه و مغازه

function showInfo(item, type) {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.id = item.id;
    const priceInfo = type === "Residential sales" || type === "Administrative and commercial sales" || type === "Construction projects" ? `${item.totalPrice} تومان` : `اجاره: ${item.normalDayRental || item.monthlyRent} تومان`;
    
    let h5 = document.createElement("h5");
    h5.innerText = item.name;
    let p = document.createElement("p");
    p.innerText = priceInfo;
    let img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    img.style.width = "100%";
    img.style.height = "70%";
    
    itemDiv.appendChild(h5);
    itemDiv.appendChild(p);
    itemDiv.appendChild(img);
    
    const itemsDiv = document.getElementsByClassName("items")[0];
    itemsDiv.appendChild(itemDiv);
}
