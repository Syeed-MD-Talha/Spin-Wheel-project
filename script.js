// DOM Elements
const container = document.querySelector(".container");
const spinButton = document.getElementById("spin");
const nameInput = document.getElementById('names');
const result = document.getElementById('result');

// Variables
let spinNumber = 0;

// ...............Getting Random color for segment ...........
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
//............. Creating Segment for wheel .................
function updateWheel() {
    const segments = document.querySelectorAll(".container .username");
    const segmentCount = segments.length;
    const anglePerSegment = 360 / segmentCount;

    segments.forEach((segment, index) => {
        const color = getRandomColor();
        const angle = anglePerSegment * index;
        segment.style.backgroundColor = color;
        segment.style.transform = `rotate(${angle}deg)`;
    });
}

//............... fetching data from html file ..............
function populateNameList() {
    const names = nameInput.value.trim().split('\n');
    const nameList = document.querySelector('.container');
    nameList.innerHTML = '';

    names.forEach(name => {
        const element = document.createElement('div');
        element.className = 'username';
        element.innerHTML = `<p>${name}</p>`;
        nameList.appendChild(element);
    });

    updateWheel();
}


function spinWheel() {
    spinNumber += Math.ceil(Math.random() * 1000);
    container.style.transform = `rotate(${spinNumber}deg)`;

    setTimeout(() => {
        const img = document.getElementById('highZImage');
        const rect = img.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        findWinnerAtPosition(x, y);
    }, 2000);
}

function findWinnerAtPosition(x, y) {
    const elements = document.elementsFromPoint(x, y);
    result.style.display = 'block';
	result.style.opacity = '1';

    const winnerElement = elements.find(el => el.classList.contains('username'));
    if (winnerElement) {
        const pTag = winnerElement.querySelector('p');
        result.innerHTML = pTag ? `"${pTag.textContent}" is Winner!` : 'Winner element found, but no <p> tag inside.';
    } else {
        result.innerHTML = 'No winner found at this position.';
    }
     
}

function initializeNameList() {
    const values = document.querySelectorAll(".container .username");
    const lists = Array.from(values).map(element => element.innerText).join('\n');
    nameInput.value = lists;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeNameList();
    updateWheel();
});

nameInput.addEventListener('input', populateNameList);
spinButton.addEventListener('click', spinWheel);