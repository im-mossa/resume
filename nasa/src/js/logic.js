function loadFile() {
    const url = new Url().getApiUrl();
    const handler = new ApiHandler();
    const post = document.getElementById("post");
    const holder = document.createElement("div");

    function removeDoubleQuotes(url) {
        return url ? url.replace(/"/g, '') : ''; // حذف تمام دابل کوتیشن‌ها یا برگرداندن رشته خالی در صورت undefined بودن
    }

    handler.getData(url, function (data) {
        const template = `
            <div class="template">
                <h3>__TITLE__</h3>
                <img src="__IMG__" alt="This is an image">
                <p>__EXPLANATION__</p>
            </div>`;

        data.forEach(element => {
            let currentItemTemplate = template;
            let currentItem = element;

            // بررسی مقدار currentItem.img برای جلوگیری از خطا
            // debugger;
            // const img = currentItem.img ? removeDoubleQuotes(currentItem.url) : 'https://apod.nasa.gov/apod/image/1410/amsiss_sts134_1080.jpg'; // جایگزینی تصویر پیش‌فرض در صورت undefined بودن
            // debugger;

            currentItemTemplate = currentItemTemplate.replace("__TITLE__", currentItem.title || "No Title");
            currentItemTemplate = currentItemTemplate.replace("__IMG__", removeDoubleQuotes(currentItem.url) || 'https://apod.nasa.gov/apod/image/1410/amsiss_sts134_1080.jpg');
            currentItemTemplate = currentItemTemplate.replace("__EXPLANATION__", currentItem.explanation || "No explanation available.");

            // ایجاد یک div جدید برای هر آیتم
            const itemDiv = document.createElement('div');
            itemDiv.className = "itemDiv";
            itemDiv.innerHTML = currentItemTemplate;

            // اضافه کردن itemDiv به holder
            holder.appendChild(itemDiv);
        });

        // اضافه کردن holder به post بعد از تکمیل حلقه
        post.appendChild(holder);

        console.log(data);
    }, function (error) {
        console.log(error);
    });
}

// window.onload = () => loadFile();


// data.forEach(element => {
//     console.log(element);
// });