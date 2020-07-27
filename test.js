var btn = document.getElementById('btn');
var seconds = 10;
var score = 0;
var scoreText = document.getElementById('score');

var countDown = setInterval (function () {
    secondPass();
}, 1000);

function secondPass () {
    var timeText = document.getElementById('time');
    var bestScoreText = document.getElementById('best-score');
    seconds--;
        var secondsText = 'time: ' + Math.floor(seconds/60) + ':' + seconds % 60;
        timeText.innerHTML = secondsText;
    if (seconds === 0) {
        btn.disabled = true;
        clearInterval(countDown); //stopping the count-down
        bestScoreText.innerHTML = 'best score: ' + score; //recording best score
    }
}

function playSound() {
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

btn.onclick = function () {
    playSound();
    var randX = Math.ceil(Math.random() * 1200),
        randY = Math.ceil(Math.random() * 500) + 20; //the +20 for the score
    btn.style.transform = 'translate(' + randX + 'px, ' + randY + 'px)';

    score++;
    scoreText.innerHTML = 'score: ' + score;
}