let currentDoor = { sully: null, randall: null };
let score = 0;
let isGameOver = false;
document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");

    for (let i = 0; i < 9; i++) {
        const door = document.createElement("div");
        door.id = i;
        door.addEventListener("click", selectDoor);
        board.appendChild(door);
    }

    setInterval(() => setCharacter("sully"), 1500);
    setInterval(() => setCharacter("randall"), 2000);
});

const setCharacter = (character) => {
    const randomDoor = getRandomDoor();

    if (isDoorOccupied(randomDoor)) return;

    const img = document.createElement("img");
    img.src = `./images/${character}.png`;
    const Door = document.getElementById(randomDoor);
    Door.appendChild(img);
    currentDoor[character] = Door;
    setTimeout(() => clearDoor(character), 1000);
};

const isDoorOccupied = (randomDoor) =>
    currentDoor.sully?.id === randomDoor ||
    currentDoor.randall?.id === randomDoor;

const clearDoor = (character) => {
    if (currentDoor[character]) currentDoor[character].innerHTML = "";
};

const selectDoor = (e) => {
    const scoreElement = document.querySelector("#score");
    if (e.target.children.length === 0) {
        console.log("door is empty");
    } else if (e.target === currentDoor.sully) {
        score = score + 10;
        scoreElement.textContent = score;
        clearDoor("sully");
    } else if (e.target === currentDoor.randall) {
        scoreElement.textContent = `GAME OVER: ${score}`;
    }
};

const showRestartButton = () => {
    const restart = document.getElementById("restart");
    restart.classList.add("active");
    restart.addEventListener("click", restartGame);
};

const getRandomDoor = () => Math.floor(Math.random() * 9).toString();
