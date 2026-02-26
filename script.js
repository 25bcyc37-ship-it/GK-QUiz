// GK Insight - Script Logic

// --- Configuration ---
const SUPABASE_URL = 'https://jlurhqouicadfbazltrq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsdXJocW91aWNhZGZiYXpsdHJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwODMxNDYsImV4cCI6MjA4NzY1OTE0Nn0.k1C8tpYMccwREfjATi4ar0KjApTFTPExJdtAzhNbFqQ';

// Initialize Supabase Client
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- State Management ---
const MAX_QUESTIONS = 10;
let userName = "Guest";
let sessionQuestions = [];
let quizQueue = []; // Pre-shuffled unique questions for the session
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
    // Initial state: Show welcome, hide others
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

    // Transition UI
    welcomeScreen.classList.add('hidden');
    statusBar.classList.remove('hidden');
    gameCard.classList.remove('hidden');

    // Initialize Quiz Queue
    await initializeQuizQueue();
    loadNewQuestion();
}

async function initializeQuizQueue() {
    showLoading(true);
    try {
        const { data, error } = await _supabase.from('questions').select('*');
        if (error) throw error;

        // 1. Remove duplicates based on question text (because the CSV has duplicates)
        const uniquePool = [];
        const seenTexts = new Set();

        data.forEach(q => {
            const normalizedText = q.question.trim().toLowerCase();
            if (!seenTexts.has(normalizedText)) {
                seenTexts.add(normalizedText);
                uniquePool.push(q);
            }
        });

        // 2. Shuffle the pool (Fisher-Yates)
        for (let i = uniquePool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [uniquePool[i], uniquePool[j]] = [uniquePool[j], uniquePool[i]];
        }

        // 3. Keep exactly MAX_QUESTIONS or less if pool is small
        quizQueue = uniquePool.slice(0, MAX_QUESTIONS);
    } catch (err) {
        console.error('Error initializing quiz queue:', err);
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

async function loadNewQuestion() {
    resetUI();

    if (quizQueue.length === 0) {
        // This shouldn't happen during a session, but just in case
        questionText.innerText = "No more questions available.";
        return;
    }

    // Pull next question from pre-shuffled queue
    currentQuestion = quizQueue.shift();
    renderQuestion(currentQuestion);
}

function renderQuestion(q) {
    questionText.innerText = q.question;
    categoryTag.innerText = q.category || 'General';
    difficultyTag.innerText = q.difficulty || 'Normal';

    // Update badge colors based on difficulty
    difficultyTag.style.color = getDifficultyColor(q.difficulty);
}

async function handleAnswer(userChoice) {
    if (!currentQuestion) return;

    const isCorrect = userChoice === currentQuestion.correct_answer;

    // Disable buttons to prevent double clicking
    toggleButtons(false);

    // Update session record
    sessionQuestions.push({
        question: currentQuestion.question,
        user_answer: userChoice,
        correct_answer: currentQuestion.correct_answer,
        is_correct: isCorrect,
        explanation: currentQuestion.explanation
    });

    // Update stats
    stats.total_attempts++;
    if (isCorrect) stats.correct_answers++;
    stats.accuracy = Math.round((stats.correct_answers / stats.total_attempts) * 100);

    // Update UI Stats
    updateStatsUI();

    // Show Result
    showResult(isCorrect);

    // Record to database
    try {
        await _supabase.from('user_answers').insert([
            {
                question_id: currentQuestion.id,
                user_answer: userChoice,
                is_correct: isCorrect
            }
        ]);
    } catch (err) {
        console.error('Error saving answer:', err);
    }

    // Start Next Question Timer or Show Summary
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

async function downloadResults() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(99, 102, 241); // Indigo color from CSS
    doc.text("GK Insight - Quiz Results", margin, y);
    y += 12;

    // Summary Line
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.setFont("helvetica", "normal");
    const dateStr = new Date().toLocaleString();
    doc.text(`Player: ${userName}`, margin, y);
    y += 7;
    doc.text(`Completed on: ${dateStr}`, margin, y);
    y += 15;

    // Stats Box
    doc.setFillColor(245, 247, 250);
    doc.rect(margin, y, pageWidth - (margin * 2), 25, 'F');
    doc.setFont("helvetica", "bold");
    doc.text(`Score: ${stats.correct_answers}/${MAX_QUESTIONS}`, margin + 10, y + 15);
    doc.text(`Accuracy: ${stats.accuracy}%`, margin + 60, y + 15);
    doc.text(`Level: ${calculateLevel(stats.accuracy)}`, margin + 110, y + 15);
    y += 35;

    // Questions
    doc.setFontSize(10);
    sessionQuestions.forEach((q, i) => {
        // Check for page break
        if (y > 270) {
            doc.addPage();
            y = 20;
        }

        doc.setFont("helvetica", "bold");
        const qLine = `${i + 1}. ${q.question}`;
        const splitQ = doc.splitTextToSize(qLine, pageWidth - (margin * 2));
        doc.text(splitQ, margin, y);
        y += (splitQ.length * 5) + 2;

        doc.setFont("helvetica", "normal");
        const status = q.is_correct ? "CORRECT ✅" : "INCORRECT ❌";
        doc.setTextColor(q.is_correct ? 34 : 239, q.is_correct ? 197 : 68, q.is_correct ? 94 : 68);
        doc.text(`Your Choice: ${q.user_answer ? 'YES' : 'NO'} (${status})`, margin + 5, y);
        y += 6;

        doc.setTextColor(100, 100, 100);
        const explHead = "Explanation: ";
        const explText = q.explanation;
        const splitExpl = doc.splitTextToSize(explHead + explText, pageWidth - (margin * 3));
        doc.text(splitExpl, margin + 5, y);
        y += (splitExpl.length * 5) + 10;

        doc.setTextColor(0, 0, 0); // Reset color
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Generated by GK Insight - Test Your Knowledge", pageWidth / 2, 285, { align: 'center' });

    doc.save(`gk_insight_results_${new Date().getTime()}.pdf`);
}

function showResult(isCorrect) {
    resultSection.classList.remove('hidden');
    resultMessage.innerText = isCorrect ? "✨ Correct! Well done." : "❌ Incorrect. Keep learning!";
    resultMessage.className = `result-message ${isCorrect ? 'correct' : 'wrong'}`;
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

        // Progress bar filling up
        const progress = ((3 - timeLeft) / 3) * 100;
        progressBar.style.width = `${progress}%`;

        if (timeLeft <= 0) {
            clearInterval(nextTimerInterval);
            loadNewQuestion();
        }
    }, 1000);
}

function skipToNext() {
    if (nextTimerInterval) clearInterval(nextTimerInterval);
    loadNewQuestion();
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
