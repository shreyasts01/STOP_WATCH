let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById("display");
const lapList = document.getElementById("lapList");

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    display.innerHTML = (hours < 10 ? "0" : "") + hours + ":" +
                        (minutes < 10 ? "0" : "") + minutes + ":" +
                        (seconds < 10 ? "0" : "") + seconds + ":" +
                        (milliseconds < 10 ? "0" : "") + milliseconds; 
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    display.innerHTML = "00:00:00:00"; 
    difference = 0;
    running = false;
    lapCounter = 1;
    lapList.innerHTML = ""; 
}

function recordLap() {
    if (running) {
        const lapTime = display.innerHTML;
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}


document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);
