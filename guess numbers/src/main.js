const buttonArea = document.getElementById("buttonArea");
let ranNumber = Math.trunc(Math.random() * 10);
let lives = 4;
let currentIndex = 0;

function loadImageFromSource(imageSrc) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => resolve(image);
        image.onerror = reject;
    });
}

async function changeImages() {
    const images = document.querySelectorAll(".redHeart");
    const newImageSrc = 'src/image/black heart1.png';
    const newImage = await loadImageFromSource(newImageSrc);
    images[currentIndex].src = newImageSrc;
    images[currentIndex].classList.add("blueHeart");
    currentIndex++;
}

buttonArea.addEventListener("click", () => {
    const userGuess = document.getElementById("userguess").value;
    const showResult = document.querySelector("#Result");
    if (lives > 0) {
        if (userGuess) {
            if (userGuess >= 0 && userGuess <= 10) {
                if (userGuess > ranNumber) {
                    document.querySelector("#game").style.backgroundColor = "rgb(231, 120, 120)";
                    document.querySelector("#body").style.backgroundColor = "red";
                    showResult.innerHTML = "It's big!";
                    lives--;
                    changeImages();
                } else if (userGuess < ranNumber) {
                    showResult.innerHTML = "it's small!";
                    document.querySelector("#game").style.backgroundColor = "red";
                    document.querySelector("#body").style.backgroundColor = "rgb(231, 120, 120)";
                    lives--;
                    changeImages();
                } else {
                    document.querySelector("#game").style.backgroundColor = "green";
                    document.querySelector("#body").style.backgroundColor = "rgb(15, 201, 15)";
                    showResult.innerHTML = "you win!!!";
                    document.querySelector("#userguess").disabled = true;
                    buttonArea.style.display = "none"
                    document.getElementById("startGame").style.display = "block";
                }
            } else {
                showResult.innerHTML = "Please enter a number between 1-10.";
            }
        } else {
            showResult.innerHTML = "Please enter the desired number.";
        }
    } else {
        showResult.innerHTML = "You lost!";
        changeImages();
        document.querySelector("#userguess").disabled = true;
        buttonArea.style.display = "none"
        document.getElementById("startGame").style.display = "block";
    }
});
