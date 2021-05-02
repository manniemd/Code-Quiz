var highScore = 100;
var timecountdown = 150;
var index = 0;
var timeInterval;
var timeEl = document.querySelector("#count");
var scoreFinal = document.getElementById("final-score");
var buttonD = document.querySelector("#quiz"); 
var buttonHigScoreView = document.querySelector("#linkscore");
var showq = document.createElement("h3")
var questionAnswer = document.querySelector("#showQ");
var listAnswer = document.createElement("ol");
var list1 = document.createElement("li");
var list2 = document.createElement("li");
var list3 = document.createElement("li");
var list4 = document.createElement("li");
//button for answer
var ans1 = document.createElement("button");
var ans2 = document.createElement("button");
var ans3 = document.createElement("button");
var ans4 = document.createElement("button");
var input = document.createElement("input");

var formLabel = document.createElement("label")
var submit = document.querySelector("#sign-up");
var scoreForm = document.querySelector("#formScore")
//message in the register

var userinitialImput = document.querySelector("#user-initial");
var score = document.querySelector("#user-score");
var form = document.querySelector("#infoUser");
var buttonClearStorage = document.querySelector("#clear");



//array object with question,answer and the correct answer

var arrayquestion = [
  {
    question: " Who created JavaScript?",
    choices: ["Netscape", "Microsoft", "Oracle", "Sun Microsystems"],
    answer: "Netscape"
  },
  {
    question: "Which of the following is not a reserved word in JavaScript?",
    choices: ["default", "finally", "throw ", "undefined"],
    answer: "undefined"
  },
  {
    question: " which of these statements does not belong to JavaScript:",
    choices: ["Valuest", "String", "Keywords", "Comments"],
    answer: "String"
  },
  {
    question: " which  statement JavaScript return a Random Integers:",
    choices: ["Math.random()", "Math.floor()", "Math.floor()", "Math.floor(Math.random()*10)", "Math.random(Math.floor()*10)"],
    answer: "Math.floor(Math.random()*10)"
  },
  {
    question: "A JavaScript Boolean represents one or two values: ",
    choices: ["true", "false", "null and false", "true or false"],
    answer: "true or false"
  },
  {
    question: "Is JavaScript a front-end, back-end, full-stack or database programming language?",
    choices: ["front-end", "back-end", "full-stack", "database"],
    answer: "full-stack"
  },
  {
    question: "What is not a JSON?",
    choices: [" Stands for JavaScript Object Notation", "A lightweight data interchange format", "Language dependent", "self-describing and easy to understand"],
    answer: "Language dependent"
  },
  {
    question: "JavaScript defines 5 types of primitive data types, Which of these is not one?",
    choices: [" boolean", "number", "null", "integer"],
    answer: "integer"
  },
  {
    question: "Which of these Comparison Operators returns true for x = 5? ",
    choices: ["x ==='5'", "x!== 5", "x!== 8", "x >= 8"],
    answer: "x!== 8"
  },
  {
    question: "Select the Assignment Operators that belong to JavaScript ",
    choices: ["+= ", "+= ", "/=", " all of the above "],
    answer: " all of the above "
  }];


//function show the question 

function showQuestions() {

  if (index === 0) {
    var removeQuiz = document.getElementById("star");
    removeQuiz.remove();
    starTimer();
  }

  //Question [i]
  showq.innerHTML = arrayquestion[index].question;
  // console.log(index)
  // console.log(arrayquestion[index].question)
  if (arrayquestion[index] !== 9) {
    console.log(arrayquestion[index].question)
    // answers for the question [i]
    ans1.textContent = arrayquestion[index].choices[0]
    ans2.textContent = arrayquestion[index].choices[1]
    ans3.textContent = arrayquestion[index].choices[2]
    ans4.textContent = arrayquestion[index].choices[3]

    // show the dynamic element on the page
    list1.appendChild(ans1);
    list2.appendChild(ans2);
    list3.appendChild(ans3);
    list4.appendChild(ans4);
    listAnswer.appendChild(list1);
    listAnswer.appendChild(list2);
    listAnswer.appendChild(list3);
    listAnswer.appendChild(list4);
    questionAnswer.appendChild(showq);
    questionAnswer.appendChild(listAnswer);

    // listener when select a answer
    ans1.addEventListener("click", Result);
    ans2.addEventListener("click", Result);
    ans3.addEventListener("click", Result);
    ans4.addEventListener("click", Result);
  }
  else {

    ShowScore();
  }


}


//function check result 
function Result() {


  //create element for show wrong answwer
  var correct = document.createElement("h6")
  var wrong = document.createElement("h6")
  wrong.textContent = "Wrong";
  correct.textContent = "Correct";
  
  //style for the elements
  correct.setAttribute("Style", "font-size:20px ;margin:15px;color:gray; text-decoration: underline");
  wrong.setAttribute("Style", "font-size:20px ;margin:15px;color:gray; text-decoration: underline");


  //condicional for comparison the user selection with the correct answer
  if (this.textContent === arrayquestion[index].answer) {

    questionAnswer.appendChild(correct);
    setTimeout(function () {
      questionAnswer.innerHTML = "";
      index++;
      if (index === arrayquestion.length) {
        ShowScore();

      }
      else {

        showQuestions()
      }
    }, 1000)
  }
  else {
    // the user selection the wrong answer      
    // subtract 10 for time
    if (timecountdown >= 10) {
      timecountdown = timecountdown - 10;
    }

    //console.log("wrong after" ,timecountdown);
    timeEl.textContent = timecountdown;

    // subtract 10 for highScore
    highScore = highScore - 10;
    console.log(highScore)
    questionAnswer.appendChild(wrong);
    setTimeout(function () { 
      questionAnswer.innerHTML = "";
    index++;

    showQuestions()
    },1000)
  }

};// end Result() fct def


//show the current time

function starTimer() {

  timeInterval = setInterval(function () {

    timecountdown--;
    //console.log("Time Left: ", timecountdown)

    timeEl.textContent = timecountdown;

    if (timecountdown === 0) {
      ShowScore()
      clearArea();
      clearInterval(timeInterval)
    }
  }, 1000);

}


//function clear questiion and anserw

function clearArea() {
  var removeAnswer = document.getElementById("showQ");
  removeAnswer.style.display = "none";
}

//function show the results to the user and save his initial

function ShowScore() {
  //get the final score for the user
  scoreFinal.textContent = highScore;
  clearInterval(timeInterval);
  //show the form
  form.style.display = "block";
};

//Show the las user register
var listScore = [];
function renderLastRegistered() {


  listScore = JSON.parse(localStorage.getItem("Scores"));

 };


//function save localStorage

function saveInformation() {

  var inicialUser = document.querySelector("#initialUser").value;
  var scoreUser = highScore;


  //check for no  let empty
  if (inicialUser === "") {

    alert("Initial cannot be blank");

  } else {


    listScore = JSON.parse(localStorage.getItem("Scores")) || [];
    var scores = {
      score: scoreUser,
      initials: inicialUser
    };

    listScore.push(scores);
    localStorage.setItem("Scores", JSON.stringify(listScore));

  }
};


// add event listener to star quiz button
buttonD.addEventListener("click", showQuestions);


buttonHigScoreView.addEventListener("click", renderLastRegistered);

form.style.display = "none";


submit.addEventListener("click", (event) => {
  event.preventDefault();
  saveInformation();
  window.location.href = "highscores.html";
})