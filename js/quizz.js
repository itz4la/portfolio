// Questions array
const quizQuestions = [
    {
        question: "Pourquoi est-il important d’utiliser des noms de variables explicites ?",
        options: [
            "Pour améliorer la performance du code",
            "Pour rendre le code impressionnant",
            "Pour rendre le code plus facile à lire et à comprendre",
            "Pour minimiser le temps de frappe"
        ],
        answer: 2
    },
    {
        question: "Laquelle des affirmations suivantes est une bonne pratique pour écrire des commentaires dans le code ?",
        options: [
            "Écrire des commentaires pour chaque ligne de code",
            "Utiliser des commentaires pour expliquer pourquoi un code complexe est écrit, pas ce qu’il fait",
            "Utiliser des commentaires pour critiquer le code d’autres développeurs",
            "Éviter tous les commentaires ; le code doit être auto-explicatif"
        ],
        answer: 1
    },
    {
        question: "Quel est le but de suivre le principe DRY (Don’t Repeat Yourself) ?",
        options: [
            "Réduire la duplication de code et améliorer la maintenabilité",
            "Améliorer la performance du code",
            "Éviter d’utiliser des fonctions",
            "Rendre le code plus court"
        ],
        answer: 0
    },
    {
        question: "Laquelle des affirmations suivantes N’EST PAS une bonne pratique de codage pour la gestion des erreurs ?",
        options: [
            "Ignorer les exceptions pour une exécution plus rapide",
            "Capturer et enregistrer les erreurs",
            "Utiliser des messages d’erreur explicites",
            "Mettre en œuvre des mécanismes de récupération d’erreurs élégants"
        ],
        answer: 0
    },
    {
        question: "Quel est l’avantage d’écrire des tests unitaires ?",
        options: [
            "Les tests unitaires réduisent la quantité de code à écrire",
            "Les tests unitaires aident à détecter les bugs tôt et améliorent la qualité du code",
            "Les tests unitaires éliminent le besoin de tests manuels",
            "Les tests unitaires rendent le code plus rapide"
        ],
        answer: 1
    },
    {
        question: "Pourquoi devriez-vous garder les fonctions courtes et axées sur une seule tâche ?",
        options: [
            "Cela rend le code plus propre",
            "Cela rend les fonctions plus faciles à réutiliser et à tester",
            "C’est plus efficace pour le compilateur",
            "Cela réduit l’utilisation de la mémoire"
        ],
        answer: 1
    },
    {
        question: "Quel principe encourage à limiter la visibilité des données uniquement à ce qui est nécessaire ?",
        options: [
            "Principe SOLID",
            "Principe DRY",
            "Encapsulation",
            "Programmation orientée objet"
        ],
        answer: 2
    },
    {
        question: "Quel est l’objectif du refactoring de code ?",
        options: [
            "Ajouter de nouvelles fonctionnalités",
            "Améliorer la conception, la structure et la lisibilité du code sans changer son comportement",
            "Supprimer les bugs",
            "Optimiser le code pour une exécution plus rapide"
        ],
        answer: 1
    },
    {
        question: "Quelle affirmation à propos des revues de code est vraie ?",
        options: [
            "Les revues de code sont inutiles si le développeur est expérimenté",
            "Les revues de code ne servent qu’à trouver des erreurs de syntaxe",
            "Les revues de code aident à identifier des problèmes potentiels et favorisent le partage de connaissances",
            "Les revues de code ralentissent le processus de développement"
        ],
        answer: 2
    },
    {
        question: "Quel est l’avantage des systèmes de contrôle de version (comme Git) ?",
        options: [
            "Ils permettent de garder le code dans une seule version sans aucune sauvegarde",
            "Ils permettent à plusieurs développeurs de collaborer et de suivre efficacement les changements",
            "Ils éliminent le besoin de sauvegardes",
            "Ils augmentent la vitesse d’exécution du code"
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
