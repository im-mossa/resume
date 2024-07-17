// تابع برای نمایش اطلاعات کامل یک کفش
function choose(item) {
    if (!item) {
        console.error("آیتم انتخاب شده نامعتبر است.");
        return;
    }

    // محاسبه موجودی انبار
    let totalInventory = Object.values(item.ShoeSizes).reduce((acc, quantity) => acc + quantity, 0);

    // تبدیل آبجکت shoeSizes به یک رشته قابل نمایش
    let shoeSizesString = Object.entries(item.ShoeSizes)
        .map(([size, quantity]) => `سایز ${size}: ${quantity} جفت`)
        .join(' | ');

    let SelectionWindow = `
        <div id="choose-holder" class="box-item" style="direction: rtl;">
            <div>
                <a href="#" onclick="resetData()" class="float-left">
                    <i class="fa fa-window-close" id="red-multiplication"></i>
                </a>
            </div>
            <div class="image-item">
                <img src="${item.img}" alt="image" width="" class="shoe-image">
            </div>
            <div class="box-item-info">
                <h3 style="text-decoration: none;">${item.title}</h3>
                <br>
                <b> قیمت : ${item.price} تومان</b>
                <br>
                <span> فروشگاه : ${item.agency}</span>
                <br>
                <span> برند : ${item.brand}</span>
                <br>
                <span> موجودی انبار : ${totalInventory}</span>
                <br>
                <span> نوع کفش : ${item.shoeType}</span>
                <br>
                <span> جنس کفش : ${item.material}</span>
                <br>
                <span> مواد زیره : ${item.soleMaterial}</span>
                <br>
                <span> ویژگی های کفش : ${item.SoleFeatures}</span>
                <br>
                <span> کفی : ${item.insole}</span>
                <br>
                <span> ویژگی های ویژه کفش : ${item.SpecialFeaturesOfShoes}</span>
                <br>
                <span>اندازه های کفش - موجودی: ${shoeSizesString}</span>
                <br>
                <hr>
                <table>
                    <thead>
                        <tr>
                            <td colspan="2"><h3 style="text-align: center">فرم خرید</h3></td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><label for="select-size">سایز: </label></td><td><select id="select-size" class="Purchase-form">
                    <option value="" class="option-size" selected disabled>تعیین سایز</option>
                    ${Object.entries(item.ShoeSizes)
                        .filter(([size, quantity]) => quantity > 0)
                        .map(([size, quantity]) => `<option value="${size}" data-quantity="${quantity}" class="option-size">سایز ${size}</option>`)
                        .join('')}
                </select></td>
                        </tr>
                        <tr>
                            <td><label for="quantity-input">تعداد جفت: </label></td><td><input type="number" id="quantity-input" class="Purchase-form" min="1" value="1"></td>
                        </tr>
                    </tbody>
                    <tfoot>
                            <tr>
                                <td><button class="accept" onclick='addToCart(${JSON.stringify(item)})'>افزودن به سبد خرید</button></td><td><button class="reject" onclick="resetData()">انصراف</button></td>
                            </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    `;

    let holder = document.getElementById("container-Shoes");
    holder.innerHTML = SelectionWindow;

    // افزودن رویداد تغییر برای انتخاب سایز
    document.getElementById('select-size').addEventListener('change', function() {
        let selectedOption = this.options[this.selectedIndex];
        let maxQuantity = selectedOption.getAttribute('data-quantity');
        let quantityInput = document.getElementById('quantity-input');
        quantityInput.max = maxQuantity;
        quantityInput.value = 1; // تنظیم مقدار پیش‌فرض به 1
        quantityInput.min = 1; // تنظیم مقدار حداقل به 1
    });

    // فراخوانی تغییر رویداد برای تنظیم اولیه max و value input
    document.getElementById('select-size').dispatchEvent(new Event('change'));
}
