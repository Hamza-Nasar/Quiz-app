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
let totalSeconds = 600;  // 10 minutes for quiz duration
let questionIndex = 0;
let correct = 0;
let wrong = 0;
let selectedOption = null;

const questions = [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Markup", "None"], answer: "Hyper Text Markup Language" },
    { question: "Which HTML element is used for the largest heading?", options: ["<h1>", "<h2>", "<h3>", "<h6>"], answer: "<h1>" },
    { question: "What does the <p> element represent?", options: ["Paragraph", "Picture", "Preformatted text", "Page"], answer: "Paragraph" },
    { question: "Which HTML tag is used to create a hyperlink?", options: ["<a>", "<h1>", "<link>", "<url>"], answer: "<a>" },
    { question: "Which attribute is used to specify the URL in the <a> tag?", options: ["href", "src", "url", "link"], answer: "href" },
    { question: "Which tag is used to display images?", options: ["<img>", "<image>", "<picture>", "<src>"], answer: "<img>" },
    { question: "What does the <br> tag do?", options: ["Creates a new line", "Creates a block", "Breaks a link", "Adds a border"], answer: "Creates a new line" },
    { question: "Which tag is used to create a list of items?", options: ["<ol>", "<ul>", "<li>", "<list>"], answer: "<ul>" },
    { question: "What is the correct HTML element for inserting a line break?", options: ["<break>", "<br>", "<lb>", "<line>"], answer: "<br>" },
    { question: "Which tag is used to define an unordered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], answer: "<ul>" },
    { question: "Which HTML tag is used to specify a table row?", options: ["<tr>", "<th>", "<td>", "<table>"], answer: "<tr>" },
    { question: "What attribute specifies the source of an image in the <img> tag?", options: ["src", "href", "link", "source"], answer: "src" },
    { question: "Which tag is used to define a form in HTML?", options: ["<form>", "<input>", "<button>", "<submit>"], answer: "<form>" },
    { question: "Which element is used to define an input field for a form?", options: ["<input>", "<field>", "<form>", "<text>"], answer: "<input>" },
    { question: "What attribute is used to specify a placeholder in an input field?", options: ["placeholder", "value", "text", "hint"], answer: "placeholder" },
    { question: "Which tag is used to define a division or section in an HTML document?", options: ["<section>", "<div>", "<span>", "<article>"], answer: "<div>" },
    { question: "Which HTML element is used to define the title of the document?", options: ["<title>", "<head>", "<meta>", "<header>"], answer: "<title>" },
    { question: "Which attribute is used to specify a table heading in HTML?", options: ["<th>", "<td>", "<tr>", "<head>"], answer: "<th>" },
    { question: "What is the default value of the <ol> list?", options: ["Numbers", "Letters", "Bullets", "None"], answer: "Numbers" },
    { question: "What is the default value of the <ul> list?", options: ["Numbers", "Letters", "Bullets", "None"], answer: "Bullets" },
    { question: "Which HTML tag is used to define an ordered list?", options: ["<ol>", "<ul>", "<li>", "<list>"], answer: "<ol>" },
    { question: "Which HTML tag is used to create a dropdown list?", options: ["<select>", "<input>", "<option>", "<dropdown>"], answer: "<select>" },
    { question: "What is the correct HTML tag for a text area?", options: ["<textarea>", "<text>", "<input>", "<field>"], answer: "<textarea>" },
    { question: "Which element is used to define a link in an HTML document?", options: ["<link>", "<a>", "<url>", "<href>"], answer: "<a>" },
    { question: "Which tag is used to define a table cell?", options: ["<td>", "<th>", "<tr>", "<cell>"], answer: "<td>" },
    { question: "Which tag is used for creating a form button?", options: ["<button>", "<input>", "<submit>", "<form-button>"], answer: "<button>" },
    { question: "Which attribute defines a style for an element in HTML?", options: ["style", "class", "id", "type"], answer: "style" },
    { question: "Which tag is used to display a table?", options: ["<table>", "<td>", "<tr>", "<th>"], answer: "<table>" }
];

totalQ.textContent = questions.length;

function showUserInfo() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const inst = document.getElementById("inst").value.trim();
    const key = document.getElementById("key").value.trim();

    const correctKey = "hamza29";  // Correct key to start the quiz

    // Debugging logs to ensure values are captured
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Roll:", roll);
    console.log("Institute:", inst);
    console.log("Key entered:", key);

    // Checking if all fields are filled
    if (!name || !email || !roll || !inst || !key) {
        alert("Please fill all fields!");  // Alert for empty fields
        return;
    }

    // Checking if the correct key is entered
    if (key !== correctKey) {
        alert("Invalid key. Please try again!");  // Alert for wrong key
        return;
    }

    // If everything is correct, display user information
    showName.textContent = name;
    showEmail.textContent = email;
    showRoll.textContent = roll;
    showInst.textContent = inst;

    // Hide the form and show the quiz information
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
        alert("Please select an option!");  // Alert if no option is selected
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
    totalSeconds = 600;  // Reset timer to 10 minutes

    totalSeconds = 300;
    resultBox.classList.add("hidden");``
    userForm.classList.remove("hidden");
}
