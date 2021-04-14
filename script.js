const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

let randomWord;

let score = 0;

let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

//Update score
function updateScore() {
    score++;

    scoreEl.innerHTML = score;
}

//Update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);
        //End game
        gameOver();
    }
}

function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
}

//Add word to DOM
function addWordToDOM() {
    fetch('https://random-word-api.herokuapp.com//word?number=1')
        .then(response => response.json())
        .then(data => {
            word.innerHTML = data[0];
            randomWord = data[0];
        });
}

addWordToDOM();

//Event Listeners
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        e.target.value = '';
        updateScore();

        if (difficulty === 'hard') {
            time += 2;
        }
        else if (difficulty === 'medium') {
            time += 3;
        }
        else {
            time += 5;
        }
        updateTime();
    }
});

settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
});

//Selecting difficulty
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});