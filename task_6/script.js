document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById('start-countdown');
    const countdownDisplay = document.getElementById('countdown-display');
    const countdownDateInput = document.getElementById('countdown-date');

    let countdownInterval;

    // Load saved countdown state
    loadCountdownState();

    startButton.addEventListener('click', () => {
        const countdownDate = new Date(countdownDateInput.value);
        if (isNaN(countdownDate.getTime())) {
            alert('Please select a valid date and time.');
            return;
        }

        // Save the selected date to localStorage
        localStorage.setItem('countdownDate', countdownDate);

        // Start the countdown
        startCountdown(countdownDate);
    });

    function startCountdown(endDate) {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const timeRemaining = endDate - now;

            if (timeRemaining < 0) {
                clearInterval(countdownInterval);
                notifyUser();
                countdownDisplay.textContent = "Countdown Complete!";
                localStorage.removeItem('countdownDate');
            } else {
                displayTime(timeRemaining);
            }
        }, 1000);
    }

    function displayTime(time) {
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    function notifyUser() {
        alert('Countdown has reached zero!');
    }

    function loadCountdownState() {
        const savedCountdownDate = localStorage.getItem('countdownDate');
        if (savedCountdownDate) {
            const endDate = new Date(savedCountdownDate);
            countdownDateInput.value = endDate.toISOString().slice(0, 16);
            startCountdown(endDate);
        }
    }
});
