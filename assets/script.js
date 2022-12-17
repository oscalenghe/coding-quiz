// DOM elements
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit-button");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// variables for quiz
//lists all questions, choices and answers
var questions = [
    {
        title: "Which one is a looping structure in JavaScript?",
        choices: ["for", "while", "do-while", "1, 2 and 3"],
        answer: "1, 2 and 3"
      },
      {
        title: "What are the two basic groups of data types in JavaScript?",
        choices: [
          "Primitive and attribute",
          "Primitive and reference types",
          "Reference types and attribute",
          "None of the above"
        ],
        answer: "Primitive and reference types"
      },
      {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
      },
      {
        title: "Boolean operators that can be used in JavaScript include:",
        choices: [
          "'And' Operator &&",
          "'Or' Operator ||",
          "'Not' Operator !",
          "1, 2 and 3"
        ],
        answer: "1, 2 and 3"
      },
      {
        title: "What is the data type of variables in JavaScript?",
        choices: [
          "Object data types",
          "Function data type",
          "None of the above",
          "1 2 and 3"
        ],
        answer: "1 2 and 3"
      },
      {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
      },
      {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: [
          "numbers and strings",
          "other arrays",
          "booleans",
          "1, 2 and 3"
        ],
        answer:  "1, 2 and 3"
      },
      {
        title:
          "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
      },
      {
        title:
          "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
      },
      {
        title: "What is the type of Pop up boxes available in JavaScript?:",
        choices: ["Alert", "Confirm", "Prompt", "1, 2 and 3"],
        answer: "1, 2 and 3"
      }

];

var questionIndex = 0;
var time = questions.length * 15;
var timerId;



//this is what happens when the start quiz button is pressed
function startQuiz() {
     //retrieve elements
    var startScreenEl = document.getElementById("start-screen");
    var hsStartScreenEl = document.getElementById("hs-start-screen");
     //hides the retrieved elements
    hsStartScreenEl.setAttribute("class", "hide");
    startScreenEl.setAttribute("class", "hide");
     //removes 'hide' class
    questionsEl.removeAttribute("class");
     //sets the timer and counts down
    timerId = setInterval(clockTick, 1000);
     //displays the timer
    timerEl.textContent = time;
     //calls function to retrieve
    getQuestion();
   
}

//retrieves a question, along with it's choices and answer
function getQuestion() {
    //get question from array
    var currentQuestion = questions[questionIndex];

    //update the HTML with the chosen question
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";
      // loop over choices
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("class", "buttons");
    choiceButton.setAttribute("value", choice);

    choiceButton.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceButton.onclick = questionClick;

    // display on the page
    choicesEl.appendChild(choiceButton);
  });
}

function questionClick() {
    // check if user guessed wrong
    if (this.value !== questions[questionIndex].answer) {
      // penalize time
      time -= 15;
    
      if (time < 0) {
        time = 0;
      }
      // display new time on page
      timerEl.textContent = time;
      feedbackEl.textContent = ("Incorrect!");
      feedbackEl.style.color = "red";
      feedbackEl.style.fontSize = "200%";
    } else {
      feedbackEl.textContent = ("Correct!");
      feedbackEl.style.color = "green";
      feedbackEl.style.fontSize = "200%";
    }
  
    // flash right/wrong feedback
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
  
    // next question
    questionIndex++;
  
    // time checker
    if (questionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }
  
  function quizEnd() {
    // stop timer
    clearInterval(timerId);
  
    // show end screen
    var hsStartScreenEl = document.getElementById("hs-start-screen");
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");
    hsStartScreenEl.setAttribute("class", "buttons");
  
    // show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
  
    // hide questions section
    questionsEl.setAttribute("class", "hide");
  }
  
  function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
      quizEnd();
    }
  }
  
  function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();
  
    if (initials !== "") {
      // get saved scores from localstorage and set to empty array
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      // format new score object for current user
      var newScore = {
        score: time,
        initials: initials
      };
  
      // save to localstorage
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
      // redirect to next page
      window.location.href = "scores.html";
    }
  }
  
  function checkForEnter(event) {
    if (event.key === "Enter") {
      saveHighscore();
    }
  }
  
  // submit initials
  submitBtn.onclick = saveHighscore;

  // start quiz
  startBtn.onclick = startQuiz;
 
  initialsEl.onkeyup = checkForEnter;




  function printHighscores() {
    // either get scores from localstorage 
    var highscores = JSON.parse(window.localStorage.getItem("highscores"));
  
    highscores.forEach(function(score) {
      // create li element and grab highscore list element
      var scoreList = document.getElementById("highscore-list");
      var createLi = document.createElement("li");
     
      // print highscore on page along with initials
      createLi.innerHTML = score.initials + " - " + score.score;
  
      // display on page
      scoreList.appendChild(createLi);
    });
  }

  printHighscores();

  function clearHighscores() {
    window.localStorage.removeItem("highscore");
    window.location.reload();
  }
  
  document.getElementById("clear-scores").onclick = clearHighscores;
  
 
