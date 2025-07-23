import { useState, useEffect } from 'react';
import logo from './assets/quirkailogo.png';

const stores = [
  'Chevy NH',
  'Kia NH',
  'VW NH',
  'GMC NH',
  'GMC MA',
  'CDJR Dorchester',
  'Chevy MA',
  'Chrysler Jeep',
  'Ford',
  'Genesis',
  'Hyundai',
  'Kia MA',
  'Kia Marshfield',
  'Marshfield Dodge',
  'Mazda',
  'Nissan',
  'Subaru',
  'VW MA',
];

const steps = [
  {
    title: 'Step 1: Meet & Greet',
    content: [
      'Greet customers within 15 feet of the entrance',
      'Make strong eye contact and offer a firm handshake',
      'Smile and say: “Welcome to {store}, I’m {name}. How can I help you today?”',
    ],
    quiz: {
      question: 'Which combination of actions is essential for a proper meet and greet to build immediate rapport?',
      options: [
        { text: 'Greet with a smile, make strong eye contact, offer a firm handshake, and introduce yourself with the store name', correct: true },
        { text: 'Smile and introduce yourself, but wait for the customer to initiate eye contact and handshake to respect boundaries', correct: false },
        { text: 'Make eye contact and offer a handshake, but delay the greeting until after asking about their vehicle needs', correct: false },
      ],
    },
  },
  {
    title: 'Step 2: Fact-Finding',
    content: [
      'Ask about current vehicle, use case, family situation, etc.',
      'Ask if they have a trade-in',
      'Ask: “Where is your title — with a bank or at home?”',
    ],
    quiz: {
      question: 'Which question is critical to ask about a potential trade-in to avoid delays later in the process?',
      options: [
        { text: 'Where is your title — with a bank or at home?', correct: true },
        { text: 'What is the mileage on your current vehicle, and have you had any recent repairs?', correct: false },
        { text: 'Do you prefer a similar model for your trade-in, or are you open to different options?', correct: false },
      ],
    },
  },
  {
    title: 'Step 3: Vehicle Presentation',
    content: [
      'Walk around the vehicle together',
      'Showcase features that match their needs',
      'Personalize the presentation based on fact-finding',
    ],
    quiz: {
      question: 'What makes a vehicle walkaround most effective in aligning with customer expectations?',
      options: [
        { text: 'Personalizing the presentation based on fact-finding to highlight relevant features', correct: true },
        { text: 'Focusing on all available features to demonstrate the vehicle\'s full capabilities', correct: false },
        { text: 'Starting with exterior details before moving to interior to build excitement gradually', correct: false },
      ],
    },
  },
  {
    title: 'Step 4: Demonstration Drive',
    content: [
      'Set clear expectations before the drive',
      'Explain key features during the drive',
      'Use the drive to reinforce benefits',
    ],
    quiz: {
      question: 'Why is setting expectations and reinforcing benefits during the demo drive key to increasing closing chances?',
      options: [
        { text: 'It helps the customer experience tailored benefits, building emotional connection and addressing needs', correct: true },
        { text: 'It provides time to discuss pricing options while the customer is focused on driving', correct: false },
        { text: 'It allows for a relaxed conversation about unrelated topics to build personal rapport', correct: false },
      ],
    },
  },
  {
    title: 'Step 5: Trade Evaluation',
    content: [
      'Ask for keys and registration',
      'Get title status confirmed',
      'Start trade walkaround while they drive your car',
    ],
    quiz: {
      question: 'What is the optimal action to take during the customer\'s demo drive to streamline the trade process?',
      options: [
        { text: 'Begin the trade walkaround after confirming title status and obtaining keys/registration', correct: true },
        { text: 'Wait for the demo drive to end before asking for keys to avoid interrupting their experience', correct: false },
        { text: 'Discuss potential trade value estimates verbally while they drive to set expectations early', correct: false },
      ],
    },
  },
  {
    title: 'Step 6: Write-Up',
    content: [
      'Present numbers confidently',
      'Review vehicle price, trade value, payments',
      'Don’t oversell or overexplain',
    ],
    quiz: {
      question: 'What is the primary objective of the write-up phase to move the deal forward smoothly?',
      options: [
        { text: 'Present numbers confidently while reviewing key details without overselling to gain agreement', correct: true },
        { text: 'Explain all financial options in detail to ensure the customer understands every aspect', correct: false },
        { text: 'Focus on highlighting potential savings and incentives to create urgency in decision-making', correct: false },
      ],
    },
  },
  {
    title: 'Step 7: Negotiation',
    content: [
      'Be positive and calm',
      'Involve manager as needed',
      'Keep customer informed and respected',
    ],
    quiz: {
      question: 'Which approach is most effective in negotiation to maintain trust and reach a mutually beneficial agreement?',
      options: [
        { text: 'Stay positive and calm, involve the manager when necessary, and keep the customer informed and respected', correct: true },
        { text: 'Emphasize the dealership\'s bottom line early to set realistic expectations for concessions', correct: false },
        { text: 'Use time pressure tactics while remaining calm to encourage quicker decisions', correct: false },
      ],
    },
  },
  {
    title: 'Step 8: Credit Application',
    content: [
      'Gather info early when possible',
      'Build comfort around credit process',
      'Explain what happens next',
    ],
    quiz: {
      question: 'When is the best time to initiate the credit application discussion to minimize surprises and build trust?',
      options: [
        { text: 'Gather information early when possible, while explaining the process to build comfort', correct: true },
        { text: 'After finalizing numbers in negotiation, to focus on one step at a time', correct: false },
        { text: 'During the demo drive, when the customer is relaxed and engaged', correct: false },
      ],
    },
  },
  {
    title: 'Step 9: F&I Introduction',
    content: [
      'Transition smoothly from sales to finance',
      'Set clear expectations for the final steps',
      'Keep rapport intact',
    ],
    quiz: {
      question: 'Why is a smooth handoff to F&I crucial, and how should it be handled to preserve the sales momentum?',
      options: [
        { text: 'It maintains rapport by transitioning smoothly, setting clear expectations, and keeping the customer comfortable', correct: true },
        { text: 'It allows the finance team to introduce new products immediately to maximize upsell opportunities', correct: false },
        { text: 'It provides a break in the process to let the customer reflect before final commitments', correct: false },
      ],
    },
  },
  {
    title: 'Step 10: Delivery',
    content: [
      'Walk through features one last time',
      'Set up Bluetooth, walk through warranty',
      'Thank them and invite them to return',
    ],
    quiz: {
      question: 'Which elements are vital in the delivery process to ensure customer satisfaction and encourage future loyalty?',
      options: [
        { text: 'Final feature walk-through, Bluetooth setup, warranty explanation, thanks, and invitation to return', correct: true },
        { text: 'Quick review of paperwork and features, focusing on warranty to address potential concerns', correct: false },
        { text: 'Emphasize post-sale services and invite for immediate feedback to close the experience', correct: false },
      ],
    },
  },
];

const ProgressBar = ({ progress }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
    <div
      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

const StepContent = ({ title, content, store, name }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <ul className="list-disc pl-5 space-y-2">
      {content.map((item, index) => (
        <li key={index} className="text-gray-700">
          {item.replace('{store}', store).replace('{name}', name)}
        </li>
      ))}
    </ul>
  </div>
);

const QuizCard = ({ quiz, selectedAnswer, setSelectedAnswer, showResult, setShowResult, onAnswer }) => {
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    const opts = [...quiz.options];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    setShuffledOptions(opts);
  }, [quiz]);

  const handleSelect = (index) => {
    if (!showResult) {
      setSelectedAnswer(index);
      setShowResult(true);
      if (onAnswer) {
        onAnswer(shuffledOptions[index].correct);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">{quiz.question}</h3>
      <div className="flex flex-col space-y-3">
        {shuffledOptions.map((option, index) => {
          let bgColor = 'bg-gray-100 hover:bg-gray-200';
          if (showResult) {
            if (option.correct) {
              bgColor = 'bg-green-200';
            } else if (index === selectedAnswer) {
              bgColor = 'bg-red-200';
            } else {
              bgColor = 'bg-gray-100';
            }
          }
          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={showResult}
              className={`${bgColor} text-left p-4 rounded-md w-full transition-colors duration-200 ${
                showResult ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              {option.text}
            </button>
          );
        })}
      </div>
      {showResult && (
        <p className="mt-4 text-center font-medium">
          {shuffledOptions[selectedAnswer].correct ? (
            <span className="text-green-600">Correct!</span>
          ) : (
            <span className="text-red-600">Incorrect. The correct answer is highlighted.</span>
          )}
        </p>
      )}
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [store, setStore] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [stepPhase, setStepPhase] = useState('content');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [currentCorrect, setCurrentCorrect] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (name && store) {
      setIsLoggedIn(true);
    }
  };

  const handleNext = () => {
    if (stepPhase === 'content') {
      setStepPhase('quiz');
      setSelectedAnswer(null);
      setShowResult(false);
      setCurrentCorrect(null);
    } else { // quiz
      if (!showResult) return; // must answer
      const newAnswers = [...answers];
      newAnswers[currentStep] = { correct: currentCorrect };
      setAnswers(newAnswers);

      if (currentStep < 9) {
        setCurrentStep(currentStep + 1);
        setStepPhase('content');
      } else {
        setCurrentStep(10);
      }
      setSelectedAnswer(null);
      setShowResult(false);
      setCurrentCorrect(null);
    }
  };

  const handleRestart = () => {
    setIsLoggedIn(false);
    setName('');
    setStore('');
    setCurrentStep(0);
    setStepPhase('content');
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers(Array(10).fill(null));
    setCurrentCorrect(null);
  };

  const phaseIndex = stepPhase === 'content' ? 0 : 1;
  const progress = ((currentStep * 2 + phaseIndex + 1) / 20) * 100;

  const correctCount = answers.filter(a => a && a.correct).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl w-full mx-auto">
        {!isLoggedIn ? (
          <div className="py-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <img src={logo} alt="Quirk AI Logo" className="mx-auto mb-8" style={{ width: '144px' }} />
              <h1 className="text-3xl font-bold text-center mb-8">Sales Training</h1>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="store" className="block text-sm font-medium text-gray-700 mb-2">
                    Store
                  </label>
                  <select
                    id="store"
                    value={store}
                    onChange={(e) => setStore(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select a store</option>
                    {stores.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Start Training
                </button>
              </form>
            </div>
          </div>
        ) : currentStep === 10 ? (
          <div className="py-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <img src={logo} alt="Quirk AI Logo" className="mx-auto mb-8" style={{ width: '144px' }} />
              <h1 className="text-3xl font-bold mb-6">Training Complete!</h1>
              <p className="text-xl text-gray-700 mb-6">
                Congratulations, {name}! You have completed the Sales Training for {store}.
              </p>
              <p className="text-lg font-semibold mb-6">You got {correctCount} out of 10 questions correct.</p>
              <ul className="list-disc pl-5 mx-auto max-w-md mb-8 text-left">
                {answers.map((ans, idx) => (
                  <li key={idx} className={`text-gray-700 ${ans?.correct ? 'text-green-600' : 'text-red-600'}`}>
                    {steps[idx].title}: {ans?.correct ? 'Correct' : 'Incorrect'}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleRestart}
                className="bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Restart Training
              </button>
            </div>
          </div>
        ) : (
          <div className="py-8">
            <img src={logo} alt="Quirk AI Logo" className="mx-auto mb-6" style={{ width: '112px' }} />
            <h1 className="text-2xl font-bold text-center mb-4">Welcome, {name}!</h1>
            <p className="text-center text-gray-600 mb-6">Training for {store}</p>
            <ProgressBar progress={progress} />
            {stepPhase === 'content' ? (
              <StepContent title={steps[currentStep].title} content={steps[currentStep].content} store={store} name={name} />
            ) : (
              <QuizCard
                quiz={steps[currentStep].quiz}
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
                showResult={showResult}
                setShowResult={setShowResult}
                onAnswer={setCurrentCorrect}
              />
            )}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleNext}
                disabled={stepPhase === 'quiz' && !showResult}
                className="bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {currentStep === 9 && stepPhase === 'quiz' ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;