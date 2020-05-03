const highScoresList = document.querySelector('#high-score-list');

const highScores = JSON.parse(localStorage.getItem('highscores')) || [];

console.log(highScores)

highScoresList.innerHTML = highScores.map( score => {
    return `<li class = "high-score">${score.name} - ${score.score}</li>`
}).join("");