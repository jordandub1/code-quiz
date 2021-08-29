var timer = document.querySelector("#time");
var aBtns = document.querySelector("#vert");
var currentQuestion;
var score = 0;
var secs = 120;
var scorePage = document.querySelector("#scores");
var timerInterval;
var olEl = document.querySelector("highscores");
var liTag;
var finalINIT = document.querySelector("#initials")
var userInitials = document.querySelector("#identification");
var highscores = document.querySelector("#highscores");

// quiz questions and answers
var questionAnswers = [
    {
        question: "Which of the following are looping structures in JavaScript?",
        options: ["For loop", "While loop", "Do-while loop", "All the above"],
        answer: 4
    },
    {
        question: "Which of the following returns the calling string value converted to lower case?",
        options: ["changeCase(case)", "toLower()", "toLowerCase()", "None of the above"],
        answer: 3
    },
    {
        question: "Which adds one or more elements to the end of an array and returns the new length of the array?",
        options: ["push()", "map()", "pop()", "join()"],
        answer: 1
    },
    {
        question: "What HTML tag is JavaScript written under?",
        options: ["<js>", "<script>","<javascript>", "<scripted>"],
        answer: 2
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        options: ["=", "-", "+", "/"],
        answer: 1
    },
    {
        question: "How do you write 'Hello' in an alert box?",
        options: ["alertBox('Hello');", "msg('Hello');", "msgBox('Hello');", "alert('Hello');"],
        answer: 4
    },
    {
        question: "How does a for loop begin?",
        options: ["for (i <= 10, i++)", "for i=1 to 10", "for (i=0, i<=5)", "for (i=0; i <=10; i++)"],
        answer: 4
    },
    {
        question: "How do you round the number 5.25 to the nearest integer?",
        options: ["rnd(5.25)", "Math.rnd(5.25)", "Math.round(5.25)", "round(5.25)"],
        answer: 3
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        options: ["onchange", "onmouseclick", "onclick", "onmouseover"],
        answer: 3
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        options: ["Number", "Float", "Boolean", "Undefined"],
        answer: 2
    }
];

// hide specified id's
function hide(id) {
    var hidden = document.getElementById(id);
    // hidden.style.visibility= "hidden";
    hidden.style.display = "none";
}
 
// show specified id's
function show(id) {
    var visible = document.getElementById(id);
    visible.style.display = "visible";
    visible.style.visibility = "visible";
}

function timerSetting() {
    var timerInterval = setInterval(function() {
        secs--;
        time.textContent = secs + " seconds left";
    
        if(secs === 0) {
          clearInterval(timerInterval);
        }
    
    }, 1000);
}

// start quiz and hide unnecessary divs
function startQuiz() {
    hide("start-button");
    show("quiz");
    timerSetting();
    currentQuestion = 0;
    getQuestion(0);
    questionClick();

}

// add new buttons and change question
function getQuestion(currentQuestion) {

    var qText = document.getElementById("question");

    if(currentQuestion < questionAnswers.length) {
        qText.textContent = questionAnswers[currentQuestion].question;
        aBtns.innerHTML="";

        for (var i=0; i < questionAnswers[currentQuestion].options.length; i++) {
            var newB = document.createElement("button");

            newB.classList.add("btn");
            newB.setAttribute("data-value", i+1);
            newB.textContent = questionAnswers[currentQuestion].options[i];


            aBtns.appendChild(newB);
        }
    }
}



function questionClick() {
    var clickedEvent = ""
    var resultSection = document.querySelector("#result-sec");
    aBtns.addEventListener("click", function (event) {
        if (event.target.matches("button")) {
            clickedEvent = event.target;
        }
        // check if user guessed wrong
        if (parseInt(clickedEvent.getAttribute("data-value")) !== questionAnswers[currentQuestion].answer) {
            // penalize time
            secs -= 15;
        
            if (secs < 0) {
                secs = 0;
            }
    
            resultSection.textContent = "Incorrect!";
            } else {

    
            resultSection.textContent = "Correct!";
            }
    
        // flash right/wrong feedback on page for half a second
        resultSection.setAttribute("class", "feedback");
        setTimeout(function() {
        resultSection.setAttribute("class", "feedback hide");
        }, 1000);
    
        // move to next question
        currentQuestion = currentQuestion + 1;
        // check if we've run out of questions
        if (currentQuestion === questionAnswers.length) {
            quizEnd();
        } else {
            getQuestion(currentQuestion);
        }
    })
}
// function to end quiz  
function quizEnd() {
    quiz.style.display = "none"
    clearInterval(timerInterval);
    var final = document.querySelector("#final-score");
    final.textContent = "Your final score is " + secs + ".";
    hide("time");
    finalINIT.style.visibility = "visible"
}

// function to save scores
function saveHighscore() {
    var score = secs;
    var userInitials = identification.value;

    var newScore = [
        {
        score: score,
        initials: userInitials
        }
    ];
    // save to localstorage
    localStorage.setItem("newscore", JSON.stringify(newScore));
    // redirect to highscores
    window.location.href = "highScores.html";
};


function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
      saveHighscore();
    }
};

// user clicks button to start quiz
var startBtn = document.getElementById("start");
if(startBtn){
    startBtn.addEventListener("click", startQuiz, false);
}
// user clicks button to submit initials
var submitBtn = document.getElementById("submit");
if(submitBtn){
    submitBtn.addEventListener("click", saveHighscore, false);
}