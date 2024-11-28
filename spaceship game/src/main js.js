// گرفتن عناصر موشک و دشمن از DOM
const spaceship = document.getElementById('spaceship');
const enemy = document.getElementById('enemy');

let health = 5; // مقدار اولیه جان‌ها
let collisionDetected = false; // فلگ برای بررسی برخورد

// تابع برای حرکت موشک با موس
function moveSpaceship(x, y) {
    spaceship.style.position = 'absolute'; // تنظیم موقعیت موشک به حالت مطلق
    spaceship.style.left = `${x}px`; // تنظیم موقعیت افقی موشک
    spaceship.style.top = `${y}px`; // تنظیم موقعیت عمودی موشک
}

// گوش دادن به حرکت موس
document.addEventListener('mousemove', (e) => {
    moveSpaceship(e.clientX, e.clientY);
});

// گوش دادن به حرکت لمسی
document.addEventListener('touchmove', (e) => {
    e.preventDefault(); // جلوگیری از رفتار پیش‌فرض مرورگر
    const touch = e.touches[0];
    moveSpaceship(touch.clientX, touch.clientY);
});

// تابعی برای تغییر تصویر موشک
let num = 1;
function spaceshipImg() {
    spaceship.src = `./src/assets/rocket${num}.png`;
    num = (num % 10) + 1; // بازنشانی شماره تصویر بین 1 تا 10
}
setInterval(spaceshipImg, 50); // تغییر تصویر موشک هر 50 میلی‌ثانیه

let enemyTop = -20; // موقعیت اولیه دشمن
let guessNum = Math.floor((Math.random() * 5) + 1); // انتخاب تصادفی عدد بین 1 تا 5 برای تصویر دشمن
let guessLeftMargin = Math.floor(Math.random() * (window.innerWidth - enemy.clientWidth)); // مقدار تصادفی برای موقعیت افقی دشمن

// تابعی برای انیمیشن دشمن
function enemyImg() {
    enemy.style.position = 'absolute'; // تنظیم موقعیت دشمن به حالت مطلق
    enemy.style.top = `${enemyTop}px`; // تنظیم موقعیت عمودی دشمن
    enemyTop++;

    if (enemyTop > window.innerHeight) { // اگر دشمن به پایین صفحه رسید
        resetEnemyPosition(); // بازنشانی موقعیت دشمن
    }

    enemy.src = `./src/assets/enemy${guessNum}.png`;
    enemy.style.left = `${guessLeftMargin}px`; // تنظیم موقعیت افقی دشمن

    checkCollision(); // بررسی برخورد
}
setInterval(enemyImg, 2); // انیمیشن دشمن هر 2 میلی‌ثانیه

// تابعی برای بازنشانی موقعیت دشمن
function resetEnemyPosition() {
    enemyTop = -20;
    guessLeftMargin = Math.floor(Math.random() * (window.innerWidth - enemy.clientWidth));
    guessNum = Math.floor((Math.random() * 5) + 1);
}

// تابعی برای بررسی برخورد موشک و دشمن
function checkCollision() {
    const spaceshipRect = spaceship.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    if (spaceshipRect.left < enemyRect.right && spaceshipRect.right > enemyRect.left &&
        spaceshipRect.top < enemyRect.bottom && spaceshipRect.bottom > enemyRect.top) {
        if (!collisionDetected) { // بررسی فلگ برخورد برای جلوگیری از کاهش چندین جان در یک فریم
            collisionDetected = true; // تنظیم فلگ برخورد به true
            decreaseHealth(); // کاهش جان در صورت برخورد
        }
    } else {
        collisionDetected = false; // تنظیم فلگ برخورد به false اگر برخوردی تشخیص داده نشود
    }
}

// تابعی برای کاهش جان
function decreaseHealth() {
    if (health > 1) {
        document.getElementById(`heart${health}`).src = "./src/assets/heart-off.png";
        health--;
    } else {
        if (confirm("شما باختید! آیا می‌خواهید دوباره بازی کنید؟")) {
            resetGame();
        }
    }
}

// تابعی برای بازنشانی بازی
function resetGame() {
    health = 5;
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`heart${i}`).src = "./src/assets/heart.png";
    }
    resetEnemyPosition(); // بازنشانی موقعیت دشمن در شروع مجدد بازی
}
