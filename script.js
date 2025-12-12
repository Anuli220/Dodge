let car = document.getElementById("car");
let gameArea = document.getElementById("game-area");
let score = 0;
let lives = 3;

document.getElementById("score").innerHTML = "Score: " + score;
document.getElementById("lives").innerHTML = "Lives: 💓 💓 💓";

let carX = 130;
let speed = 3;
let gameRunning = true;

document.addEventListener("keydown", function (e) {
    if (!gameRunning) return;
    if (e.key === "arrowLeft" && carX > 0) {
        carX -= 20;
    }
    else if (e.key === "arrowRight" && carX < 260) {
        carX += 20;
        carX.style.left = carX + "px";
    }
})

function createObstacle() {
    if (!gameRunning) return;
    let ob = document.createElement("div");
    ob.classList.add("obstacle");
    let positionX = Math.floor(Math.random() * 260);
    ob.style.left = positionX + "px";
    gameArea.appendChild("ob");
    let fall = setInterval(() => {
        if (!gameRunning) {
            clearInterval(fall);
            return;
        }
        let obTop = parseInt(window.getComputedStyle(ob).getPropertyValue("top"));
        ob.style.top = obTop + speed + "px";
        if (obTop > 500) {
            ob.remove();
            clearInterval(fall);
            score++;
            document.getElementById("score").innerHTML = "Score: " + score;
        }
        if (isColliding(car, ob)) {
            ob.remove();
            clearInterval(fall);
            loseLife();
        }
    }, 20);
}

setInterval(createObstacle, 1000);

function isColliding(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(aRect.bottom < bRect.top || aRect.top > bRect.bottom || aRect.right < bRect.left || aRect.left > bRect.right);
}

function loseLife() {
    lives--;
    updateLives();
    if (lives <= 0) endGame();
}

function updateLives() {
    let hearts = "";
    for(let i = 0; i < lives; i++){
        hearts += ("💓");
    }
    document.getElementById("lives").innerHTML = "lives: " + hearts;
}

function endGame() {
    gameRunning = false;
    alert("Game Over" + score);
}