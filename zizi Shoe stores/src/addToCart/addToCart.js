let cart = [];

// تابع برای افزودن آیتم به سبد خرید
function addToCart(item) {
    let quantityInput = document.getElementById("quantity-input");
    let selectSize = document.getElementById("select-size");

    if (!quantityInput || !selectSize) {
        console.error("عناصر ورودی مقدار و سایز پیدا نشدند.");
        return;
    }

    let quantity = parseInt(quantityInput.value, 10);
    let size = selectSize.value;

    if (!size) {
        alert("لطفا سایز مورد نظر را وارد کنید.");
        choose(item); // بازنشانی پنجره
        return;
    }

    let storedShoes = ShoeHandler.getDataList();
    let shoe = storedShoes.find(sh => sh.id === item.id);
    if (shoe && shoe.ShoeSizes && Object.keys(shoe.ShoeSizes).includes(size)) {
        if (shoe.ShoeSizes[size] < quantity) {
            alert(`موجودی کافی برای کالا وجود ندارد: ${item.title}, سایز: ${size}`);
            return; // ناکافی برای خرید
        }
        if (shoe.ShoeSizes[size] != typeof Number) {
            alert(`ورودی تعداد جفت کفش ها صحیح نیست!`);
            return; //ورودی اشتباه
        }
    } else {
        console.error(`Failed to find item in inventory: ${item.title}, size: ${size}`);
        return; // آیتم در موجودی یافت نشد
    }

    // افزودن آیتم به سبد خرید
    cart.push({
        ...item,
        quantity: quantity,
        size: size
    });

    // کاستن از موجودی
    shoe.ShoeSizes[size] -= quantity;

    // ذخیره سبد خرید در setSessionCookie
    setSessionCookie('cart', JSON.stringify(cart));

    // ذخیره کفش‌ها با مقادیر جدید در localStorage
    localStorage.setItem('stored', JSON.stringify(storedShoes));

    // بستن پنجره انتخاب و بازگشت به لیست کفش‌ها
    clearData();
}

// تابع برای محاسبه مجموع قیمت
function totalPrice() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// تابع برای نمایش سبد خرید
function displayCart() {
    let holder = document.getElementById("container-Shoes");

    let cartItemsContainer = document.getElementById("cart-items");
    if (!cartItemsContainer) {
        cartItemsContainer = document.createElement('div');
        cartItemsContainer.id = 'cart-items';
        cartItemsContainer.className = 'cart-holder';
        holder.appendChild(cartItemsContainer);
    } else {
        cartItemsContainer.innerHTML = ''; // خالی کردن محتوای قبلی
    }

    let redMultiplication = document.createElement("div");
    redMultiplication.innerHTML = `
        <a href="#" onclick="resetData()" class="float-left">
            <i class="fa fa-window-close" id="red-multiplication"></i>
        </a>`;
    cartItemsContainer.appendChild(redMultiplication);

    cart.forEach((cartItem, index) => {
        let cartItemDiv = document.createElement('div');
        cartItemDiv.style.direction = 'rtl';
        cartItemDiv.innerHTML = `
            <div class="cart-item">
                <img src="${cartItem.img}" alt="image" style="width:100px;height:70px;">
                <b>${cartItem.title}</b>
                <b> | قیمت هر جفت: ${cartItem.price} تومان</b>
                <span> | تعداد جفت: ${cartItem.quantity}</span>
                <span> | سایز: ${cartItem.size}</span>
                <a href="#container-Shoes" onclick="removeFromCart(${index})">
                    <i class="fa fa-times" style="font-size:24px;color:red" aria-hidden="true"></i>
                </a>
            </div>
            <hr>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    let PurchaseForm = document.createElement("div");
    PurchaseForm.id = "Purchase-form-holder"
    PurchaseForm.innerHTML = `
    <form onsubmit="processPayment(event)" name="buy-form" >
        <table>
        <thead><h3 style="text-align: center">تکمیل فرم خرید</h3></thead>
        <tbody>
            <tr>
                <td><label for="t-price">مجموع قیمت: </label></td><td><input type="number" name="t-price" id="t-price" class="Purchase-form" value="${totalPrice()}" disabled required></td>
            </tr>
            <tr>
                <td><label for="f-name">نام: </label></td><td><input type="text" name="f-name" id="f-name" class="Purchase-form" autocomplete="given-name" value="" required></td>
            </tr>
            <tr>
                <td><label for="l-name">نام خانوادگی: </label></td><td><input type="text" name="l-name" id="l-name" class="Purchase-form" autocomplete="family-name" value="" required></td>
            </tr>
            <tr>
                <td><label for="phone">شماره تماس: </label></td><td><input type="number" name="phone" id="phone" class="Purchase-form" autocomplete="tel" value="" required></td>
            </tr>
            <tr>
                <td><label for="address">آدرس: </label></td><td><input type="text" name="address" id="address" class="Purchase-form" autocomplete="street-address" value="" required></td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td></td><td><button class="reject" onclick="reject(event)" style="float: right;">انصراف</button></td><td><button class="Add-to-cart" onclick="resetData()">افزودن به سبد خرید</button></td><td><button type="submit" class="accept">درگاه پرداخت</button></td>
            </tr>
        </tfoot>
    </table>
    </form>
        `;
    cartItemsContainer.appendChild(PurchaseForm);
}

// تابع برای حذف آیتم از سبد خرید
function removeFromCart(index) {
    let cartItem = cart[index];
    let storedShoes = ShoeHandler.getDataList();

    let shoe = storedShoes.find(item => item.id === cartItem.id);
    if (shoe && shoe.ShoeSizes && Object.keys(shoe.ShoeSizes).includes(cartItem.size)) {
        shoe.ShoeSizes[cartItem.size] += parseInt(cartItem.quantity);
    } else {
        console.error(`Failed to find item in inventory: ${cartItem.title}, size: ${cartItem.size}`);
    }

    cart.splice(index, 1);
    setSessionCookie('cart', JSON.stringify(cart));
    localStorage.setItem('stored', JSON.stringify(storedShoes));
    displayCart();
}

function clearData() {
    document.getElementById("container-Shoes").innerHTML = '';

    // نمایش سبد خرید
    displayCart();
}

function processPayment(event) {
    event.preventDefault();
    

    // حذف سبد خرید از deleteCookie
    deleteCookie('cart');
    cart = [];

    alert('خرید با موفقیت انجام شد!');
    clearData();
    resetData();
}

function reject(event) {
    event.preventDefault(); // جلوگیری از پیش‌فرض ارسال فرم

    let storedShoes = ShoeHandler.getDataList();

    cart.forEach(cartItem => {
        let shoe = storedShoes.find(item => item.id === cartItem.id);
        if (shoe && shoe.ShoeSizes && Object.keys(shoe.ShoeSizes).includes(cartItem.size)) {
            shoe.ShoeSizes[cartItem.size] += parseInt(cartItem.quantity); // افزایش موجودی
        } else {
            console.error(`Failed to find item in inventory: ${cartItem.title}, size: ${cartItem.size}`);
            return; // آیتم در موجودی یافت نشد
        }
    });

    // ذخیره کفش‌ها با مقادیر جدید در localStorage
    localStorage.setItem('stored', JSON.stringify(storedShoes));

    // حذف سبد خرید از deleteCookie
    deleteCookie('cart');
    cart = [];
    resetData();
}


