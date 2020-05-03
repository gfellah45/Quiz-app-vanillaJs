
// global variables

const question = document.getElementById('question');

const choices = [...document.querySelectorAll('.choice__text')];

const questionCounterText = document.querySelector('#question__counter')
const scoreText = document.querySelector('#score');
const progress =document.querySelector('.progress__bar__full');
const loader =document.querySelector('#loader');
const game =document.querySelector('#game');



// settings varialbles
let currentQuestion = {};

let acceptingAnswers = false;

let score = 0;

let questionCounter = 0;

let availableQuestions = [];

// sample questions
let questions;

const endPoints = [
  'https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple',
  'https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple'
                  ]

fetch(endPoints[0])
.then(res => res.json())
.then( content => {
  
  questions =  content.results.map( item => {
    const formattedQuestions = {
      question: item.question
    }
    const answerChoices = [...item.incorrect_answers];
    formattedQuestions.answer = Math.floor(Math.random() * 3 + 1);
    answerChoices.splice(formattedQuestions.answer -1, 0, item.correct_answer);
    answerChoices.forEach( (answer, index) => {
      formattedQuestions['choice' + (index +1)] = answer;
    })
    
    return formattedQuestions;
  })
  
  startGame()
})
.catch(err => console.error(err))

const MAX_BONUS = 10; //score bonus

const MAX_QUESTION = 20; //maximun questions

// start game funtion initiating the begining of the game
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion();
    loader.classList.add('hidden')
    game.classList.remove('hidden') //calling the get new question from withing the start game

}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTION){
      window.localStorage.setItem('mostRecentScore', `${score}`)  
      return window.location.assign('/end.html')
    }
    questionCounter++;
    // updatig progress bar
    let start = 0

    start = (questionCounter / MAX_QUESTION) * 100;
    
    console.log(start)
    progress.style.width = `${start}%`;
    
    

    questionCounterText.innerText = `${questionCounter}/${ MAX_QUESTION}`;

    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)

    currentQuestion = availableQuestions[questionIndex];

    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        let number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionIndex, 1)
    acceptingAnswers = true

}

// loop for answers
choices.forEach(choice => {
    choice.addEventListener('click', (e) => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;

        const selectedChoice = e.target;

        const selectedAnswer = selectedChoice.dataset['number'];
        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"

        selectedChoice.parentElement.classList.add(classToApply);
        if(classToApply === "correct"){
          incrementScore(MAX_BONUS)
        }

        setTimeout(() => {
          selectedChoice.parentElement.classList.remove(classToApply);
          getNewQuestion()
        }, 1000);
        
        
          
        
    })
})

// score mini function
incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}
