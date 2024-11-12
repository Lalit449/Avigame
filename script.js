let multiplier = 1.0;
let cash = 0;
let stake = 1;
let autoCashout = 0;
let gameRunning = false;
let gameInterval;
let plane;

const multiplierElement = document.getElementById('multiplier');
const cashElement = document.getElementById('cash');
const stakeElement = document.getElementById('stake');
const startBtn = document.getElementById('startBtn');
const cashoutBtn = document.getElementById('cashoutBtn');
const autoCashoutElement = document.getElementById('autoCashout');
const setAutoCashoutBtn = document.getElementById('setAutoCashoutBtn');
const planeElement = document.getElementById('plane');

// Start game function
function startGame() {
    if (gameRunning) return;  // Prevent starting multiple games at once

    gameRunning = true;
    multiplier = 1.0;
    plane = document.getElementById('plane');
    plane.style.transition = 'none';  // Reset transition to move the plane immediately

    // Show the cashout button when the game starts
    cashoutBtn.style.display = 'inline-block';

    // Update multiplier every 100ms
    gameInterval = setInterval(() => {
        if (multiplier >= 1000) {
            clearInterval(gameInterval);
            return;
        }
        multiplier += 0.01;
        multiplierElement.textContent = multiplier.toFixed(2) + 'x';
        
        // Check auto cashout condition
        if (autoCashout > 0 && multiplier >= autoCashout) {
            cashOut(); // Automatically cash out if multiplier exceeds autoCashout
        }
    }, 100);

    // Move the plane upward over time
    plane.style.transition = 'transform 2s ease-out';
    plane.style.transform = 'translate(-50%, -100vh)';  // Move plane upwards
}

// Cash out function
function cashOut() {
    clearInterval(gameInterval);
    gameRunning = false;

    const earnedAmount = stake * multiplier;
    cash += earnedAmount;
    cashElement.textContent = cash.toFixed(2);

    // Hide the cashout button after cashing out
    cashoutBtn.style.display = 'none';
    resetGame();
}

// Reset the game after cash out or crash
function resetGame() {
    plane.style.transition = 'none';
    plane.style.transform = 'translateX(-50%)';  // Reset plane position

    setTimeout(() => {
        plane.style.transition = 'transform 2s ease-out';
        plane.style.transform = 'translate(-50%, -100vh)';
    }, 100);

    multiplier = 1.0;
    multiplierElement.textContent = multiplier.toFixed(2) + 'x';
}

// Update stake and auto cashout settings
stakeElement.addEventListener('input', () => {
    stake = parseFloat(stakeElement.value);
});

setAutoCashoutBtn.addEventListener('click', () => {
    const autoCashoutValue = parseFloat(autoCashoutElement.value);
    if (!isNaN(autoCashoutValue) && autoCashoutValue >= 1) {
        autoCashout = autoCashoutValue;
        alert(`Auto Cashout set to ${autoCashout}x`);
    } else {
        alert('Please enter a valid number greater than or equal to 1');
    }
});

// Start button listener
startBtn.addEventListener('click', () => {
    if (!gameRunning) {
        startGame();
    } else {
        cashOut();
    }
});

// Cashout button listener
cashoutBtn.addEventListener('click', cashOut);