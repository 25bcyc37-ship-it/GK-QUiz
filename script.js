// GK Insight - Script Logic

// --- Local Question Data ---
const QUESTIONS_DATA = [
    { question: "Is the Sun a star", correct_answer: true, category: "Science", difficulty: "Easy", explanation: "The Sun is a star at the center of the solar system." },
    { question: "Does sound travel in a vacuum?", correct_answer: false, category: "Physics", difficulty: "Easy", explanation: "Sound requires a medium like air or water to travel." },
    { question: "Is the Great Wall of China visible from the moon with the naked eye?", correct_answer: false, category: "Geography", difficulty: "Medium", explanation: "It is generally not visible without aid from such a distance." },
    { question: "Is a group of pandas called an 'embarrassment'?", correct_answer: true, category: "Nature", difficulty: "Hard", explanation: "That is the scientific collective noun for pandas." },
    { question: "Was the first iPhone released in 2007?", correct_answer: true, category: "Technology", difficulty: "Easy", explanation: "Steve Jobs unveiled the first iPhone on January 9, 2007." },
    { question: "Is the capital of Australia Sydney?", correct_answer: false, category: "Geography", difficulty: "Easy", explanation: "The capital city of Australia is Canberra." },
    { question: "Does water boil at a lower temperature at high altitudes?", correct_answer: true, category: "Science", difficulty: "Medium", explanation: "Lower atmospheric pressure reduces the boiling point." },
    { question: "Is Gold the most abundant metal in Earth's crust?", correct_answer: false, category: "Science", difficulty: "Medium", explanation: "Aluminum is the most abundant metal in the crust." },
    { question: "Was Alexander the Great a pupil of Aristotle?", correct_answer: true, category: "History", difficulty: "Medium", explanation: "Aristotle tutored Alexander for several years in his youth." },
    { question: "Is the human heart located on the right side of the chest?", correct_answer: false, category: "Biology", difficulty: "Easy", explanation: "The heart is typically located on the left side of the chest." },
    { question: "Is Venus the hottest planet in our solar system?", correct_answer: true, category: "Space", difficulty: "Medium", explanation: "Its thick atmosphere traps heat, reaching temperatures over 460°C." },
    { question: "Was Leonardo da Vinci the painter of 'The Starry Night'?", correct_answer: false, category: "Art", difficulty: "Easy", explanation: "Vincent van Gogh painted 'The Starry Night'." },
    { question: "Is the Nile the longest river in the world?", correct_answer: true, category: "Geography", difficulty: "Easy", explanation: "The Nile is widely considered the longest river on Earth." },
    { question: "Can sharks swim backwards?", correct_answer: false, category: "Nature", difficulty: "Medium", explanation: "Most sharks lack the fin structures required to swim backwards." },
    { question: "Is the chemical symbol for Silver 'Au'?", correct_answer: false, category: "Science", difficulty: "Easy", explanation: "'Au' is for Gold; Silver is 'Ag'." },
    { question: "Was the Berlin Wall torn down in 1989?", correct_answer: true, category: "History", difficulty: "Easy", explanation: "The wall fell on November 9, 1989." },
    { question: "Is a triangle with all equal sides called a scalene triangle?", correct_answer: false, category: "Math", difficulty: "Easy", explanation: "It is an equilateral triangle." },
    { question: "Does the human body have four lungs?", correct_answer: false, category: "Biology", difficulty: "Easy", explanation: "Humans have two lungs." },
    { question: "Is Mount Kilimanjaro the tallest mountain in Africa?", correct_answer: true, category: "Geography", difficulty: "Easy", explanation: "It is a dormant volcano in Tanzania." },
    { question: "Was the internet originally a military project known as ARPANET?", correct_answer: true, category: "Technology", difficulty: "Medium", explanation: "It was funded by the US Department of Defense." },
    { question: "Is the Amazon rainforest located primarily in Brazil?", correct_answer: true, category: "Geography", difficulty: "Easy", explanation: "Over 60% of the rainforest is in Brazil." },
    { question: "Is the element Oxygen a liquid at room temperature?", correct_answer: false, category: "Science", difficulty: "Easy", explanation: "Oxygen is a gas at room temperature." },
    { question: "Was the Eiffel Tower intended to be a temporary structure?", correct_answer: true, category: "History", difficulty: "Medium", explanation: "It was built for the 1889 World's Fair and slated for demolition after 20 years." },
    { question: "Is a octopus considered a mammal?", correct_answer: false, category: "Nature", difficulty: "Easy", explanation: "Octopuses are cephalopod mollusks." },
    { question: "Is the speed of light faster than the speed of sound?", correct_answer: true, category: "Physics", difficulty: "Easy", explanation: "Light travels at ~300,000 km/s, sound at ~0.34 km/s." },
    { question: "Was the Magna Carta signed in 1215?", correct_answer: true, category: "History", difficulty: "Medium", explanation: "King John signed it at Runnymede in June 1215." },
    { question: "Is the Sahara the largest desert in the world?", correct_answer: false, category: "Geography", difficulty: "Hard", explanation: "Antarctica is the largest desert; Sahara is the largest hot desert." },
    { question: "Is the capital of Japan Osaka?", correct_answer: false, category: "Geography", difficulty: "Easy", explanation: "The capital of Japan is Tokyo." },
    { question: "Does the moon produce its own light?", correct_answer: false, category: "Space", difficulty: "Easy", explanation: "The moon reflects light from the sun." },
    { question: "Is the human brain the largest organ in the human body?", correct_answer: false, category: "Biology", difficulty: "Easy", explanation: "The skin is the largest organ." },
    { question: "Was George Washington the first president of the United States?", correct_answer: true, category: "History", difficulty: "Easy", explanation: "He served from 1789 to 1797." },
    { question: "Is a marathon 26.2 miles long?", correct_answer: true, category: "Sports", difficulty: "Easy", explanation: "The official distance is 42.195 kilometers." },
    { question: "Is the Pacific Ocean the deepest ocean on Earth?", correct_answer: true, category: "Geography", difficulty: "Easy", explanation: "It contains the Mariana Trench, the deepest point." },
    { question: "Is the square root of 144 equal to 12?", correct_answer: true, category: "Math", difficulty: "Easy", explanation: "12 times 12 is 144." },
    { question: "Is the Statue of Liberty a gift from France?", correct_answer: true, category: "History", difficulty: "Easy", explanation: "It was dedicated in 1886 to commemorate US independence." },
    { question: "Is the planet Mars known as the 'Blue Planet'?", correct_answer: false, category: "Space", difficulty: "Easy", explanation: "Earth is the Blue Planet; Mars is the Red Planet." },
    { question: "Can an ostrich fly?", correct_answer: false, category: "Nature", difficulty: "Easy", explanation: "Ostriches are flightless birds." },
    { question: "Is the capital of Canada Toronto?", correct_answer: false, category: "Geography", difficulty: "Easy", explanation: "The capital of Canada is Ottawa." },
    { question: "Was the Titanic sunk by an iceberg in 1912?", correct_answer: true, category: "History", difficulty: "Easy", explanation: "The tragedy occurred on its maiden voyage in April 1912." },
    { question: "Is the freezing point of water 0 degrees Celsius?", correct_answer: true, category: "Science", difficulty: "Easy", explanation: "At standard atmospheric pressure, water freezes at 0°C." },
    { question: "Is a spider an insect?", correct_answer: false, category: "Nature", difficulty: "Easy", explanation: "Spiders are arachnids (8 legs, not 6)." },
    { question: "Is the Mona Lisa located in the British Museum?", correct_answer: false, category: "Art", difficulty: "Easy", explanation: "The Mona Lisa is in the Louvre Museum in Paris." },
    { question: "Is the Great Barrier Reef the largest living structure on Earth?", correct_answer: true, category: "Nature", difficulty: "Medium", explanation: "It can be seen from space." },
    { question: "Was the desktop computer mouse invented by Xerox?", correct_answer: true, category: "Technology", difficulty: "Hard", explanation: "Xerox PARC developed a commercial mouse, though Douglas Engelbart created the first prototype." },
    { question: "Is the capital of Italy Rome?", correct_answer: true, category: "Geography", difficulty: "Easy", explanation: "Rome has been the capital since 1871." },
    { question: "Does the human skeleton have more bones as an adult than as a baby?", correct_answer: false, category: "Biology", difficulty: "Medium", explanation: "Babies have about 300 bones, many of which fuse together to form 206 as adults." },
    { question: "Is the currency of the United Kingdom the Euro?", correct_answer: false, category: "Finance", difficulty: "Easy", explanation: "The UK uses the Pound Sterling." },
    { question: "Was Abraham Lincoln the 16th President of the United States?", correct_answer: true, category: "History", difficulty: "Easy", explanation: "He served during the American Civil War." },
    { question: "Is a leap year occurring every 4 years?", correct_answer: true, category: "General", difficulty: "Easy", explanation: "It occurs in years divisible by 4 (with some exceptions for century years)." },
    { question: "Is the North Pole located on a continent?", correct_answer: false, category: "Geography", difficulty: "Medium", explanation: "The North Pole is located in the Arctic Ocean, covered by shifting sea ice." },
    { question: "Is the atom the smallest unit of matter?", correct_answer: false, category: "Science", difficulty: "Medium", explanation: "Subatomic particles like quarks and leptons are smaller." },
    { question: "Was the first successful airplane flight by the Wright Brothers in 1903?", correct_answer: true, category: "History", difficulty: "Easy", explanation: "It took place at Kitty Hawk, North Carolina." },
    { question: "Is the capital of Russia Saint Petersburg?", correct_answer: false, category: "Geography", difficulty: "Easy", explanation: "The capital is Moscow." },
    { question: "Does honey never spoil?", correct_answer: true, category: "Nature", difficulty: "Medium", explanation: "Archaeologists have found pots of honey in ancient Egyptian tombs that are still edible." },
    { question: "Is the ostrich the largest bird in the world?", correct_answer: true, category: "Nature", difficulty: "Easy", explanation: "It can grow up to 9 feet tall and weigh 300 pounds." },
    { question: "Is the Pacific Ocean smaller than the Atlantic Ocean?", correct_answer: false, category: "Geography", difficulty: "Easy", explanation: "The Pacific is the largest ocean." },
    { question: "Was Albert Einstein the author of the theory of relativity?", correct_answer: true, category: "Science", difficulty: "Easy", explanation: "He published General Relativity in 1915." },
    { question: "Is the human heart a muscle?", correct_answer: true, category: "Biology", difficulty: "Easy", explanation: "It is a specialized cardiac muscle." },
    { question: "Is the capital of Spain Madrid?", correct_answer: true, category: "Geography", difficulty: "Easy", explanation: "Madrid has been the capital since 1561." },
    { question: "Does the Earth revolve around the Sun in a perfectly circular orbit?", correct_answer: false, category: "Space", difficulty: "Medium", explanation: "The orbit is slightly elliptical (egg-shaped)." },
    { question: "Is the Great Wall of China a single continuous wall?", correct_answer: false, category: "History", difficulty: "Medium", explanation: "It is a series of walls and fortifications built over many centuries." },
    { question: "Is the diamond the hardest natural substance on Earth?", correct_answer: true, category: "Science", difficulty: "Easy", explanation: "It scores a 10 on the Mohs scale." },
    { question: "Was the first man on the moon Neil Armstrong?", correct_answer: true, category: "History", difficulty: "Easy", explanation: "He landed on July 20, 1969." },
    { question: "Is the capital of Germany Munich?", correct_answer: false, category: "Geography", difficulty: "Easy", explanation: "The capital of Germany is Berlin." },
    { question: "Do dolphins use echolocation to find food?", correct_answer: true, category: "Nature", difficulty: "Easy", explanation: "They emit sound waves that bounce off objects." },
    { question: "Is the Amazon river the widest river in the world?", correct_answer: true, category: "Geography", difficulty: "Hard", explanation: "During the wet season, it can be up to 30 miles wide." },
    { question: "Was the telephone invented by Thomas Edison?", correct_answer: false, category: "Technology", difficulty: "Easy", explanation: "Alexander Graham Bell is credited with the invention." },
    { question: "Is the human lung capacity larger in the left lung than the right?", correct_answer: false, category: "Biology", difficulty: "Medium", explanation: "The right lung is larger; the left is smaller to make room for the heart." },
    { question: "Is the capital of Turkey Istanbul?", correct_answer: false, category: "Geography", difficulty: "Easy", explanation: "The capital of Turkey is Ankara." },
    { question: "Does the Earth rotate on its axis once every 24 hours?", correct_answer: true, category: "Space", difficulty: "Easy", explanation: "This rotation creates the day and night cycle." },
    { question: "Is the Great Pyramid of Giza the oldest of the Seven Wonders of the Ancient World?", correct_answer: true, category: "History", difficulty: "Medium", explanation: "It is also the only one that remains largely intact." },
    { question: "Is the chemical symbol for Iron 'Fe'?", correct_answer: true, category: "Science", difficulty: "Easy", explanation: "It comes from the Latin word 'ferrum'." },
    { question: "Was the first satellite launched into space named Sputnik?", correct_answer: true, category: "History", difficulty: "Medium", explanation: "It was launched by the Soviet Union in 1957." },
    { question: "Is the capital of Brazil Rio de Janeiro?", correct_answer: false, category: "Geography", difficulty: "Easy", explanation: "The capital is Brasília." },
    { question: "Do polar bears live in Antarctica?", correct_answer: false, category: "Nature", difficulty: "Easy", explanation: "Polar bears live in the Arctic; penguins live in Antarctica." },
    { question: "Is the Grand Canyon located in the state of California?", correct_answer: false, category: "Geography", difficulty: "Easy", explanation: "It is located in Arizona." },
    { question: "Was the light bulb invented solely by Thomas Edison?", correct_answer: false, category: "History", difficulty: "Medium", explanation: "While he perfected the commercial bulb, many others had worked on similar designs earlier." },
    { question: "Is the human body approximately 60% water?", correct_answer: true, category: "Biology", difficulty: "Easy", explanation: "Varies by age and sex, but 60% is the average for adults." },
    { question: "Is the capital of Greece Athens?", correct_answer: true, category: "Geography", difficulty: "Easy", explanation: "Athens is one of the world's oldest cities." },
    { question: "Does a octopus have three hearts?", correct_answer: true, category: "Nature", difficulty: "Medium", explanation: "Two pump blood to the gills, one to the rest of the body." },
    { question: "Is the Great Sphinx of Giza thought to represent a pharaoh?", correct_answer: true, category: "History", difficulty: "Medium", explanation: "It is commonly believed to represent Pharaoh Khafre." },
    { question: "Is the chemical symbol for Sodium 'So'?", correct_answer: false, category: "Science", difficulty: "Easy", explanation: "The symbol for Sodium is 'Na'." },
    { question: "Was the first computer programmer a woman named Ada Lovelace?", correct_answer: true, category: "Technology", difficulty: "Hard", explanation: "She wrote the first algorithm intended for a machine in the 1840s." },
    { question: "Is the capital of Egypt Cairo?", correct_answer: true, category: "Geography", difficulty: "Easy", explanation: "Cairo is the largest city in Africa and the Middle East." },
    { question: "Do snakes have ears?", correct_answer: false, category: "Nature", difficulty: "Medium", explanation: "They lack external ears but can feel vibrations through their jawbones." },
    { question: "Is the Earth's core solid?", correct_answer: true, category: "Earth", difficulty: "Medium", explanation: "The inner core is a solid ball of iron and nickel." },
    { question: "Was the American Civil War fought between 1861 and 1865?", correct_answer: true, category: "History", difficulty: "Easy", explanation: "It was between the Northern Union and Southern Confederacy." },
    { question: "Is the capital of India Mumbai?", correct_answer: false, category: "Geography", difficulty: "Easy", explanation: "The capital of India is New Delhi." },
    { question: "Does a year on Jupiter last 12 Earth years?", correct_answer: true, category: "Space", difficulty: "Hard", explanation: "Jupiter takes about 11.86 Earth years to orbit the Sun." },
    { question: "Is the Great Wall of China visible from the International Space Station without magnification?", correct_answer: true, category: "Space", difficulty: "Hard", explanation: "Some astronauts state it is visible under perfect conditions, unlike the moon." },
    { question: "Is the chemical symbol for Potassium 'P'?", correct_answer: false, category: "Science", difficulty: "Easy", explanation: "The symbol for Potassium is 'K'." },
    { question: "Was the first video game 'Pong'?", correct_answer: false, category: "Technology", difficulty: "Medium", explanation: "'Tennis for Two' or 'Spacewar!' preceded Pong." },
    { question: "Is the capital of South Korea Seoul?", correct_answer: true, category: "Geography", difficulty: "Easy", explanation: "Seoul is one of the most populous cities in the world." },
    { question: "Do cats have fewer bones in their bodies than humans?", correct_answer: false, category: "Nature", difficulty: "Hard", explanation: "Cats have about 230-250 bones, while humans have 206." },
    { question: "Is the Earth's atmosphere composed mostly of Oxygen?", correct_answer: false, category: "Science", difficulty: "Medium", explanation: "Nitrogen makes up 78%, Oxygen only 21%." },
    { question: "Was the United Nations formed after World War I?", correct_answer: false, category: "History", difficulty: "Easy", explanation: "The League of Nations was after World War I; the United Nations was after World War II." },
    { question: "Is the capital of Mexico Mexico City?", correct_answer: true, category: "Geography", difficulty: "Easy", explanation: "It is built on the ruins of the Aztec capital, Tenochtitlan." },
    { question: "Does a snail have more teeth than a shark?", correct_answer: true, category: "Nature", difficulty: "Hard", explanation: "Some snails have over 14,000 microscopic teeth on their radula." },
    { question: "Is the Great Barrier Reef located off the coast of Australia?", correct_answer: true, category: "Geography", difficulty: "Easy", explanation: "It is in the Coral Sea, off the coast of Queensland." },
    { question: "Was the printing press invented by Johannes Gutenberg?", correct_answer: true, category: "History", difficulty: "Easy", explanation: "He introduced it to Europe around 1440." }
];

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
        // Use local data instead of Supabase
        const data = QUESTIONS_DATA;

        if (!data || data.length === 0) {
            console.error("Local question data is empty!");
            return;
        }

        // 1. Remove duplicates based on question text (extra safety)
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

    // Score recording removed (Supabase dependency removed)

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
