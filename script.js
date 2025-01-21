let timeLeft;
let timerId = null;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const modeToggle = document.getElementById('mode-toggle');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function updateTimerMode() {
    const isRestMode = modeToggle.checked;
    timeLeft = isRestMode ? BREAK_TIME : WORK_TIME;
    updateDisplay();
}

function toggleTimer() {
    if (!isRunning) {
        // Start timer
        if (timeLeft === undefined) {
            timeLeft = modeToggle.checked ? BREAK_TIME : WORK_TIME;
        }
        startPauseButton.textContent = 'Pause';
        startPauseButton.classList.remove('start-btn');
        startPauseButton.classList.add('pause-btn');
        isRunning = true;
        
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                isRunning = false;
                updateTimerMode();
                startPauseButton.textContent = 'Start';
                startPauseButton.classList.remove('pause-btn');
                startPauseButton.classList.add('start-btn');
            }
        }, 1000);
    } else {
        // Pause timer
        clearInterval(timerId);
        timerId = null;
        isRunning = false;
        startPauseButton.textContent = 'Start';
        startPauseButton.classList.remove('pause-btn');
        startPauseButton.classList.add('start-btn');
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isRunning = false;
    updateTimerMode();
    startPauseButton.textContent = 'Start';
    startPauseButton.classList.remove('pause-btn');
    startPauseButton.classList.add('start-btn');
}

startPauseButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
modeToggle.addEventListener('change', updateTimerMode);

// Initialize the display
updateTimerMode(); 