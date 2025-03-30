document.addEventListener("DOMContentLoaded", function () {
    const gameBox = document.getElementById("game-box");
    const startButton = document.getElementById("start-button");
    const levelSelect = document.getElementById("level");
    const scoreDisplay = document.getElementById("score");
    const timeLeftDisplay = document.getElementById("time-left");

    let score = 0;
    let gameInterval;
    let timer;
    let timeLeft = 30;

    // 🌙✨ Function to create stars & moon (Night Sky)
    function createStarsAndMoon() {
        gameBox.innerHTML = `<div class="moon"></div>`; // Adding the moon
        for (let i = 0; i < 25; i++) { // 25 stars
            const star = document.createElement("div");
            star.classList.add("star");
            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";
            gameBox.appendChild(star);
        }
    }

    function createBalloon() {
        const balloon = document.createElement("div");
        balloon.classList.add("balloon");

        // Random color for glowing balloons 🎈✨
        const colors = ["red", "blue", "green", "purple", "pink",  "cyan", "magenta", "lime", "teal"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.classList.add(randomColor);
        balloon.style.background = randomColor;
        balloon.style.boxShadow = `0 0 10px ${randomColor}`; // Glow effect

        // Set position & speed based on level
        const level = levelSelect.value;
        let speed;
        if (level === "easy") speed = 5000;
        else if (level === "medium") speed = 3500;
        else speed = 2500;

        // Prevent overlapping by checking nearby balloons
        let leftPosition;
        let attempts = 0;
        do {
            leftPosition = Math.random() * (gameBox.clientWidth - 50);
            attempts++;
        } while (isBalloonOverlapping(leftPosition) && attempts < 10);
        
        balloon.style.left = `${leftPosition}px`;
        balloon.style.bottom = "-70px";

        // Floating animation
        balloon.animate([{ bottom: "-70px" }, { bottom: "400px" }], { duration: speed, easing: "linear" });

        // 🎈 Pop animation
        balloon.addEventListener("click", function () {
            balloon.style.transform = "scale(1.3)";
            setTimeout(() => {
                gameBox.removeChild(balloon);
            }, 100);
            score++;
            scoreDisplay.textContent = score;
        });

        gameBox.appendChild(balloon);

        // Remove balloon after it reaches top
        setTimeout(() => {
            if (gameBox.contains(balloon)) gameBox.removeChild(balloon);
        }, speed);
    }

    // Function to check overlapping balloons
    function isBalloonOverlapping(newLeft) {
        const balloons = document.querySelectorAll(".balloon");
        for (let balloon of balloons) {
            const existingLeft = parseInt(balloon.style.left);
            if (Math.abs(existingLeft - newLeft) < 50) {
                return true; // Overlapping
            }
        }
        return false;
    }

    function startGame() {
        score = 0;
        scoreDisplay.textContent = score;
        timeLeft = 30;
        timeLeftDisplay.textContent = timeLeft;

        // 🌙✨ Add night sky effect
        createStarsAndMoon();

        // ✨ Button Click Animation
        startButton.classList.add("clicked");
        setTimeout(() => {
            startButton.classList.remove("clicked");
        }, 200);

        // Clear existing balloons
        gameBox.innerHTML += ""; 

        // Start generating balloons
        gameInterval = setInterval(createBalloon, 800);

        // Start Timer
        timer = setInterval(() => {
            timeLeft--;
            timeLeftDisplay.textContent = timeLeft + "s"; // Make timer look better

            if (timeLeft === 0) {
                endGame();
            }
        }, 1000);
    }
    function endGame() {
        clearInterval(gameInterval);
        clearInterval(timer);
    
        // Show Scoreboard
        const scoreBoard = document.createElement("div");
        scoreBoard.classList.add("score-board");
        scoreBoard.innerHTML = `<h2>Game Over!</h2><p>Your Score: ${score}</p>`;
    
        gameBox.appendChild(scoreBoard);
    
        // Automatically remove the scoreboard & restart the game after 3 seconds
        setTimeout(() => {
            scoreBoard.remove();
            restartGame();
        }, 3000);
    }
    
    function restartGame() {
        score = 0;
        timeLeft = 30;
        gameBox.innerHTML = ""; // Clear all balloons
        scoreDisplay.textContent = score;
        timeLeftDisplay.textContent = timeLeft;
    }
    
    function restartGame() {
        score = 0;
        timeLeft = 30;
        scoreDisplay.textContent = score;
        timeLeftDisplay.textContent = timeLeft;
        gameBox.innerHTML = ""; // Clear previous balloons
    }
    

    startButton.addEventListener("click", startGame);
});
