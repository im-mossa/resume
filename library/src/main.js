const books = []; // آرایه‌ای برای نگهداری کتاب‌ها

function addBook() {
    const bookInput = document.getElementById("book-input");
    const bookName = bookInput.value.trim(); // حذف فضاهای اضافی از ابتدا و انتهای رشته

    // بررسی اگر نام کتاب خالی باشد، هشدار دهید
    if (bookName === "") {
        alert("لطفاً نام کتاب را وارد کنید.");
        return; // اجرای بیشتر از این نداریم، بنابراین توابع بعدی اجرا نمی‌شوند
    }

    // بررسی اگر کتاب با این نام قبلاً ثبت شده باشد، هشدار دهید
    if (books.some(book => book.name === bookName)) {
        alert("این کتاب قبلاً ثبت شده است.");
        return; // اجرای بیشتر از این نداریم، بنابراین توابع بعدی اجرا نمی‌شوند
    }

    const bookCode = Date.now(); // ایجاد کد یکتا برای کتاب
    const book = { name: bookName, code: bookCode }; // ایجاد شیء کتاب جدید
    books.push(book); // اضافه کردن کتاب به آرایه کتاب‌ها
    updateInventory(); // به روزرسانی لیست کتاب‌ها
    bookInput.value = ""; // پاک کردن محتوای ورودی نام کتاب
}

document.getElementById("delete").addEventListener("click", function() {
    deleteBook(bookCode);
});

function deleteBook(bookCode) {
    console.log("bookCode:", bookCode);
    const index = books.findIndex(book => book.code === bookCode);
    console.log("index:", index);
    if (index !== -1) {
        books.splice(index, 1);
        updateInventory();
    }
}

function updateInventory() {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = ""; // پاک کردن محتوای قبلی
    books.forEach(book => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        const codeCell = document.createElement("td");
        nameCell.textContent = book.name; // تنظیم متن سلول نام کتاب با نام کتاب موجود در شیء کتاب
        codeCell.textContent = book.code;
        row.appendChild(nameCell);
        row.appendChild(codeCell);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "حذف کتاب";
        deleteButton.classList.add("btn", "btn-delete");
        deleteButton.addEventListener("click", function() {
            deleteBook(book.code);
        });
        row.appendChild(deleteButton);
        tbody.appendChild(row);
    });
}
