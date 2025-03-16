import React, { useState } from 'react';

const LoveQuiz = () => {
  const [currentStep, setCurrentStep] = useState('intro');
  const [answers, setAnswers] = useState({});
  const [names, setNames] = useState({ person1: '', person2: '' });

  const questions = [
    {
      id: 1,
      question: "How do you prefer to spend quality time together?",
      options: [
        { text: "Quiet activities at home", score: 5 },
        { text: "Going out on adventures", score: 4 },
        { text: "Mix of both", score: 3 },
        { text: "Separate activities", score: 1 }
      ]
    },
    {
      id: 2,
      question: "How do you handle disagreements?",
      options: [
        { text: "Talk it out immediately", score: 5 },
        { text: "Take time to cool off first", score: 4 },
        { text: "Seek compromise", score: 3 },
        { text: "Avoid confrontation", score: 1 }
      ]
    },
    {
      id: 3,
      question: "What's your love language?",
      options: [
        { text: "Physical touch", score: 5 },
        { text: "Words of affirmation", score: 4 },
        { text: "Acts of service", score: 3 },
        { text: "Gift giving", score: 2 }
      ]
    },
    {
      id: 4,
      question: "How do you view the future together?",
      options: [
        { text: "Clear shared goals", score: 5 },
        { text: "Taking it day by day", score: 3 },
        { text: "Independent paths", score: 2 },
        { text: "Uncertain", score: 1 }
      ]
    },
    {
      id: 5,
      question: "How do you show affection?",
      options: [
        { text: "Openly and often", score: 5 },
        { text: "In private moments", score: 4 },
        { text: "Through actions", score: 3 },
        { text: "Reserved", score: 2 }
      ]
    }
  ];

  const calculateCompatibility = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 5;
    const percentage = (totalScore / maxScore) * 100;
    
    if (percentage >= 80) {
      return {
        result: "Perfect Match! 💑",
        description: "You have an exceptional connection! Your compatibility suggests a deep understanding and shared values.",
        color: "text-rose-600"
      };
    } else if (percentage >= 60) {
      return {
        result: "Great Potential! 💕",
        description: "You have strong compatibility with room to grow together.",
        color: "text-pink-600"
      };
    } else if (percentage >= 40) {
      return {
        result: "Growing Connection 🌱",
        description: "There's potential here, but it might take work to strengthen your bond.",
        color: "text-purple-600"
      };
    } else {
      return {
        result: "Room to Grow 🤔",
        description: "You might need to work on understanding each other better.",
        color: "text-blue-600"
      };
    }
  };

  const handleAnswer = (questionId, score) => {
    setAnswers({ ...answers, [questionId]: score });
  };

  const renderIntro = () => (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold text-rose-600">Ready to Test Your Compatibility?</h2>
      <p className="text-gray-600">Enter your names to begin the journey!</p>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Person 1's Name"
          value={names.person1}
          onChange={(e) => setNames({ ...names, person1: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Person 2's Name"
          value={names.person2}
          onChange={(e) => setNames({ ...names, person2: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={() => setCurrentStep(1)}
        disabled={!names.person1 || !names.person2}
        className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 disabled:bg-gray-300"
      >
        Start Quiz
      </button>
    </div>
  );

  const renderQuestion = (questionId) => {
    const question = questions[questionId - 1];
    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-gray-500 mb-2">Question {questionId} of {questions.length}</div>
          <h2 className="text-xl font-bold text-gray-800">{question.question}</h2>
        </div>
        
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                handleAnswer(questionId, option.score);
                if (questionId < questions.length) {
                  setCurrentStep(questionId + 1);
                } else {
                  setCurrentStep('results');
                }
              }}
              className={`w-full p-3 text-left rounded border transition-colors
                ${answers[questionId] === option.score 
                  ? 'bg-rose-100 border-rose-500' 
                  : 'hover:bg-pink-50 border-gray-200'}`}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const result = calculateCompatibility();
    return (
      <div className="text-center space-y-6">
        <h2 className={`text-3xl font-bold ${result.color}`}>
          {result.result}
        </h2>
        <div className="text-xl">
          {names.person1} & {names.person2}
        </div>
        <p className="text-gray-600">
          {result.description}
        </p>
        <button
          onClick={() => {
            setCurrentStep('intro');
            setAnswers({});
            setNames({ person1: '', person2: '' });
          }}
          className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600"
        >
          Take Quiz Again
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-rose-600">
        ❤️ Love Compatibility Quiz ❤️
      </h1>
      
      <div className="min-h-96 flex items-center justify-center">
        {currentStep === 'intro' && renderIntro()}
        {typeof currentStep === 'number' && renderQuestion(currentStep)}
        {currentStep === 'results' && renderResults()}
      </div>
    </div>
  );
};

export default LoveQuiz;