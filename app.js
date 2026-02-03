// ===== Constants and Storage Keys =====
const STORAGE_KEYS = {
    answers: 'arkDriverExam_answers',
    performance: 'arkDriverExam_performance',
    progress: 'arkDriverExam_progress'
};

// ===== Global State =====
let questions = [];
let currentQuestionIndex = 0;
let currentQuestionSet = [];
let currentMode = 'all';
let selectedTopic = null;
let hasAnswered = false;
let studentData = {
    answeredQuestions: {},
    categoryPerformance: {},
    overallStats: { correct: 0, total: 0, percentage: 0 }
};

// ===== DOM Elements =====
const elements = {
    // Sections
    welcomeScreen: document.getElementById('welcome-screen'),
    topicScreen: document.getElementById('topic-screen'),
    quizArea: document.getElementById('quiz-area'),
    statsPanel: document.getElementById('stats-panel'),
    noQuestionsScreen: document.getElementById('no-questions-screen'),

    // Mode tabs
    allQuestionsBtn: document.getElementById('all-questions-btn'),
    missedQuestionsBtn: document.getElementById('missed-questions-btn'),
    byTopicBtn: document.getElementById('by-topic-btn'),
    statsBtn: document.getElementById('stats-btn'),

    // Welcome screen
    startQuizBtn: document.getElementById('start-quiz-btn'),
    resetDataBtn: document.getElementById('reset-data-btn'),

    // Topic screen
    topicList: document.getElementById('topic-list'),
    backToWelcomeBtn: document.getElementById('back-to-welcome-btn'),

    // Quiz area
    questionNumber: document.getElementById('question-number'),
    questionCategory: document.getElementById('question-category'),
    questionDisplay: document.getElementById('question-display'),
    answerOptions: document.getElementById('answer-options'),
    feedback: document.getElementById('feedback'),
    feedbackHeader: document.getElementById('feedback-header'),
    feedbackExplanation: document.getElementById('feedback-explanation'),
    nextQuestionBtn: document.getElementById('next-question-btn'),
    quitQuizBtn: document.getElementById('quit-quiz-btn'),

    // Stats
    progressText: document.getElementById('progress-text'),
    accuracyText: document.getElementById('accuracy-text'),
    missedCount: document.getElementById('missed-count'),
    totalAnswered: document.getElementById('total-answered'),
    totalCorrect: document.getElementById('total-correct'),
    overallPercentage: document.getElementById('overall-percentage'),
    questionsToReview: document.getElementById('questions-to-review'),
    categoryStats: document.getElementById('category-stats'),
    recommendationsList: document.getElementById('recommendations-list'),
    reviewWeakAreasBtn: document.getElementById('review-weak-areas-btn'),
    backToMenuBtn: document.getElementById('back-to-menu-btn'),

    // No questions screen
    noQuestionsMessage: document.getElementById('no-questions-message'),
    backFromEmptyBtn: document.getElementById('back-from-empty-btn'),

    // Modals
    resetModal: document.getElementById('reset-modal'),
    confirmResetBtn: document.getElementById('confirm-reset-btn'),
    cancelResetBtn: document.getElementById('cancel-reset-btn'),
    aboutModal: document.getElementById('about-modal'),
    aboutLink: document.getElementById('about-link'),
    closeAboutBtn: document.getElementById('close-about-btn')
};

// ===== Initialization =====
async function init() {
    try {
        await loadQuestions();
        loadStudentData();
        attachEventListeners();
        updateStatsDisplay();
        showScreen('welcome');
    } catch (error) {
        console.error('Initialization error:', error);
        alert('Error loading questions. Please refresh the page.');
    }
}

// ===== Load Questions =====
async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) throw new Error('Failed to load questions');
        const data = await response.json();
        questions = data.questions;
    } catch (error) {
        console.error('Error loading questions:', error);
        throw error;
    }
}

// ===== LocalStorage Management =====
function loadStudentData() {
    const savedAnswers = localStorage.getItem(STORAGE_KEYS.answers);
    if (savedAnswers) {
        studentData.answeredQuestions = JSON.parse(savedAnswers);
    }
    calculatePerformance();
}

function saveStudentData() {
    localStorage.setItem(STORAGE_KEYS.answers, JSON.stringify(studentData.answeredQuestions));
}

function resetAllData() {
    localStorage.removeItem(STORAGE_KEYS.answers);
    localStorage.removeItem(STORAGE_KEYS.performance);
    localStorage.removeItem(STORAGE_KEYS.progress);
    studentData = {
        answeredQuestions: {},
        categoryPerformance: {},
        overallStats: { correct: 0, total: 0, percentage: 0 }
    };
    calculatePerformance();
    updateStatsDisplay();
}

// ===== Performance Calculation =====
function calculatePerformance() {
    let totalCorrect = 0;
    let totalAnswered = 0;
    const categoryData = {};

    // Initialize categories
    questions.forEach(q => {
        if (!categoryData[q.category]) {
            categoryData[q.category] = { correct: 0, total: 0, percentage: 0 };
        }
    });

    // Calculate from answered questions
    Object.keys(studentData.answeredQuestions).forEach(questionId => {
        const answer = studentData.answeredQuestions[questionId];
        const question = questions.find(q => q.id === parseInt(questionId));

        if (question && answer.correct !== undefined) {
            totalAnswered++;
            if (answer.correct) {
                totalCorrect++;
                categoryData[question.category].correct++;
            }
            categoryData[question.category].total++;
        }
    });

    // Calculate percentages
    Object.keys(categoryData).forEach(category => {
        const cat = categoryData[category];
        cat.percentage = cat.total > 0 ? Math.round((cat.correct / cat.total) * 100) : 0;
    });

    studentData.overallStats = {
        correct: totalCorrect,
        total: totalAnswered,
        percentage: totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0
    };

    studentData.categoryPerformance = categoryData;
}

// ===== Update Stats Display =====
function updateStatsDisplay() {
    const stats = studentData.overallStats;
    const missedQuestions = getMissedQuestions();
    const unansweredQuestions = getUnansweredQuestions();

    // Show total answered out of all questions
    elements.progressText.textContent = `${stats.total}/${questions.length}`;
    elements.accuracyText.textContent = `${stats.percentage}%`;
    elements.missedCount.textContent = missedQuestions.length;
}

// ===== Get Missed Questions =====
function getMissedQuestions() {
    return questions.filter(q => {
        const answer = studentData.answeredQuestions[q.id];
        return answer && answer.correct === false;
    });
}

// ===== Screen Management =====
function showScreen(screenName) {
    // Hide all screens
    elements.welcomeScreen.classList.add('hidden');
    elements.topicScreen.classList.add('hidden');
    elements.quizArea.classList.add('hidden');
    elements.statsPanel.classList.add('hidden');
    elements.noQuestionsScreen.classList.add('hidden');

    // Show requested screen
    switch (screenName) {
        case 'welcome':
            elements.welcomeScreen.classList.remove('hidden');
            break;
        case 'topic':
            elements.topicScreen.classList.remove('hidden');
            renderTopicList();
            break;
        case 'quiz':
            elements.quizArea.classList.remove('hidden');
            break;
        case 'stats':
            elements.statsPanel.classList.remove('hidden');
            renderStatsPanel();
            break;
        case 'no-questions':
            elements.noQuestionsScreen.classList.remove('hidden');
            break;
    }
}

// ===== Mode Management =====
function setMode(mode) {
    currentMode = mode;

    // Update active tab
    document.querySelectorAll('.mode-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    if (mode === 'all') {
        elements.allQuestionsBtn.classList.add('active');
    } else if (mode === 'missed') {
        elements.missedQuestionsBtn.classList.add('active');
    } else if (mode === 'topic') {
        elements.byTopicBtn.classList.add('active');
    } else if (mode === 'stats') {
        elements.statsBtn.classList.add('active');
    }
}

// ===== Get Unanswered Questions =====
function getUnansweredQuestions() {
    return questions.filter(q => {
        const answer = studentData.answeredQuestions[q.id];
        return !answer; // Question has never been answered
    });
}

// ===== Start Quiz =====
function startQuiz(mode, topic = null) {
    setMode(mode);
    selectedTopic = topic;

    // Prepare question set based on mode
    if (mode === 'all') {
        currentQuestionSet = getUnansweredQuestions();
        if (currentQuestionSet.length === 0) {
            elements.noQuestionsMessage.textContent = "You've answered all questions! Review your stats or practice missed questions.";
            showScreen('no-questions');
            return;
        }
    } else if (mode === 'missed') {
        currentQuestionSet = getMissedQuestions();
        if (currentQuestionSet.length === 0) {
            elements.noQuestionsMessage.textContent = "You haven't missed any questions yet. Great job!";
            showScreen('no-questions');
            return;
        }
    } else if (mode === 'topic' && topic) {
        // For topic mode, show unanswered questions in that topic
        currentQuestionSet = questions.filter(q => {
            const answer = studentData.answeredQuestions[q.id];
            return q.category === topic && !answer;
        });
        if (currentQuestionSet.length === 0) {
            elements.noQuestionsMessage.textContent = `You've answered all questions in ${topic}. Great job!`;
            showScreen('no-questions');
            return;
        }
    }

    // Shuffle questions
    shuffleArray(currentQuestionSet);

    // Start from first question
    currentQuestionIndex = 0;
    showScreen('quiz');
    displayQuestion();
}

// ===== Shuffle Array =====
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ===== Display Question =====
function displayQuestion() {
    if (currentQuestionIndex >= currentQuestionSet.length) {
        // Quiz complete
        showScreen('stats');
        return;
    }

    const question = currentQuestionSet[currentQuestionIndex];
    hasAnswered = false;

    // Update question info
    elements.questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestionSet.length}`;
    elements.questionCategory.textContent = question.category;
    elements.questionDisplay.textContent = question.question;

    // Clear previous answer options
    elements.answerOptions.innerHTML = '';

    // Hide feedback and next button
    elements.feedback.classList.add('hidden');
    elements.nextQuestionBtn.classList.add('hidden');

    // Create answer options based on question type
    if (question.type === 'true-false') {
        createTrueFalseOptions();
    } else if (question.type === 'multiple-choice') {
        createMultipleChoiceOptions(question.options);
    }
}

// ===== Create True/False Options =====
function createTrueFalseOptions() {
    const options = ['True', 'False'];
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'answer-option';
        button.textContent = option;
        button.dataset.answer = index === 0; // true for True, false for False
        button.addEventListener('click', () => selectAnswer(button));
        elements.answerOptions.appendChild(button);
    });
}

// ===== Create Multiple Choice Options =====
function createMultipleChoiceOptions(options) {
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'answer-option';
        button.textContent = option;
        button.dataset.answer = index;
        button.addEventListener('click', () => selectAnswer(button));
        elements.answerOptions.appendChild(button);
    });
}

// ===== Select Answer =====
function selectAnswer(selectedButton) {
    if (hasAnswered) return;

    const question = currentQuestionSet[currentQuestionIndex];
    let userAnswer;
    let isCorrect;

    if (question.type === 'true-false') {
        userAnswer = selectedButton.dataset.answer === 'true';
        isCorrect = userAnswer === question.correctAnswer;
    } else if (question.type === 'multiple-choice') {
        userAnswer = parseInt(selectedButton.dataset.answer);
        isCorrect = userAnswer === question.correctAnswer;
    }

    hasAnswered = true;

    // Mark selected answer
    selectedButton.classList.add('selected');

    // Disable all options
    const allOptions = elements.answerOptions.querySelectorAll('.answer-option');
    allOptions.forEach(option => {
        option.classList.add('disabled');
    });

    // Show correct/incorrect feedback
    if (isCorrect) {
        selectedButton.classList.add('correct');
        showFeedback(true, question.explanation);
    } else {
        selectedButton.classList.add('incorrect');
        // Highlight the correct answer
        if (question.type === 'true-false') {
            allOptions.forEach(option => {
                if ((option.dataset.answer === 'true') === question.correctAnswer) {
                    option.classList.add('correct');
                }
            });
        } else {
            allOptions[question.correctAnswer].classList.add('correct');
        }
        showFeedback(false, question.explanation);
    }

    // Save answer
    saveAnswer(question.id, isCorrect, question.category);

    // Show next button
    elements.nextQuestionBtn.classList.remove('hidden');
}

// ===== Show Feedback =====
function showFeedback(isCorrect, explanation) {
    elements.feedback.classList.remove('hidden', 'correct', 'incorrect');

    if (isCorrect) {
        elements.feedback.classList.add('correct');
        elements.feedbackHeader.textContent = '✓ Correct!';
    } else {
        elements.feedback.classList.add('incorrect');
        elements.feedbackHeader.textContent = '✗ Incorrect';
    }

    elements.feedbackExplanation.textContent = explanation;
}

// ===== Save Answer =====
function saveAnswer(questionId, isCorrect, category) {
    if (!studentData.answeredQuestions[questionId]) {
        studentData.answeredQuestions[questionId] = {
            correct: isCorrect,
            attempts: 1,
            lastAttempt: Date.now()
        };
    } else {
        studentData.answeredQuestions[questionId].correct = isCorrect;
        studentData.answeredQuestions[questionId].attempts++;
        studentData.answeredQuestions[questionId].lastAttempt = Date.now();
    }

    saveStudentData();
    calculatePerformance();
    updateStatsDisplay();
}

// ===== Next Question =====
function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

// ===== Render Topic List =====
function renderTopicList() {
    const topics = [...new Set(questions.map(q => q.category))];
    elements.topicList.innerHTML = '';

    topics.forEach(topic => {
        const topicQuestions = questions.filter(q => q.category === topic);
        const performance = studentData.categoryPerformance[topic] || { correct: 0, total: 0, percentage: 0 };

        const topicItem = document.createElement('div');
        topicItem.className = 'topic-item';
        topicItem.innerHTML = `
            <div class="topic-name">${topic}</div>
            <div class="topic-stats">${topicQuestions.length} questions</div>
            <div class="topic-stats">${performance.total > 0 ? `${performance.percentage}% correct` : 'Not started'}</div>
        `;
        topicItem.addEventListener('click', () => startQuiz('topic', topic));
        elements.topicList.appendChild(topicItem);
    });
}

// ===== Render Stats Panel =====
function renderStatsPanel() {
    const stats = studentData.overallStats;
    const missedQuestions = getMissedQuestions();

    // Overall stats
    elements.totalAnswered.textContent = stats.total;
    elements.totalCorrect.textContent = stats.correct;
    elements.overallPercentage.textContent = `${stats.percentage}%`;
    elements.questionsToReview.textContent = missedQuestions.length;

    // Category performance
    elements.categoryStats.innerHTML = '';
    const categories = Object.keys(studentData.categoryPerformance).sort();

    categories.forEach(category => {
        const perf = studentData.categoryPerformance[category];
        if (perf.total === 0) return;

        const item = document.createElement('div');
        item.className = 'category-stat-item';

        if (perf.percentage >= 80) {
            item.classList.add('strong');
        } else if (perf.percentage < 60) {
            item.classList.add('weak');
        }

        item.innerHTML = `
            <span class="category-name">${category}</span>
            <span class="category-score ${perf.percentage >= 80 ? 'strong' : perf.percentage < 60 ? 'weak' : ''}">${perf.correct}/${perf.total} (${perf.percentage}%)</span>
        `;

        elements.categoryStats.appendChild(item);
    });

    // Recommendations
    elements.recommendationsList.innerHTML = '';
    const weakCategories = categories.filter(cat => {
        const perf = studentData.categoryPerformance[cat];
        return perf.total > 0 && perf.percentage < 60;
    });

    if (weakCategories.length > 0) {
        weakCategories.forEach(cat => {
            const item = document.createElement('div');
            item.className = 'recommendation-item';
            item.textContent = `Focus on ${cat} - current score: ${studentData.categoryPerformance[cat].percentage}%`;
            elements.recommendationsList.appendChild(item);
        });
    } else if (stats.total > 0) {
        const item = document.createElement('div');
        item.className = 'recommendation-item';
        item.style.background = 'var(--success-color)';
        item.textContent = 'Great job! Keep practicing all categories to maintain your knowledge.';
        elements.recommendationsList.appendChild(item);
    } else {
        const item = document.createElement('div');
        item.className = 'recommendation-item';
        item.textContent = 'Start by answering questions in all categories to identify your weak areas.';
        elements.recommendationsList.appendChild(item);
    }
}

// ===== Event Listeners =====
function attachEventListeners() {
    // Mode tabs
    elements.allQuestionsBtn.addEventListener('click', () => startQuiz('all'));
    elements.missedQuestionsBtn.addEventListener('click', () => startQuiz('missed'));
    elements.byTopicBtn.addEventListener('click', () => showScreen('topic'));
    elements.statsBtn.addEventListener('click', () => showScreen('stats'));

    // Welcome screen
    elements.startQuizBtn.addEventListener('click', () => startQuiz('all'));
    elements.resetDataBtn.addEventListener('click', () => elements.resetModal.classList.remove('hidden'));

    // Topic screen
    elements.backToWelcomeBtn.addEventListener('click', () => showScreen('welcome'));

    // Quiz controls
    elements.nextQuestionBtn.addEventListener('click', nextQuestion);
    elements.quitQuizBtn.addEventListener('click', () => showScreen('welcome'));

    // Stats panel
    elements.reviewWeakAreasBtn.addEventListener('click', () => startQuiz('missed'));
    elements.backToMenuBtn.addEventListener('click', () => showScreen('welcome'));

    // No questions screen
    elements.backFromEmptyBtn.addEventListener('click', () => showScreen('welcome'));

    // Reset modal
    elements.confirmResetBtn.addEventListener('click', () => {
        resetAllData();
        elements.resetModal.classList.add('hidden');
        alert('All progress has been reset.');
    });
    elements.cancelResetBtn.addEventListener('click', () => {
        elements.resetModal.classList.add('hidden');
    });

    // About modal
    elements.aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        elements.aboutModal.classList.remove('hidden');
    });
    elements.closeAboutBtn.addEventListener('click', () => {
        elements.aboutModal.classList.add('hidden');
    });

    // Close modals on outside click
    elements.resetModal.addEventListener('click', (e) => {
        if (e.target === elements.resetModal) {
            elements.resetModal.classList.add('hidden');
        }
    });
    elements.aboutModal.addEventListener('click', (e) => {
        if (e.target === elements.aboutModal) {
            elements.aboutModal.classList.add('hidden');
        }
    });
}

// ===== Initialize App on Load =====
document.addEventListener('DOMContentLoaded', init);
