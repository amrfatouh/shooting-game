const GAME_TIME = 10;
const ZOMBIE_ATTACK_TIME_LVL1 = 3;
const ZOMBIE_ATTACK_TIME_LVL2 = 2;
const ZOMBIE_ATTACK_TIME_LVL3 = 1.5;
const LIVES = 3;
const ORIGINAL_WIDTH = 50;
const ORIGINAL_HEIGHT = 100;
const LAST_LEVEL = 3;


var width = ORIGINAL_WIDTH;
var height = ORIGINAL_HEIGHT;

var zombie = document.getElementById('zombie');
zombie.onclick = shootZombie;
var livesText = document.getElementById('lives');
var timeText = document.getElementById('time');
var bestScoreText = document.getElementById('best-score');
var resultText = document.getElementById('result');
var nextLevelBtn = document.getElementById('next-level');
var resetBtn = document.getElementById('reset');
resetBtn.onclick = resetGame;
nextLevelBtn.onclick = nextLevel;

var seconds = GAME_TIME;
var zombieAttackTime = ZOMBIE_ATTACK_TIME_LVL1;
var level = 1;
var score = 0;
var lives = LIVES;
var bestScore;
var scoreText = document.getElementById('score');

window.onload = function () {
    this.typeTime();
    document.getElementById('for-netlify').style.display = 'none';
}

var countDown = setInterval(secondPass, 1000);
function secondPass() {
    seconds--;
    typeTime();
    if (seconds === 0) {
        victory();
    }
}
function typeTime() {
    var secondsText;
    //putting a 0 after colon when seconds < 10
    if (seconds >= 10) {
        secondsText = 'time: ' + Math.floor(seconds / 60) + ':' + seconds % 60;
    } else {
        secondsText = 'time: ' + Math.floor(seconds / 60) + ':0' + seconds % 60;
    }
    timeText.innerHTML = secondsText;
}

var zombieAttackInterval = setInterval(zombieSecondPass, 500);
function zombieSecondPass() {
    zombieAttackTime -= 0.5;
    if (zombieAttackTime <= 0) {
        zombieAttack();
    }
}
function zombieAttack() {
    lives--;
    livesText.innerHTML = 'lives: ' + lives;
    playZombieSound();
    resetZombieSize();

    if (lives === 0) {
        failure();
    }
    setZombieAttackTime() //reset zombieAttackTime
}
function resetZombieSize() {
    width = ORIGINAL_WIDTH;
    height = ORIGINAL_HEIGHT;
    zombie.style.width = ORIGINAL_WIDTH;
    zombie.style.height = ORIGINAL_HEIGHT;
}

var zombieApproachingInterval = setInterval(zombieZoom, 50);
function zombieZoom() {
    switch (level) {
        case 1:
            width += 0.3;
            zombie.style.width = width;
            height += 0.4;
            zombie.style.height = height;
            break;
        case 2:
            width += 0.6;
            zombie.style.width = width;
            height += 0.8;
            zombie.style.height = height;
            break;
        case 3:
            width += 0.9;
            zombie.style.width = width;
            height += 1.2;
            zombie.style.height = height;
    }
}

var zombieWalkingAnimation = setInterval(zombieWalking, 100);
var imageNumber = 1;
function zombieWalking() {
    imageNumber++;
    if (imageNumber > 10) {
        imageNumber = 1;
    }
    zombie.src = './assets/images/zombie-walking/zombie-walking-' + imageNumber + '.png';
}

function randomizeLocation() {
    var randX = Math.ceil(Math.random() * 75) + 20,
        randY = Math.ceil(Math.random() * 75) + 10; //the +10 for the score
    zombie.style.right = randX + '%';
    zombie.style.top = randY + '%';
}

function shootZombie() {
    playBulletSound();
    randomizeLocation();

    score++;
    scoreText.innerHTML = 'score: ' + score;

    setZombieAttackTime();

    resetZombieSize();
}

function resetGame() {
    zombie.onclick = shootZombie;
    randomizeLocation();
    //resetting counters
    seconds = GAME_TIME;
    level = 1;
    lives = LIVES;
    score = 0;
    width = ORIGINAL_WIDTH;
    height = ORIGINAL_HEIGHT;
    setZombieAttackTime();
    //resetting labels
    scoreText.innerHTML = 'score: ' + score;
    livesText.innerHTML = 'lives: ' + lives;
    var secondsText = 'time: ' + Math.floor(seconds / 60) + ':' + seconds % 60;
    timeText.innerHTML = secondsText;
    resultText.innerHTML = "";
    resetBtn.style.visibility = 'hidden';
    //resetting intervals
    countDown = setInterval(secondPass, 1000);
    zombieAttackInterval = setInterval(zombieSecondPass, 500);
    zombieApproachingInterval = setInterval(zombieZoom, 50);
    zombieWalkingAnimation = setInterval(zombieWalking, 100);
}

function nextLevel() {
    level++;
    nextLevelBtn.style.visibility = 'hidden';
    //resetting zombie
    zombie.onclick = shootZombie;
    randomizeLocation();
    //resetting counters
    seconds = GAME_TIME;
    lives = LIVES;
    width = ORIGINAL_WIDTH;
    height = ORIGINAL_HEIGHT;
    //resetting labels
    livesText.innerHTML = 'lives: ' + lives;
    var secondsText = 'time: ' + Math.floor(seconds / 60) + ':' + seconds % 60;
    timeText.innerHTML = secondsText;
    //continuing the intervals
    countDown = setInterval(secondPass, 1000);
    zombieAttackInterval = setInterval(zombieSecondPass, 500);
    zombieApproachingInterval = setInterval(zombieZoom, 50);
    //adjusting walking speed for the zombie for different levels
    switch (level) {
        case 1:
            zombieWalkingAnimation = setInterval(zombieWalking, 100);
            break;
        case 2:
            zombieWalkingAnimation = setInterval(zombieWalking, 75);
            break;
        case 3:
            zombieWalkingAnimation = setInterval(zombieWalking, 50);
            break;
    }
    //setting level-dependent variables
    setZombieAttackTime();
}
function setZombieAttackTime() {
    switch (level) {
        case 1:
            zombieAttackTime = ZOMBIE_ATTACK_TIME_LVL1
            break;
        case 2:
            zombieAttackTime = ZOMBIE_ATTACK_TIME_LVL2
            break;
        case 3:
            zombieAttackTime = ZOMBIE_ATTACK_TIME_LVL3
            break;
    }
}

function levelEnd() {
    zombie.onclick = "";
    nextLevelBtn.style.visibility = 'visible';
    clearInterval(countDown); //stopping the count-down
    clearInterval(zombieAttackInterval); //stopping zombieAttackInterval
    clearInterval(zombieApproachingInterval); //stopping Approaching Interval
    clearInterval(zombieWalkingAnimation); //stopping zombieWalking Animation
}

// game finish
function gameEnd() {
    zombie.onclick = "";
    resetBtn.style.visibility = 'visible';
    if (bestScore == null || score > bestScore) {
        bestScore = score;
        bestScoreText.innerHTML = 'best score: ' + bestScore;
    }
    clearInterval(countDown); //stopping the count-down
    clearInterval(zombieAttackInterval); //stopping zombieAttackInterval
    clearInterval(zombieApproachingInterval); //stopping Approaching Interval
    clearInterval(zombieWalkingAnimation); //stopping zombieWalking Animation
}
function victory() {
    if (level != LAST_LEVEL) {
        levelEnd();
    } else {
        resultText.innerHTML = 'survived!';
        gameEnd();
    }
    victorySound();


}
function failure() {
    gameEnd();
    failureSound();
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