// Global Variables
let currentMonthIndex = 0; // Start with January
const monthGroups = document.querySelectorAll('.month-group');
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Initialize the calendar display
function initializeCalendar() {
    monthGroups.forEach((group, index) => group.style.display = index === 0 ? 'block' : 'none');
    updateMonthYearDisplay();
}

// Update the display for the month and year
function updateMonthYearDisplay() {
    document.getElementById('monthYear').textContent = monthNames[currentMonthIndex] + ' 2024';
}

// Change to a specific month
function changeMonth(newIndex) {
    const oldMonth = monthGroups[currentMonthIndex];
    const newMonth = monthGroups[newIndex];

    // Animate out the current month
    oldMonth.style.animationName = 'fadeOut';

    // Wait for half the duration of the animation before changing the month
    setTimeout(() => {
        oldMonth.style.display = 'none';
        oldMonth.style.animationName = '';

        // Animate in the new month
        newMonth.style.display = 'block';
        newMonth.style.animationName = 'fadeIn';

        currentMonthIndex = newIndex;
        updateMonthYearDisplay();

        // Reset the animation class after it completes
        setTimeout(() => newMonth.style.animationName = '', 500);
    }, 250); // This delay should be half of the animation-duration
}



// Event Listeners for Navigation
document.getElementById('prevMonth').addEventListener('click', () => {
    if (currentMonthIndex > 0) changeMonth(currentMonthIndex - 1);
});

document.getElementById('nextMonth').addEventListener('click', () => {
    if (currentMonthIndex < monthGroups.length - 1) changeMonth(currentMonthIndex + 1);
});

// Modal Open and Close Handlers
function openModal() {
    document.querySelector('.modal-container').style.display = 'block';
    document.querySelector('.modal').style.display = 'block';
}

function closeModal() {
    document.querySelector('.modal-container').style.display = 'none';
    document.querySelector('.modal').style.display = 'none';
}

// Event Listeners for Modal
document.getElementById('monthYear').addEventListener('click', openModal);
document.querySelector('.close').addEventListener('click', closeModal);
window.onclick = (event) => {
    if (event.target.classList.contains('modal-container')) closeModal();
};

// Navigate to month when clicked in modal
document.querySelectorAll('.month-container, .month-preview').forEach(month => {
    month.addEventListener('click', function () {
        changeMonth(parseInt(this.getAttribute('data-month')));
        closeModal();
    });
});

// Initialize Calendar on Load
initializeCalendar();
