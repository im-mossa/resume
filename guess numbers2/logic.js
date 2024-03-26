let number = 0;
let health = 5;
const Result = document.getElementById("Result");

function showMessage(message) {
    Result.innerHTML = message;
}
function generateRandomNumber() {
    number = Math.floor(Math.random() * 10);
}
window.onload = function() {
    generateRandomNumber();
}
function guessNumber() {
    const guessed = document.getElementById("guessNumber").value;
    if (guessed == "") {
        showMessage("Please enter the desired number.");
        return;
    } else if(guessed == number && health > 0) {
        if(confirm("you win! Do you want to play again?")) {
            reset();
        }
    } else if(guessed < number) {
        showMessage("its to small");
        decreaseHealth();
    } else if (guessed > number) {
        showMessage("its to big");
        decreaseHealth();
    }
}
function decreaseHealth() {
    if (health <= 1) {
        if(confirm("You lost! Do you want to play again?")) {
            reset();
            }
        return
    }
    const healthEle = document.getElementById("heart" + health);
    healthEle.src = "./src/image/heart-off.png";
    health--;
}
function reset() {
    generateRandomNumber();
    health = 5;   
    for(let index =1 ; index < 6; index++) {
        const healthEle1 = document.getElementById("heart" + index);
        healthEle1.src = "./src/image/heart.png";
        document.getElementById("guessNumber").value = "";
        showMessage("");
    }
}