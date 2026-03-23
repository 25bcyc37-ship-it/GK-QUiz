// GK Insight - Script Logic

// --- State Management ---
const MAX_QUESTIONS = 10;
let userName = "Guest";
let sessionQuestions = [];
let quizQueue = [];
let currentQuestion = null;

let stats = {
    total_attempts: 0,
    correct_answers: 0,
    accuracy: 0
};

let nextTimerInterval = null;

// --- DOM Elements ---
const questionText = document.getElementById('question-text');
const categoryTag = document.getElementById('category-tag');
const difficultyTag = document.getElementById('difficulty-tag');
const loadingState = document.getElementById('loading-state');
const actionButtons = document.getElementById('action-buttons');
const resultSection = document.getElementById('result-section');
const resultMessage = document.getElementById('result-message');
const explanationText = document.getElementById('explanation-text');
const countdownEl = document.getElementById('countdown');
const gameCard = document.getElementById('game-card');
const summaryScreen = document.getElementById('summary-screen');
const progressBar = document.getElementById('progress-bar');

// Summary View Elements
const finalScoreEl = document.getElementById('final-score');
const finalAccuracyEl = document.getElementById('final-accuracy');
const finalLevelEl = document.getElementById('final-level');

// Stat Display Elements
const totalAttemptsEl = document.getElementById('total-attempts');
const accuracyPctEl = document.getElementById('accuracy-pct');
const userLevelEl = document.getElementById('user-level');

const welcomeScreen = document.getElementById('welcome-screen');
const nameInput = document.getElementById('user-name-input');
const statusBar = document.getElementById('status-bar');
const displayName = document.getElementById('display-name');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    resetToWelcome();
});

// --- Flow Functions ---

async function startQuizFlow() {
    const enteredName = nameInput.value.trim();
    if (!enteredName) {
        nameInput.style.borderColor = 'var(--danger)';
        return;
    }

    userName = enteredName;
    displayName.innerText = userName;

    welcomeScreen.classList.add('hidden');
    statusBar.classList.remove('hidden');
    gameCard.classList.remove('hidden');

    await initializeQuizQueue();
    loadNewQuestion();
}

// 🔥 Fetch from backend
async function initializeQuizQueue() {
    showLoading(true);
    try {
        const res = await fetch("https://gk-quiz-9vzi.onrender.com/questions");
        const data = await res.json();

        if (!data || data.length === 0) {
            console.error("No questions from backend!");
            return;
        }

        quizQueue = data;

    } catch (err) {
        console.error('INITIALIZE_QUEUE_ERROR:', err);
    } finally {
        showLoading(false);
    }
}

function resetToWelcome() {
    welcomeScreen.classList.remove('hidden');
    statusBar.classList.add('hidden');
    gameCard.classList.add('hidden');
    summaryScreen.classList.add('hidden');
    nameInput.value = "";
    nameInput.style.borderColor = 'var(--glass-border)';
}

// --- Core Functions ---

function loadNewQuestion() {
    resetUI();

    if (quizQueue.length === 0) {
        questionText.innerText = "No more questions available.";
        return;
    }

    currentQuestion = quizQueue.shift();
    renderQuestion(currentQuestion);
}

function renderQuestion(q) {
    questionText.innerText = q.question;
    categoryTag.innerText = q.category || 'General';
    difficultyTag.innerText = q.difficulty || 'Normal';
    difficultyTag.style.color = getDifficultyColor(q.difficulty);
}

function handleAnswer(userChoice) {
    if (!currentQuestion) return;

    const isCorrect = userChoice === currentQuestion.correct_answer;
    toggleButtons(false);

    sessionQuestions.push({
        question: currentQuestion.question,
        user_answer: userChoice,
        correct_answer: currentQuestion.correct_answer,
        is_correct: isCorrect,
        explanation: currentQuestion.explanation
    });

    stats.total_attempts++;
    if (isCorrect) stats.correct_answers++;
    stats.accuracy = Math.round((stats.correct_answers / stats.total_attempts) * 100);

    updateStatsUI();
    showResult(isCorrect);

    if (stats.total_attempts >= MAX_QUESTIONS) {
        setTimeout(showFinalSummary, 3000);
    } else {
        startNextQuestionTimer();
    }
}

function showFinalSummary() {
    gameCard.classList.add('hidden');
    summaryScreen.classList.remove('hidden');

    finalScoreEl.innerText = `${stats.correct_answers}/${MAX_QUESTIONS}`;
    finalAccuracyEl.innerText = `${stats.accuracy}%`;
    finalLevelEl.innerText = calculateLevel(stats.accuracy);
}

async function restartQuiz() {
    stats = { total_attempts: 0, correct_answers: 0, accuracy: 0 };
    sessionQuestions = [];
    summaryScreen.classList.add('hidden');
    gameCard.classList.remove('hidden');
    updateStatsUI();
    await initializeQuizQueue();
    loadNewQuestion();
}

// ✅🔥 PDF DOWNLOAD FUNCTION (ADDED)
function downloadResults() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(18);
    doc.text("GK Insight - Quiz Results", 20, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Player: ${userName}`, 20, y);
    y += 8;
    doc.text(`Score: ${stats.correct_answers}/${MAX_QUESTIONS}`, 20, y);
    y += 8;
    doc.text(`Accuracy: ${stats.accuracy}%`, 20, y);
    y += 10;

    sessionQuestions.forEach((q, i) => {
        if (y > 270) {
            doc.addPage();
            y = 20;
        }

        doc.setFontSize(10);
        doc.text(`${i + 1}. ${q.question}`, 20, y);
        y += 6;

        doc.text(`Your Answer: ${q.user_answer ? 'Yes' : 'No'}`, 25, y);
        y += 5;

        doc.text(`Correct Answer: ${q.correct_answer ? 'Yes' : 'No'}`, 25, y);
        y += 5;

        doc.text(`Explanation: ${q.explanation}`, 25, y);
        y += 10;
    });

    doc.save("GK_Insight_Results.pdf");
}

// --- UI Helpers ---

function showResult(isCorrect) {
    resultSection.classList.remove('hidden');
    resultMessage.innerText = isCorrect ? "✨ Correct!" : "❌ Incorrect";
    explanationText.innerText = currentQuestion.explanation;
    gameCard.className = `card glass ${isCorrect ? 'correct' : 'wrong'}`;
}

function startNextQuestionTimer() {
    let timeLeft = 3;
    progressBar.style.width = '0%';

    if (nextTimerInterval) clearInterval(nextTimerInterval);

    nextTimerInterval = setInterval(() => {
        timeLeft--;
        countdownEl.innerText = timeLeft;

        const progress = ((3 - timeLeft) / 3) * 100;
        progressBar.style.width = `${progress}%`;

        if (timeLeft <= 0) {
            clearInterval(nextTimerInterval);
            loadNewQuestion();
        }
    }, 1000);
}

function updateStatsUI() {
    totalAttemptsEl.innerText = stats.total_attempts;
    accuracyPctEl.innerText = `${stats.accuracy}%`;
    userLevelEl.innerText = calculateLevel(stats.accuracy);
}

function calculateLevel(acc) {
    if (acc < 40) return 'Beginner';
    if (acc < 70) return 'Learner';
    if (acc < 90) return 'Smart';
    return 'Genius';
}

function showLoading(show) {
    loadingState.classList.toggle('hidden', !show);
}

function resetUI() {
    resultSection.classList.add('hidden');
    gameCard.className = 'card glass';
    toggleButtons(true);
    progressBar.style.width = '0%';
}

function toggleButtons(enabled) {
    const buttons = actionButtons.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = !enabled);
}

function getDifficultyColor(diff) {
    switch (diff?.toLowerCase()) {
        case 'easy': return '#22c55e';
        case 'medium': return '#eab308';
        case 'hard': return '#ef4444';
        default: return '#94a3b8';
    }
}
