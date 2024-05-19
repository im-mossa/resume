// // Get the spaceship and enemy elements from the DOM
let spaceship = document.getElementById('spaceship');
let enemy = document.getElementById('enemy');

let health = 5;// Initial amount of lives
let collisionDetected = false; // Flag for collision checking

// Add an event listener for mouse movement so that the spaceship moves with the mouse
document.addEventListener('mousemove', function(e) {
    let mouseX = e.clientX; // X coordinates of the mouse
    let mouseY = e.clientY; // Y coordinates of the mouse
    
    spaceship.style.position = 'absolute'; // Set spaceship position to absolute
    spaceship.style.left = mouseX + 'px'; // Set the horizontal position of the spaceship
    spaceship.style.top = mouseY + 'px'; // تنظیم موقعیت عمودی موشک
});

// تابعی برای تغییر تصویر موشک به صورت دوره‌ای
let num = 1;
function spaceshipImg() {
    let spaceshipSRC = "./src/assets/rocket" + num + ".png";
    num++;
    if (num > 10) {
        num = 1;
    }
    spaceship.setAttribute("src", spaceshipSRC);
}

// تنظیم یک بازه زمانی برای تغییر تصویر موشک هر 50 میلی‌ثانیه
let spaceshipInt = setInterval(spaceshipImg, 50);

let enemyTop = -20; // موقعیت اولیه دشمن
let guessNum = Math.floor((Math.random() * 5) + 1); // عدد تصادفی بین 1 تا 5 برای انتخاب تصویر دشمن
let guessLeftMargin = Math.floor(Math.random() * (window.innerWidth - enemy.clientWidth)); // مقدار تصادفی برای موقعیت افقی دشمن

// تابعی برای انیمیشن دشمن
function enemyImg() {
    enemy.style.position = 'absolute'; // تنظیم موقعیت دشمن به حالت مطلق
    enemy.style.top = enemyTop + "px"; // تنظیم موقعیت عمودی دشمن
    enemyTop++;

    if (enemyTop > 1000) { // اگر دشمن به پایین صفحه رسید
        enemyTop = -20; // بازنشانی موقعیت عمودی دشمن
        guessLeftMargin = Math.floor(Math.random() * (window.innerWidth - enemy.clientWidth)); // مقدار تصادفی جدید برای موقعیت افقی دشمن
        guessNum = Math.floor((Math.random() * 5) + 1); // عدد تصادفی جدید بین 1 تا 5 برای تصویر دشمن
    }

    let enemySRC = "./src/assets/enemy" + guessNum + ".png";
    enemy.setAttribute("src", enemySRC);
    enemy.style.left = guessLeftMargin + "px"; // تنظیم موقعیت افقی دشمن

    checkCollision(); // فراخوانی تابع بررسی برخورد
}

// تنظیم یک بازه زمانی برای انیمیشن دشمن هر 2 میلی‌ثانیه
let enemyInt = setInterval(enemyImg, 2);

// تابعی برای بررسی برخورد موشک و دشمن
function checkCollision() {
    let spaceshipRect = spaceship.getBoundingClientRect(); // دریافت مختصات موشک
    let enemyRect = enemy.getBoundingClientRect(); // دریافت مختصات دشمن

    if (spaceshipRect.left < enemyRect.right && spaceshipRect.right > enemyRect.left &&
        spaceshipRect.top < enemyRect.bottom && spaceshipRect.bottom > enemyRect.top) {
        if (!collisionDetected) { // بررسی پرچم برخورد برای جلوگیری از کاهش چندین جان در یک فریم
            collisionDetected = true; // تنظیم پرچم برخورد به true
            decreaseHealth(); // کاهش جان در صورت برخورد
        }
    } else {
        collisionDetected = false; // تنظیم پرچم برخورد به false اگر برخوردی تشخیص داده نشود
    }
}

// تابعی برای کاهش جان
function decreaseHealth() {
    if (health > 1) { // اگر جان بیشتر از یک باشد، کاهش جان انجام شود
        const healthEle = document.getElementById("heart" + health); // دریافت عنصر مربوط به جان فعلی
        healthEle.src = "./src/assets/heart-off.png"; // تغییر تصویر جان به حالت خاموش
        health--; // کاهش مقدار جان
    } else { // اگر جان برابر یک باشد، نمایش پیام باخت
        if (confirm("شما باختید! آیا می‌خواهید دوباره بازی کنید؟")) { // نمایش پیام تایید برای شروع مجدد بازی
            reset(); // بازنشانی بازی
        }
    }
}

// تابعی برای بازنشانی بازی
function reset() {
    health = 5; // بازنشانی مقدار جان به 5
    for (let index = 1; index <= 5; index++) {
        const healthEle1 = document.getElementById("heart" + index); // دریافت عناصر جان‌ها
        healthEle1.src = "./src/assets/heart.png"; // تنظیم تصویر جان‌ها به حالت روشن
    }
}
