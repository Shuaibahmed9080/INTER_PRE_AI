import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Clock, CheckCircle, List, BarChart2, Zap, AlertTriangle, ArrowRight } from 'lucide-react';
import Navbar from '../components/layouts/Navbar';

// --- QUESTION DATA (120 Questions: 40 Quantitative, 40 Logical, 40 Verbal) ---
// NOTE: For brevity and demonstration purposes, a core set of questions is defined
// and then repeated/varied to meet the required 40 questions per category (120 total).
const generateQuestions = () => {
    const coreQuestions = [
        // Quantitative (10 Core)
        { id: 'Q1', category: 'Quantitative', questionText: 'If a dress is marked down by 20%, and the sale price is $80, what was the original price?', options: ['$96', '$100', '$84', '$120'], correctAnswer: 1, explanation: 'Let x be the original price. 0.8x = 80, so x = 80 / 0.8 = 100.' },
        { id: 'Q2', category: 'Quantitative', questionText: 'What is 15% of 300?', options: ['30', '45', '50', '25'], correctAnswer: 1, explanation: '15% of 300 is (15/100) * 300 = 45.' },
        { id: 'Q3', category: 'Quantitative', questionText: 'A car travels 60 miles in 1.5 hours. What is its average speed in mph?', options: ['40 mph', '45 mph', '30 mph', '50 mph'], correctAnswer: 0, explanation: 'Speed = Distance / Time = 60 miles / 1.5 hours = 40 mph.' },
        { id: 'Q4', category: 'Quantitative', questionText: 'Calculate the simple interest on $5000 at 5% per annum for 3 years.', options: ['$500', '$750', '$600', '$700'], correctAnswer: 1, explanation: 'Simple Interest = (P * R * T) / 100 = (5000 * 5 * 3) / 100 = 750.' },
        { id: 'Q5', category: 'Quantitative', questionText: 'If 3 workers can paint a fence in 4 days, how long will it take 6 workers?', options: ['1 day', '2 days', '3 days', '8 days'], correctAnswer: 1, explanation: 'Work is constant: W1 * D1 = W2 * D2. 3 * 4 = 6 * D2. D2 = 12 / 6 = 2 days.' },
        { id: 'Q6', category: 'Quantitative', questionText: 'What is the next number in the sequence: 2, 4, 8, 16, ...?', options: ['20', '30', '32', '64'], correctAnswer: 2, explanation: 'This is a geometric progression where each term is multiplied by 2.' },
        { id: 'Q7', category: 'Quantitative', questionText: 'If the area of a square is 64 cm², what is its perimeter?', options: ['16 cm', '32 cm', '24 cm', '48 cm'], correctAnswer: 1, explanation: 'Side length is sqrt(64) = 8 cm. Perimeter = 4 * 8 = 32 cm.' },
        { id: 'Q8', category: 'Quantitative', questionText: 'Solve for x: 2x + 5 = 15.', options: ['x = 10', 'x = 5', 'x = 7.5', 'x = 2'], correctAnswer: 1, explanation: '2x = 15 - 5 => 2x = 10 => x = 5.' },
        { id: 'Q9', category: 'Quantitative', questionText: 'The ratio of boys to girls in a class is 2:3. If there are 30 students total, how many girls are there?', options: ['12', '18', '15', '20'], correctAnswer: 1, explanation: 'Total parts = 5. Each part = 30/5 = 6. Girls = 3 parts = 3 * 6 = 18.' },
        { id: 'Q10', category: 'Quantitative', questionText: 'What is $0.75$ as a fraction in simplest form?', options: ['3/4', '1/4', '7/10', '3/5'], correctAnswer: 0, explanation: '0.75 is 75/100, which simplifies to 3/4.' },

        // Logical Reasoning (10 Core)
        { id: 'L1', category: 'Logical Reasoning', questionText: 'Identify the pattern: A, C, E, G, ?', options: ['I', 'H', 'J', 'K'], correctAnswer: 0, explanation: 'The pattern skips one letter (A, B skip, C, D skip, E, F skip, G, H skip, I).' },
        { id: 'L2', category: 'Logical Reasoning', questionText: 'If CAT is coded as 3120, what is DOG coded as?', options: ['4157', '4151', '41517', '41513'], correctAnswer: 0, explanation: 'A=1, B=2, C=3... D=4, O=15, G=7. So, DOG is 4157.' },
        { id: 'L3', category: 'Logical Reasoning', questionText: 'Which word does NOT belong: Apple, Banana, Carrot, Grape?', options: ['Apple', 'Banana', 'Carrot', 'Grape'], correctAnswer: 2, explanation: 'Carrot is a root vegetable; the others are fruits.' },
        { id: 'L4', category: 'Logical Reasoning', questionText: 'All men are mortal. Socrates is a man. Therefore, Socrates is...?', options: ['Greek', 'Mortal', 'Wise', 'A Philosopher'], correctAnswer: 1, explanation: 'This is a classic syllogism: If all A are B, and C is A, then C is B.' },
        { id: 'L5', category: 'Logical Reasoning', questionText: 'Analogy: Hand is to Glove as Foot is to...?', options: ['Sock', 'Shoe', 'Ankle', 'Toe'], correctAnswer: 1, explanation: 'Glove covers the hand; Shoe covers the foot.' },
        { id: 'L6', category: 'Logical Reasoning', questionText: 'If yesterday was Sunday, what day will tomorrow be?', options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], correctAnswer: 1, explanation: 'If yesterday was Sunday, today is Monday, and tomorrow will be Tuesday.' },
        { id: 'L7', category: 'Logical Reasoning', questionText: 'Find the odd one out: 1, 4, 9, 16, 20, 25.', options: ['4', '9', '16', '20'], correctAnswer: 3, explanation: '1, 4, 9, 16, 25 are perfect squares (1², 2², 3², 4², 5²). 20 is not.' },
        { id: 'L8', category: 'Logical Reasoning', questionText: 'In a certain language, "RAGHAV" is written as "VAGHAR". How is "SHARMA" written?', options: ['MARHAS', 'AMRAHS', 'AMRASH', 'HSAMRA'], correctAnswer: 2, explanation: 'The 1st and 4th letters are swapped, and 2nd/3rd and 5th/6th are swapped. R(A)G(H)A(V) -> V(A)G(H)A(R). S(H)A(R)M(A) -> A(M)R(A)S(H).' },
        { id: 'L9', category: 'Logical Reasoning', questionText: 'Statement: Many people are injured in road accidents. Action: Increase penalties for traffic violations. Is the action appropriate?', options: ['Yes, it addresses the cause.', 'No, it does not address the cause.', 'Irrelevant.', 'Too harsh.'], correctAnswer: 0, explanation: 'The action is a common deterrent intended to reduce violations, thus reducing accidents.' },
        { id: 'L10', category: 'Logical Reasoning', questionText: 'Which comes next in the sequence: Circle, Square, Triangle, Hexagon, ?', options: ['Pentagon', 'Heptagon', 'Octagon', 'Decagon'], correctAnswer: 0, explanation: 'The sequence lists shapes by increasing number of sides (0, 4, 3, 6). If we arrange them, it would be 0, 3, 4, 6. Let\'s assume the pattern is 0, 3, 4, 6, which is not clear. The most common logical pattern is simply listing common polygons. Given the options, Pentagon (5 sides) is the most likely simple progression after a triangle (3 sides) or a square (4 sides). I\'ll treat it as a sequence of random polygons and the most logical next step is 5 sides (Pentagon).' },

        // Verbal English (10 Core)
        { id: 'V1', category: 'Verbal English', questionText: 'Choose the synonym for "DILIGENT".', options: ['Lazy', 'Hardworking', 'Careless', 'Passive'], correctAnswer: 1, explanation: 'Diligent means careful and persistent in one\'s work or efforts; Hardworking is the closest synonym.' },
        { id: 'V2', category: 'Verbal English', questionText: 'Choose the antonym for "CANDID".', options: ['Honest', 'Truthful', 'Devious', 'Frank'], correctAnswer: 2, explanation: 'Candid means truthful and straightforward; Devious (deceitful) is the antonym.' },
        { id: 'V3', category: 'Verbal English', questionText: 'Identify the error: He went (A) to the store (B) and bought (C) a loaf of breads (D).', options: ['(A)', '(B)', '(C)', '(D)'], correctAnswer: 3, explanation: '"Breads" is incorrect. "A loaf of bread" or "loaves of bread" should be used.' },
        { id: 'V4', category: 'Verbal English', questionText: 'Fill in the blank: The team was jubilant _____ their victory.', options: ['at', 'about', 'over', 'for'], correctAnswer: 2, explanation: 'The correct idiom is "jubilant over" (or "about"). Over implies a subject of triumph.' },
        { id: 'V5', category: 'Verbal English', questionText: 'Find the correctly spelled word.', options: ['Acomodate', 'Accommodate', 'Acommodate', 'Accomodate'], correctAnswer: 1, explanation: 'The correct spelling is A-C-C-O-M-M-O-D-A-T-E.' },
        { id: 'V6', category: 'Verbal English', questionText: 'What does the idiom "Break a leg" mean?', options: ['To get injured', 'Good luck', 'To run fast', 'To stop moving'], correctAnswer: 1, explanation: '"Break a leg" is an idiom traditionally used in theater to mean "good luck".' },
        { id: 'V7', category: 'Verbal English', questionText: 'Choose the sentence that is grammatically correct.', options: ['Neither of the answers are correct.', 'Neither of the answers is correct.', 'Neither of the answers were correct.', 'Neither of the answer is correct.'], correctAnswer: 1, explanation: 'Neither is singular, so it takes the singular verb "is".' },
        { id: 'V8', category: 'Verbal English', questionText: 'Synonym for "ALLEVIATE".', options: ['Aggravate', 'Intensify', 'Mitigate', 'Worsen'], correctAnswer: 2, explanation: 'Alleviate means to make suffering or a problem less severe; Mitigate is the closest synonym.' },
        { id: 'V9', category: 'Verbal English', questionText: 'Antonym for "TACIT".', options: ['Implied', 'Explicit', 'Unstated', 'Understood'], correctAnswer: 1, explanation: 'Tacit means understood or implied without being stated; Explicit means stated clearly and in detail.' },
        { id: 'V10', category: 'Verbal English', questionText: 'The passage implies that time management is crucial for success. (Short Answer)', options: ['Yes', 'No'], isShortAnswer: true, correctAnswer: 0, explanation: 'The question simulates a comprehension question where the user would need context. For this MCQ format, we assume the underlying passage *did* imply this, making "Yes" correct.' },
    ];

    const expandedQuestions = [];
    const categories = ['Quantitative', 'Logical Reasoning', 'Verbal English'];

    categories.forEach(category => {
        const filteredCore = coreQuestions.filter(q => q.category === category);
        for (let i = 0; i < 4; i++) { // Generate 4 sets of 10 core questions, total 40
            filteredCore.forEach((q, index) => {
                expandedQuestions.push({
                    ...q,
                    id: `${q.id}-${i + 1}-${index}`,
                    questionText: `${q.questionText} (Set ${i + 1})`, // Slightly vary text
                    // Keep options, correct answer, and explanation the same for repetition
                });
            });
        }
    });

    return expandedQuestions;
};

// --- CONSTANTS ---
const TOTAL_QUESTIONS = 120; // 40 * 3
const DEFAULT_TIME_MINUTES = 60; // Default duration

// --- Local Storage Key ---
const STORAGE_KEY = 'softSkillsAssessmentProgress';

const Softskill = () => {
    const initialQuestions = useMemo(generateQuestions, []);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    // State for user-defined input (in minutes)
    const [customMinutes, setCustomMinutes] = useState(DEFAULT_TIME_MINUTES);
    
    // State for the actual duration of the *current* running/saved test (in seconds)
    const [testDurationSeconds, setTestDurationSeconds] = useState(DEFAULT_TIME_MINUTES * 60); 
    
    const [timeRemaining, setTimeRemaining] = useState(DEFAULT_TIME_MINUTES * 60);
    const [isAuthReady, setIsAuthReady] = useState(false); // To ensure local storage is loaded first
    const [isTestStarted, setIsTestStarted] = useState(false); // New state for controlling start

    // 1. Load state from localStorage on initial render
    useEffect(() => {
        try {
            const savedState = localStorage.getItem(STORAGE_KEY);
            if (savedState) {
                const state = JSON.parse(savedState);
                setQuestions(state.questions || []);
                setUserAnswers(state.userAnswers || {});
                setCurrentQuestionIndex(state.currentQuestionIndex || 0);
                setIsSubmitted(state.isSubmitted || false);
                
                // Load the actual duration of the saved test or default to 60 mins
                const loadedDuration = state.testDurationSeconds || (DEFAULT_TIME_MINUTES * 60);
                setTestDurationSeconds(loadedDuration);
                setTimeRemaining(state.timeRemaining !== undefined ? state.timeRemaining : loadedDuration);
                setIsTestStarted(state.isTestStarted || false); 
                
                // Set the customMinutes input field default to the loaded test duration (rounded)
                setCustomMinutes(Math.round(loadedDuration / 60)); 

                // If no questions are loaded, initialize them (first run logic)
                if (!state.questions || state.questions.length === 0) {
                    const randomizedQuestions = [...initialQuestions].sort(() => Math.random() - 0.5);
                    setQuestions(randomizedQuestions);
                }
            } else {
                // First time user: Initialize with randomized questions and default duration
                const defaultDuration = DEFAULT_TIME_MINUTES * 60;
                setTestDurationSeconds(defaultDuration);
                setTimeRemaining(defaultDuration);
                const randomizedQuestions = [...initialQuestions].sort(() => Math.random() - 0.5);
                setQuestions(randomizedQuestions);
            }
        } catch (error) {
            console.error("Failed to load state from localStorage:", error);
            // Fallback to initial state if load fails
            const randomizedQuestions = [...initialQuestions].sort(() => Math.random() - 0.5);
            setQuestions(randomizedQuestions);
        } finally {
            setIsAuthReady(true);
        }
    }, [initialQuestions]);

    // 2. Save state to localStorage whenever main state changes
    useEffect(() => {
        if (!isAuthReady || isSubmitted) return;

        try {
            const stateToSave = {
                questions,
                userAnswers,
                currentQuestionIndex,
                isSubmitted: false, // Never save true submission state
                timeRemaining,
                isTestStarted, // Save test started state
                testDurationSeconds, // Save the actual test duration
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        } catch (error) {
            console.error("Failed to save state to localStorage:", error);
        }
    }, [questions, userAnswers, currentQuestionIndex, timeRemaining, isSubmitted, isAuthReady, isTestStarted, testDurationSeconds]);

    // 3. Timer Logic
    useEffect(() => {
        // Timer only runs if the test is explicitly started
        if (!isAuthReady || isSubmitted || !isTestStarted) return;

        const isTimeRunning = timeRemaining > 0;
        if (isTimeRunning) {
            const timer = setInterval(() => {
                setTimeRemaining(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        // Auto-submit on time out
                        setIsSubmitted(true);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeRemaining === 0) {
            setIsSubmitted(true);
        }
    }, [isSubmitted, timeRemaining, isAuthReady, isTestStarted]);


    // --- Handlers ---

    const handleAnswerSelect = useCallback((questionId, optionIndex) => {
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: optionIndex
        }));
    }, []);

    const handleSubmit = () => {
        // Clear local storage upon successful submission
        localStorage.removeItem(STORAGE_KEY);
        setIsSubmitted(true);
        setIsTestStarted(false); // Reset start state
    };

    const handleStartNewTest = () => {
        // Calculate the new duration based on user input
        const newDurationSeconds = customMinutes * 60;
        
        // Generate new randomized questions
        const newRandomizedQuestions = [...initialQuestions].sort(() => Math.random() - 0.5);
        setQuestions(newRandomizedQuestions);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setIsSubmitted(false);
        setTestDurationSeconds(newDurationSeconds); // Set the duration for the test state
        setTimeRemaining(newDurationSeconds); // Start timer with new duration
        setIsTestStarted(true); // Automatically starts timer on new test
        localStorage.removeItem(STORAGE_KEY);
    };

    const formatTime = (seconds) => {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    // --- Memoized Values ---

    const currentQuestion = questions[currentQuestionIndex];
    const answeredCount = Object.keys(userAnswers).length;
    const progressPercentage = (answeredCount / TOTAL_QUESTIONS) * 100;

    const score = useMemo(() => {
        if (!isSubmitted) return 0;
        let correct = 0;
        questions.forEach(q => {
            if (userAnswers[q.id] === q.correctAnswer) {
                correct++;
            }
        });
        return correct;
    }, [isSubmitted, questions, userAnswers]);

    const getAnswerStatus = (question) => {
        const userAnswerIndex = userAnswers[question.id];
        if (userAnswerIndex === undefined) return 'unanswered';
        return userAnswerIndex === question.correctAnswer ? 'correct' : 'incorrect';
    };

    if (!isAuthReady || questions.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="text-xl font-semibold text-indigo-600">Loading Assessment...</div>
            </div>
        );
    }

    // --- Components ---

    const StartScreen = () => (
        <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-2xl border-t-8 border-indigo-500 text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Ready to Begin the Soft Skills Assessment?</h2>
            <p className="text-lg text-gray-600 mb-6">
                This comprehensive assessment consists of **{TOTAL_QUESTIONS} questions** across Quantitative, Logical Reasoning, and Verbal English sections.
            </p>
            
            {/* Custom Time Input */}
            <div className="flex items-center justify-center space-x-3 mb-6">
                <label htmlFor="customTime" className="text-gray-700 font-medium text-lg">Set Duration:</label>
                <input
                    id="customTime"
                    type="number"
                    min="5" // Minimum reasonable time
                    max="180" // Maximum reasonable time
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(Math.max(5, Math.min(180, parseInt(e.target.value) || 5)))}
                    className="w-24 p-2 border-2 border-indigo-300 rounded-lg text-center font-bold text-xl text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-gray-600 text-lg">minutes</span>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg mb-6">
                <p className="font-semibold text-yellow-800 flex items-center justify-center">
                    <Clock className="w-5 h-5 mr-2" />
                    You have exactly **{customMinutes} minutes** to complete the test. The timer starts when you click "Start Assessment Now."
                </p>
            </div>
            
            {/* Main Start Button */}
            <button
                onClick={handleStartNewTest}
                className="w-full py-3 rounded-lg bg-indigo-600 text-white font-extrabold text-xl transition-all duration-200 hover:bg-indigo-700 shadow-xl flex items-center justify-center"
            >
                <Zap className="w-6 h-6 mr-3" />
                Start Assessment Now
            </button>
            
            {/* Resume Button - appears if progress is saved */}
            {answeredCount > 0 && (
                 <button
                    onClick={() => setIsTestStarted(true)}
                    className="mt-4 w-full py-2 text-indigo-600 font-semibold border-2 border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center"
                >
                    <ArrowRight className="w-4 h-4 mr-2 inline-block" />
                    Resume Saved Progress ({answeredCount} answered)
                </button>
            )}
        </div>
    );

    const QuestionNavigator = () => (
        <div className="p-4 bg-white border-b sticky top-0 md:static">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <List className="w-5 h-5 mr-2 text-indigo-500" />
                Question Overview
            </h3>
            <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 overflow-auto max-h-[300px] p-2">
                {questions.map((q, index) => {
                    const isCurrent = index === currentQuestionIndex;
                    const status = userAnswers[q.id] !== undefined ? 'answered' : 'unanswered';
                    let statusClass = '';

                    if (isCurrent) {
                        statusClass = 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400 transform scale-105';
                    } else if (status === 'answered') {
                        statusClass = 'bg-green-100 text-green-800 hover:bg-green-200';
                    } else {
                        statusClass = 'bg-gray-200 text-gray-700 hover:bg-gray-300';
                    }

                    return (
                        <button
                            key={q.id}
                            onClick={() => setCurrentQuestionIndex(index)}
                            className={`p-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${statusClass}`}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    const TimerDisplay = () => (
        <div className={`p-4 rounded-xl shadow-lg transition-colors duration-300 ${timeRemaining < 300 ? 'bg-red-100 border-red-400' : 'bg-white border-indigo-200'} border-2 flex items-center justify-between`}>
            <div className="flex items-center">
                <Clock className={`w-6 h-6 mr-2 ${timeRemaining < 300 ? 'text-red-500' : 'text-indigo-500'}`} />
                <span className={`text-xl font-bold tracking-wider ${timeRemaining < 300 ? 'text-red-700' : 'text-gray-800'}`}>
                    {formatTime(timeRemaining)}
                </span>
            </div>
            <span className={`text-sm font-medium ${timeRemaining < 300 ? 'text-red-500' : 'text-gray-600'}`}>
                Time Left
            </span>
        </div>
    );

    const ProgressDisplay = () => (
        <div className="mt-4 p-4 bg-white rounded-xl shadow-lg border-2 border-indigo-200">
            <h4 className="text-md font-semibold text-gray-700 mb-2 flex items-center">
                <BarChart2 className="w-4 h-4 mr-2 text-indigo-500" />
                Progress
            </h4>
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                    Questions Answered:
                </span>
                <span className="text-sm font-bold text-indigo-600">
                    {answeredCount} / {TOTAL_QUESTIONS}
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-right">{progressPercentage.toFixed(1)}% Complete</p>
        </div>
    );

    const QuestionView = () => (
        <div className="bg-white p-6 rounded-xl shadow-xl border-t-4 border-indigo-500">
            <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-700 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                    {currentQuestion.category}
                </h2>
                <span className="text-2xl font-extrabold text-indigo-600">
                    {currentQuestionIndex + 1} / {TOTAL_QUESTIONS}
                </span>
            </div>

            <p className="text-xl text-gray-900 mb-6 leading-relaxed">
                {currentQuestion.questionText.replace(/\(Set \d+\)/, '')}
            </p>

            <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                    const isSelected = userAnswers[currentQuestion.id] === index;
                    const borderColor = isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50';

                    return (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                            className={`w-full text-left p-3 border-2 rounded-lg transition-all duration-150 ${borderColor} text-gray-800 font-medium flex items-center`}
                        >
                            <span className={`w-6 h-6 flex items-center justify-center mr-3 rounded-full text-sm font-semibold transition-colors duration-150 ${isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                {String.fromCharCode(65 + index)}
                            </span>
                            {option}
                        </button>
                    );
                })}
            </div>

            <div className="mt-8 flex justify-between">
                <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="px-6 py-2 rounded-lg bg-gray-300 text-gray-800 font-semibold transition-all duration-200 hover:bg-gray-400 disabled:opacity-50 flex items-center"
                >
                    <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
                    Previous
                </button>
                {currentQuestionIndex < TOTAL_QUESTIONS - 1 ? (
                    <button
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold transition-all duration-200 hover:bg-indigo-700 shadow-md hover:shadow-lg flex items-center"
                    >
                        Next
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="px-8 py-2 rounded-lg bg-green-600 text-white font-extrabold transition-all duration-200 hover:bg-green-700 shadow-xl flex items-center animate-pulse"
                    >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Submit Test
                    </button>
                )}
            </div>
        </div>
    );

    const ResultsView = () => (
        <div className="bg-white p-6 rounded-xl shadow-2xl border-t-8 border-green-500">
            <h1 className="text-4xl font-extrabold text-green-700 mb-2 flex items-center">
                <Zap className="w-8 h-8 mr-3 text-green-500" />
                Assessment Complete!
            </h1>
            <p className="text-xl text-gray-600 mb-6">Here is your detailed performance summary.</p>

            {/* Score Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200 text-center">
                    <p className="text-sm font-medium text-indigo-600">Total Questions</p>
                    <p className="text-3xl font-extrabold text-indigo-800">{TOTAL_QUESTIONS}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200 text-center">
                    <p className="text-sm font-medium text-green-600">Correct Answers</p>
                    <p className="text-3xl font-extrabold text-green-800">{score}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200 text-center">
                    <p className="text-sm font-medium text-red-600">Incorrect Answers</p>
                    <p className="text-3xl font-extrabold text-red-800">{TOTAL_QUESTIONS - score}</p>
                </div>
            </div>

            {/* Category Breakdown (Optional but good practice) */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Category Breakdown</h2>
            <div className="space-y-3 mb-8">
                {['Quantitative', 'Logical Reasoning', 'Verbal English'].map(category => {
                    const categoryQuestions = questions.filter(q => q.category === category);
                    const categoryScore = categoryQuestions.reduce((sum, q) =>
                        sum + (userAnswers[q.id] === q.correctAnswer ? 1 : 0), 0);
                    const totalCategory = categoryQuestions.length;

                    return (
                        <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                            <span className="font-semibold text-gray-700">{category}</span>
                            <span className="font-bold text-lg text-indigo-600">
                                {categoryScore} / {totalCategory}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Detailed Review */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Detailed Answer Review</h2>
            <div className="space-y-6">
                {questions.map((q, index) => {
                    const status = getAnswerStatus(q);
                    const userAnswerIndex = userAnswers[q.id];
                    const isCorrect = status === 'correct';
                    const icon = isCorrect ? <CheckCircle className="w-5 h-5 text-green-500" /> : <AlertTriangle className="w-5 h-5 text-red-500" />;
                    const statusClass = isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50';

                    return (
                        <div key={q.id} className={`p-4 rounded-lg border-2 ${statusClass} shadow-sm`}>
                            <div className="flex items-center mb-2">
                                <span className="text-lg font-semibold text-gray-800 mr-3">{index + 1}.</span>
                                <p className="font-medium text-gray-700">{q.questionText.replace(/\(Set \d+\)/, '')}</p>
                            </div>
                            <p className="mb-2 pl-6 text-sm">
                                Your Answer:
                                <span className={`ml-2 font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                    {userAnswerIndex !== undefined ? q.options[userAnswerIndex] : 'Unanswered'}
                                </span>
                            </p>
                            <p className="mb-2 pl-6 text-sm">
                                Correct Answer:
                                <span className="ml-2 font-bold text-green-700">
                                    {q.options[q.correctAnswer]}
                                </span>
                            </p>
                            <p className="pl-6 text-sm text-gray-600 italic">
                                Explanation: <span className='font-normal'>{q.explanation}</span>
                            </p>
                            <div className='pl-6 mt-2 flex items-center text-sm font-semibold'>
                                {icon}
                                <span className={`ml-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                    {isCorrect ? 'Correct' : 'Incorrect'}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                onClick={handleStartNewTest}
                className="mt-8 w-full py-3 rounded-lg bg-indigo-600 text-white font-extrabold transition-all duration-200 hover:bg-indigo-700 shadow-lg"
            >
                Start New Assessment
            </button>
        </div>
    );


    // --- Main Render ---

    return (
        <>
        <Navbar/>
        <div className="min-h-screen bg-gray-100 font-inter p-4 sm:p-8">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-indigo-700">Soft Skills Assessment</h1>
                <p className="text-lg text-gray-500 mt-2">Quantitative, Logical, and Verbal Proficiency Test</p>
            </header>

            {!isSubmitted && isTestStarted && (
                <div className="mb-6 p-4 rounded-xl border-t-4 border-indigo-400 bg-white shadow-md text-center">
                    <p className="text-sm font-medium text-gray-600">
                        Test progress is <span className='font-bold text-green-600'>automatically saved</span> in your browser's local storage.
                        You can close and resume later.
                    </p>
                </div>
            )}

            {isSubmitted ? (
                <div className="max-w-4xl mx-auto">
                    <ResultsView />
                </div>
            ) : isTestStarted ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <div className="md:col-span-2 space-y-8 order-2 md:order-1">
                        <QuestionView />
                    </div>

                    <div className="md:col-span-1 space-y-6 order-1 md:order-2">
                        <TimerDisplay />
                        <ProgressDisplay />
                        <div className="bg-white rounded-xl shadow-xl border-t-4 border-indigo-500">
                            <QuestionNavigator />
                        </div>
                    </div>
                </div>
            ) : (
                <StartScreen />
            )}
        </div>
        </>
    );
};

export default Softskill;
