const userForm = document.getElementById("userForm");
const userInfo = document.getElementById("userInfo");
const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");

const showName = document.getElementById("showName");
const showEmail = document.getElementById("showEmail");
const showRoll = document.getElementById("showRoll");
const showInst = document.getElementById("showInst");

const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsList");
const currentQ = document.getElementById("currentQ");
const totalQ = document.getElementById("totalQ");
const timerEl = document.getElementById("timer");

const resTotal = document.getElementById("resTotal");
const resCorrect = document.getElementById("resCorrect");
const resWrong = document.getElementById("resWrong");
const resPercent = document.getElementById("resPercent");
const resMessage = document.getElementById("resMessage");

let timer;
let totalSeconds = 300;
let questionIndex = 0;
let correct = 0;
let wrong = 0;
let selectedOption = null;

const questions = [
    { question: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Markup", "None"], answer: "Hyper Text Markup Language" },
    { question: "Which type of JS language is?", options: ["Object-Oriented", "Object-Based", "Assembly", "High-level"], answer: "Object-Based" },
    { question: "The 'function' and 'var' are known as?", options: ["Keywords", "Data types", "Declaration statements", "Prototypes"], answer: "Declaration statements" },
    { question: "CSS stands for?", options: ["Creative Style Sheets", "Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"], answer: "Cascading Style Sheets" },
    { question: "Which symbol is used for comments in JS?", options: ["//", "/* */", "#", "<!-- -->"], answer: "//" },
    { question: "Which company developed JavaScript?", options: ["Netscape", "Microsoft", "Google", "Sun Microsystems"], answer: "Netscape" },
    { question: "Inside which HTML element do we put JS?", options: ["<javascript>", "<js>", "<script>", "<code>"], answer: "<script>" },
    { question: "Which event occurs when user clicks?", options: ["onmouseclick", "onmouseover", "onchange", "onclick"], answer: "onclick" },
    { question: "Which operator assigns a value?", options: ["=", "==", "===", "!="], answer: "=" },
    { question: "What does NaN stand for?", options: ["Not a Name", "Not a Number", "New and Nice", "Name and Number"], answer: "Not a Number" }
];

totalQ.textContent = questions.length;


function showUserInfo() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const inst = document.getElementById("inst").value.trim();

    if (!name || !email || !roll || !inst) {
        alert("Please fill all fields!");
        return;
    }

    showName.textContent = name;
    showEmail.textContent = email;
    showRoll.textContent = roll;
    showInst.textContent = inst;

    userForm.classList.add("hidden");
    userInfo.classList.remove("hidden");
}

function startQuiz() {
    userInfo.classList.add("hidden");
    quizBox.classList.remove("hidden");
    startTimer();
    loadQuestion();
}

function loadQuestion() {
    let q = questions[questionIndex];
    questionText.textContent = q.question;
    optionsList.innerHTML = "";

    q.options.forEach(opt => {
        let li = document.createElement("li");
        li.textContent = opt;
        li.onclick = () => selectOption(li, q.answer);
        optionsList.appendChild(li);
    });

    currentQ.textContent = questionIndex + 1;
    selectedOption = null;
}

function selectOption(li, correctAns) {
    const allOptions = optionsList.querySelectorAll("li");
    allOptions.forEach(o => o.classList.remove("selected"));

    li.classList.add("selected");
    selectedOption = { element: li, correctAns };
}

function nextQuestion() {
    if (!selectedOption) {
        alert("Please select an option!");
        return;
    }

    const { element, correctAns } = selectedOption;

    if (element.textContent === correctAns) {
        element.classList.add("correct");
        correct++;
    } else {
        element.classList.add("wrong");
        wrong++;
        optionsList.querySelectorAll("li").forEach(li => {
            if (li.textContent === correctAns) li.classList.add("correct");
        });
    }

    setTimeout(() => {
        questionIndex++;
        if (questionIndex < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 700);
}

function startTimer() {
    timer = setInterval(() => {
        let min = Math.floor(totalSeconds / 60);
        let sec = totalSeconds % 60;
        timerEl.textContent = `⏱ ${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
        totalSeconds--;

        if (totalSeconds < 0) {
            clearInterval(timer);
            showResult();
        }
    }, 1000);
}

function showResult() {
    clearInterval(timer);
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");

    const percent = Math.round((correct / questions.length) * 100);
    resTotal.textContent = questions.length;
    resCorrect.textContent = correct;
    resWrong.textContent = wrong;
    resPercent.textContent = percent;
    resMessage.textContent = percent >= 60 ? "🎉 Congratulations, You Passed!" : "❌ Sorry, Try Again!";
}

function restartQuiz() {
    questionIndex = 0;
    correct = 0;
    wrong = 0;
    totalSeconds = 120;
    resultBox.classList.add("hidden");
    userForm.classList.remove("hidden");
}
