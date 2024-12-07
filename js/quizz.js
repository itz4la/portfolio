// Questions array
const quizQuestions = [
    {
        question: "Why is it important to use descriptive variable names?",
        options: [
            "To improve code performance",
            "To make the code impressive",
            "To make the code easier to read and understand",
            "To minimize typing time"
        ],
        answer: 2
    },
    {
        question: "Which of the following is a good practice for writing comments in code?",
        options: [
            "Write comments for every line of code",
            "Use comments to explain why complex code is written, not what it does",
            "Use comments to criticize other developers' code",
            "Avoid all comments; the code should be self-explanatory"
        ],
        answer: 1
    },
    {
        question: "What is the purpose of following the DRY (Don't Repeat Yourself) principle?",
        options: [
            "To reduce code duplication and improve maintainability",
            "To enhance code performance",
            "To avoid using functions",
            "To make the code shorter"
        ],
        answer: 0
    },
    {
        question: "Which of the following is NOT a good coding practice for error handling?",
        options: [
            "Ignore exceptions for faster execution",
            "Catch and log errors",
            "Use clear error messages",
            "Implement elegant error recovery mechanisms"
        ],
        answer: 0
    },
    {
        question: "What is the benefit of writing unit tests?",
        options: [
            "Unit tests reduce the amount of code to write",
            "Unit tests help catch bugs early and improve code quality",
            "Unit tests eliminate the need for manual testing",
            "Unit tests make the code faster"
        ],
        answer: 1
    },
    {
        question: "Why should functions be short and focused on a single task?",
        options: [
            "It makes the code cleaner",
            "It makes functions easier to reuse and test",
            "It's more efficient for the compiler",
            "It reduces memory usage"
        ],
        answer: 1
    },
    {
        question: "Which principle encourages limiting data visibility to only what is necessary?",
        options: [
            "SOLID principle",
            "DRY principle",
            "Encapsulation",
            "Object-oriented programming"
        ],
        answer: 2
    },
    {
        question: "What is the goal of code refactoring?",
        options: [
            "To add new features",
            "To improve the design, structure, and readability of code without changing its behavior",
            "To remove bugs",
            "To optimize code for faster execution"
        ],
        answer: 1
    },
    {
        question: "Which statement about code reviews is true?",
        options: [
            "Code reviews are unnecessary if the developer is experienced",
            "Code reviews are only for finding syntax errors",
            "Code reviews help identify potential issues and foster knowledge sharing",
            "Code reviews slow down the development process"
        ],
        answer: 2
    },
    {
        question: "What is the advantage of version control systems (like Git)?",
        options: [
            "They keep the code in a single version without any backups",
            "They allow multiple developers to collaborate and track changes effectively",
            "They eliminate the need for backups",
            "They increase code execution speed"
        ],
        answer: 1
    }
];



// Generate the quiz
function generateQuiz() {
    const quizForm = document.getElementById("quiz-form");
    quizQuestions.forEach((item, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        questionDiv.innerHTML = `<p>${index + 1}. ${item.question}</p>`;

        item.options.forEach((option, i) => {
            const label = document.createElement("label");
            label.classList.add("answer");
            label.innerHTML = `
                <input type="radio" name="question${index}" value="${i}" onclick="checkAllAnswered()">
                ${option}
            `;
            questionDiv.appendChild(label);
        });

        quizForm.appendChild(questionDiv);
    });
}

// Check if all questions are answered
function checkAllAnswered() {
    let allAnswered = true;

    quizQuestions.forEach((_, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (!selectedOption) {
            allAnswered = false;
        }
    });

    document.getElementById("submit-btn").disabled = !allAnswered;
}

// Calculate and display result using SweetAlert2
function submitQuiz() {
    let score = 0;
    const answers = []; // To store the user's answers for result checking

    // Calculate score and save user answers
    quizQuestions.forEach((item, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        answers.push(selectedOption ? parseInt(selectedOption.value) : null);
        if (selectedOption && parseInt(selectedOption.value) === item.answer) {
            score++;
        }
    });

    Swal.fire({
        title: score === quizQuestions.length ? 'Bravo !' : 'Oops...!',
        text: `Votre score est de ${score} sur ${quizQuestions.length}.`,
        icon: score === quizQuestions.length ? 'success' : 'error',
        confirmButtonText: 'Voir Résultat',
        showCancelButton: true,
        cancelButtonText: 'Recommencer'
    }).then((result) => {
        if (result.isConfirmed) {
            // Highlight the answers (Check Result)
            checkResults(answers);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Restart the quiz
            restartQuiz();
        }
    });
}

function checkResults(answers) {
    quizQuestions.forEach((item, index) => {
        const questionDiv = document.querySelectorAll('.question')[index];
        const userAnswer = answers[index];

        if (userAnswer === item.answer) {
            questionDiv.classList.add('correct'); // Green for correct
        } else {
            questionDiv.classList.add('incorrect'); // Red for incorrect
        }
    });
}

function restartQuiz() {
    const quizForm = document.getElementById("quiz-form");
    quizForm.innerHTML = ""; // Clear all questions
    generateQuiz(); // Regenerate the quiz
    document.getElementById("submit-btn").disabled = true; // Disable the Submit button
}


// Initialize quiz on page load
window.onload = generateQuiz;
