var btn = document.getElementById('btn');
var seconds = 20;
var zombieAttackTime = 3;
var score = 0;
var lives = 3;
var scoreText = document.getElementById('score');

var countDown = setInterval(function () {
    secondPass();
}, 1000);

function secondPass() {
    var timeText = document.getElementById('time');

    seconds--;
    var secondsText = 'time: ' + Math.floor(seconds / 60) + ':' + seconds % 60;
    timeText.innerHTML = secondsText;
    if (seconds === 0) {
        victory();
    }

}

function gameEnd() {
    btn.disabled = true;
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

var zombieAttackInterval = setInterval(function () {
    zombieSecondPass();
}, 1000);

function zombieSecondPass() {
    var livesText = document.getElementById('lives');
    if (zombieAttackTime > 0) {
        zombieAttackTime--;
    } else {
        lives--;
        livesText.innerHTML = 'lives: ' + lives;
        playZombieSound();
        if (lives === 0) {
            failure();
        }
        zombieAttackTime = 3; //reset zombieAttackTime
    }
}

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

btn.onclick = function () {
    playBulletSound();
    var randX = Math.ceil(Math.random() * 1200),
        randY = Math.ceil(Math.random() * 500) + 20; //the +20 for the score
    btn.style.transform = 'translate(' + randX + 'px, ' + randY + 'px)';

    score++;
    scoreText.innerHTML = 'score: ' + score;

    zombieAttackTime = 3; //reseting zombie attack time
}