const quizData = [
    {
        question: "1) Do you or the person you are inquiring about have any of the following symptoms: severe difficulty breathing.(e.g., struggling for each breath, speaking in single words), chest pain, confusion, extreme drowsiness or loss of consciousness?)",
        a: "Yes",
        b: "No",
        correct: "a",
    },
    {
        question: "2) Do you or the person you are inquiring about have shortness of breath at rest or difficulty breathing when lying down?",
        a: "Yes",
        b: "No",
        correct: "b",
    },
    {
        question: "3) Do you have a new onset or worsening of any of the following symptoms?",
        a: "Yes",
        b: "No",
        correct: "a",
    },
    {
        question: "4) Do you have a new onset of 2 or more of any of the following symptoms?",
        a: "Yes",
        b: "No",
        correct: "b",
    },
    {
        question: "5) Have you tested positive for COVID-19 in the previous 10 days either by rapid test or laboratory-based test?",
        a: "Yes",
        b: "No",
        correct: "b",
    },
    {
        question: "6) Have you recently received a positive result on an at-home rapid test?",
        a: "Yes",
        b: "No",
        correct: "b",
    },
    {
        question: "7) Are you currently awaiting results from a COVID-19 test?",
        a: "Yes",
        b: "No",
        correct: "b",
    },
];
const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const optionYes = document.getElementById('optionYes')
const optionNo = document.getElementById('optionNo')

const nextBtn = document.getElementById('next')
let currentQuiz = 0
let score = 0
loadQuiz()
function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question
    optionYes.innerText = currentQuizData.a
    optionNo.innerText  = currentQuizData.b
  
}
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}
function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}
nextBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
       if(answer === quizData[currentQuiz].correct) {
           score++
       }
       currentQuiz++
       if(currentQuiz < quizData.length) {
           loadQuiz()
       } else {
           quiz.innerHTML = `
           <h2>You answered ${score}/${quizData.length} questions correctly</h2>
           <button onclick="location.reload()">Finish</button>
           `
       }
    }
})