let result1Ele = document.getElementById("result-body");
const submitBtn = document.getElementById("submit-btn");
const btn1Ele1 = document.getElementById("btn2");
let sumEle = document.createElement("div");
let sum = 0;
submitBtn.onclick = function() {
    const customerNameEle = document.querySelector(".customerName");
    const productName = document.querySelector(".productName");
    const productQTY = document.querySelector(".productQTY");
    const productPrice = document.querySelector(".productPrice");
    let currentSum = productPrice.value * productQTY.value;
    const tfoot = document.getElementById("tfoot");
    // const newTr = document.createElement("tr");
    // const newTd = document.createElement("td");
    // newTd.innerText = productName;
    // newTr.appendChild(newTd);
    // result1Ele.appendChild(newTr);
    let newRecord = "<tr>";
    newRecord += "<td>" + productName.value +"</td>";
    newRecord += "<td>" + productPrice.value +"</td>";
    newRecord += "<td>" + productQTY.value +"</td>";
    newRecord += "<td>" + currentSum +"</td>";
    newRecord += "</tr>";
    result1Ele.innerHTML += newRecord;
    customerNameEle.readonly = "readonly";
    customerNameEle.disabled = "disabled";
    productName.value = "";
    productPrice.value = "";
    productQTY.value = "";
    sum += currentSum;
    sumEle.style.display = "block"
    sumEle.style.textAlign = "left";
    sumEle.innerText = "مجموع مبلغ قابل پرداخت: " + sum + "هزار تومان";
    tfoot.appendChild(sumEle);
    btn1Ele1.style.display = "block";
    btn1Ele1.onclick = function () {
        window.print();
    }
};