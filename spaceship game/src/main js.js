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






////////////////////////////////////////////////////////////////////کد اصلی///////////////////////////////////////////////////////////////

// let rocket = document.getElementById('rocket');
// let enemy = document.getElementById('enemy');

// // Event listener for mouse movement to move the rocket image
// document.addEventListener('mousemove', function(e) {
//     let mouseX = e.clientX;
//     let mouseY = e.clientY;

//     // Set the rocket position to follow the mouse position
//     rocket.style.position = 'absolute';
//     rocket.style.left = mouseX + 'px';
//     rocket.style.top = mouseY + 'px';
// });

// // Initialize the frame counter for the rocket images
// let num = 1;

// // Function to change the rocket image periodically
// function rocketImg() {
//     // Construct the new image source path
//     let rocketSRC = "./src/assets/rocket" + num + ".png";
//     num++;
    
//     // Reset the counter if it exceeds the number of available images
//     if (num > 10) {
//         num = 1;
//     }
    
//     // Set the new image source for the rocket
//     rocket.setAttribute("src", rocketSRC);
// }

// // Set an interval to change the rocket image every 50 milliseconds
// let rocketInt = setInterval(rocketImg, 50);

// // Initialize enemy position and random image variables
// let enemyTop = -20;
// let guessNum = Math.floor((Math.random() * 5) + 1); // Random number between 1 and 5
// let guessLeftMargin = Math.floor(Math.random() * (window.innerWidth - enemy.clientWidth));

// // Function to animate the enemy image
// function enemyImg() {
//     // Update the enemy's position on the screen
//     enemy.style.position = 'absolute';
//     enemy.style.top = enemyTop + "px";
//     enemyTop++;

//     // If the enemy reaches the bottom of the screen, reset its position and randomize attributes
//     if (enemyTop > 1000) {
//         enemyTop = -20;
//         guessLeftMargin = Math.floor(Math.random() * (window.innerWidth - enemy.clientWidth));
//         guessNum = Math.floor((Math.random() * 5) + 1); // Random number between 1 and 5
//     }

//     // Set the new image source for the enemy
//     let enemySRC = "./src/assets/enemy" + guessNum + ".png";
//     enemy.setAttribute("src", enemySRC);
//     enemy.style.left = guessLeftMargin + "px";
    
//     // Log the enemy image source to the console for debugging
//     console.log(enemySRC);
// }

// // Set an interval to animate the enemy image every 2 milliseconds
// let enemyInt = setInterval(enemyImg, 2);

// let health = 5;
// if( rocket.style.left == enemy.style.left && rocket.style.top == enemy.style.top) {
//     decreaseHealth();
// }

// function decreaseHealth() {
//     if (health < 1) {
//         if(confirm("You lost! Do you want to play again?")) {
//             reset();
//             }
//         return
//     }
//     const healthEle = document.getElementById("heart" + health);
//     healthEle.src = "./src/assets/heart-off.png";
//     health--;
// }

// function reset() {
//     health = 5;   
//     for(let index =1 ; index < 6; index++) {
//         const healthEle1 = document.getElementById("heart" + index);
//         healthEle1.src = "./src/assets/heart.png";
//     }
// }