const username = document.querySelector('#user__name');

const savebutton = document.querySelector('#save__score__button');

const finalscore =document.getElementById('final__score');

// local storage
const getRecentScore = window.localStorage.getItem('mostRecentScore');
let highScores
highScores = JSON.parse(localStorage.getItem('highscores')) || [];

const MAX_SCORE = 5;
// console.log(highScores)

finalscore.innerText = getRecentScore;


username.addEventListener('keyup', ()=> {
    savebutton.disabled= !username.value;

    console.log(!username.value)
})
    
saveHighScore = (e) => {
    e.preventDefault();

    
    const score = {
        score: getRecentScore,
        name: username.value
    }

    highScores.push(score);

    highScores.sort( (a, b) => b.score - a.score);
    
    highScores.splice(MAX_SCORE);

    localStorage.setItem('highscores', JSON.stringify(highScores))

    window.location.assign('/');

}




