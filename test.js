const GAME_TIME = 20;
const ZOMBIE_ATTACK_TIME = 3;
const LIVES = 3;
const ORIGINAL_WIDTH = 50;
const ORIGINAL_HEIGHT = 100;
var width = ORIGINAL_WIDTH;
var height = ORIGINAL_HEIGHT;

var zombie = document.getElementById('zombie');
zombie.onclick = shootZombie;

var seconds = GAME_TIME;
var zombieAttackTime = ZOMBIE_ATTACK_TIME;
var score = 0;
var lives = LIVES;
var scoreText = document.getElementById('score');

var countDown = setInterval(secondPass, 1000);

function secondPass() {
    var timeText = document.getElementById('time');

    seconds--;
    var secondsText = 'time: ' + Math.floor(seconds / 60) + ':' + seconds % 60;
    timeText.innerHTML = secondsText;
    if (seconds === 0) {
        victory();
    }

}

var zombieAttackInterval = setInterval(zombieSecondPass, 1000);

function zombieSecondPass() {
    var livesText = document.getElementById('lives');
    if (zombieAttackTime > 0) {
        zombieAttackTime--;
    } else {
        lives--;
        livesText.innerHTML = 'lives: ' + lives;
        playZombieSound();
        resetZombieSize();

        if (lives === 0) {
            failure();
        }
        zombieAttackTime = ZOMBIE_ATTACK_TIME; //reset zombieAttackTime
    }
}

var zombieApproachingInterval = setInterval(zombieZoom, 100);

function zombieZoom() {
    width += 0.75;
    zombie.style.width = width;
    height += 1.5;
    zombie.style.height = height;
    if (lives === 0 || seconds === 0) {
        clearInterval(zombieApproachingInterval);
    }
}
function resetZombieSize() {
    width = ORIGINAL_WIDTH;
    height = ORIGINAL_HEIGHT;
    zombie.style.width = ORIGINAL_WIDTH;
    zombie.style.height = ORIGINAL_HEIGHT;
}

function shootZombie() {
    playBulletSound();
    var randX = Math.ceil(Math.random() * 75) + 20,
        randY = Math.ceil(Math.random() * 75) + 10; //the +10 for the score
    zombie.style.right = randX + '%';
    zombie.style.top = randY + '%';

    score++;
    scoreText.innerHTML = 'score: ' + score;

    zombieAttackTime = ZOMBIE_ATTACK_TIME; //reseting zombie attack time

    resetZombieSize();
}

// game finish
function gameEnd() {
    zombie.onclick = "";
    clearInterval(countDown); //stopping the count-down
    clearInterval(zombieAttackInterval); //stopping zombieAttackInterval
}
function victory() {
    gameEnd();
    victorySound();
    var resultText = document.getElementById('result');
    var bestScoreText = document.getElementById('best-score');
    bestScoreText.innerHTML = 'best score: ' + score; //recording best score
    resultText.innerHTML = 'survived!'


}
function failure() {
    gameEnd();
    failureSound();
    var resultText = document.getElementById('result');
    var bestScoreText = document.getElementById('best-score');
    resultText.innerHTML = 'you\'re eaten alive!'
}

// sounds
function playBulletSound() {
    var bulletAudio1 = document.getElementById('bullet-audio-1');
    var bulletAudio2 = document.getElementById('bullet-audio-2');
    var bulletAudio3 = document.getElementById('bullet-audio-3');

    var dice = Math.ceil(Math.random() * 3);
    switch (dice) {
        case 1:
            bulletAudio1.load();
            bulletAudio1.play();
            break;
        case 2:
            bulletAudio2.load();
            bulletAudio2.play();
            break;
        case 3:
            bulletAudio3.load();
            bulletAudio3.play();
            break;
    }
}
function playZombieSound() {
    var giantLaugh1 = document.getElementById('giant-laugh-1');
    var giantLaugh2 = document.getElementById('giant-laugh-2');
    var giantLaugh3 = document.getElementById('giant-laugh-3');

    var dice = Math.ceil(Math.random() * 3);
    switch (dice) {
        case 1:
            giantLaugh1.load();
            giantLaugh1.play();
            break;
        case 2:
            giantLaugh2.load();
            giantLaugh2.play();
            break;
        case 3:
            giantLaugh3.load();
            giantLaugh3.play();
            break;
    }
}
function victorySound() {
    var victory = document.getElementById('success');
    victory.load();
    victory.play();
}
function failureSound() {
    var failure = document.getElementById('failure');
    failure.load();
    failure.play();
}