const questions = [
    {
        question: "The name of the Laccadive, Minicoy and Amindivi islands was changed to Lakshadweep by an Act of Parliament in",
        answers: [
            {text: "1970", correct: false},
            {text: "1971", correct: false},
            {text: "1972", correct: false},
            {text: "1973", correct: true},
            
        ]
    },

    {
        question: "The members of the Rajya Sabha are elected by",
        answers: [
            {text: "the people", correct: false},
            {text: "Lok Sabha", correct: false},
            {text: "elected members of the legislative assembly", correct: true},
            {text: "elected members of the legislative council", correct: false},
            
        ]
    },

    {
        question: "The members of the panchayat are",
        answers: [
            {text: "nominated by the district officer", correct: false},
            {text: "the electorates of the respective territorial constituencies", correct: true},
            {text: "nominated by local self-government minister of the state", correct: false},
            {text: "nominated by the block development organization", correct: false},
            
        ]
    },

    {
        question: "The power to decide an election petition is vested in the",
        answers: [
            {text: "Parliament", correct: false},
            {text: "Supreme Court", correct: false},
            {text: "High courts", correct: true},
            {text: "Election Commission", correct: false},
            
        ]
    },

    {
        question: "The present Lok Sabha is the",
        answers:[
            {text: "14th Lok Sabha", correct: false},
            {text: "15th Lok Sabha", correct: false},
            {text: "16th Lok Sabha", correct: false},
            {text: "17th Lok Sabha", correct: true},
            
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementsById("answer-buttons");
const nextButton = document.getElementsById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();