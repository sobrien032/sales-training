import { useState } from 'react';
import logo from './assets/quirkailogo.png';

// Array of store locations for the dropdown
const storeLocations = [
  "Quirk Chevrolet of Manchester",
  "Quirk Chrysler Dodge Jeep RAM",
  "Quirk Volkswagen of Manchester",
  "Quirk Nissan of Manchester"
];

export default function QuirkTrainingLogin() {
  const [name, setName] = useState('');
  const [store, setStore] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const trainingSteps = [
    {
      title: 'Step 1: Meet & Greet',
      content: (
        <>
          <p className="mb-2">Your first impression sets the tone. At Quirk, we always:</p>
          <ul className="list-disc pl-5 mb-4">
            <li>Greet customers within 15 feet of the entrance</li>
            <li>Make strong eye contact and offer a firm handshake</li>
            <li>Smile and speak clearly: “Welcome to Quirk GMC, I’m Steve. How can I help you today?”</li>
          </ul>
        </>
      ),
    },
    {
      title: 'Step 2: Fact-Finding',
      content: (
        <ul className="list-disc pl-5 mb-4">
          <li>Ask open-ended questions about what they drive, how they use it, and who will drive it</li>
          <li>Ask if they have a trade-in and where their title is: “With a bank or at home?”</li>
        </ul>
      ),
    },
    {
      title: 'Step 3: Vehicle Presentation',
      content: <p>Coming soon...</p>,
    },
  ];

  const currentStep = trainingSteps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === trainingSteps.length - 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && store) {
      setSubmitted(true);
    }
  };

  const ProgressBar = ({ current, total }) => {
    const percentage = total > 1 ? (current / (total - 1)) * 100 : 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg mt-10">
      <img
        src={logo}
        alt="Quirk AI Logo"
        className="mx-auto mb-4"
        style={{ width: '60px' }}
      />
      <h1 className="text-2xl font-bold mb-6 text-center">Basic Sales Training</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6">
            <div className="flex-1 mb-4 sm:mb-0">
              <label htmlFor="name-input" className="block font-semibold mb-1">Your Name:</label>
              <input
                id="name-input"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="store-input" className="block font-semibold mb-1">Store:</label>
              <select
                id="store-input"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={store}
                onChange={(e) => setStore(e.target.value)}
                required
              >
                <option value="" disabled>Select a store</option>
                {storeLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Start Training
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Welcome, {name}!</h1>
            <p className="text-md text-gray-600">Training for {store}</p>
          </div>
          <ProgressBar current={stepIndex} total={trainingSteps.length} />
          <h2 className="text-lg font-bold">{currentStep.title}</h2>
          <div>{currentStep.content}</div>
          <div className="flex justify-between pt-4">
            <button
              disabled={isFirstStep}
              onClick={() => setStepIndex((i) => i - 1)}
              className={`px-4 py-2 rounded ${isFirstStep ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              Back
            </button>
            <button
              disabled={isLastStep}
              onClick={() => setStepIndex((i) => i + 1)}
              className={`px-4 py-2 rounded ${isLastStep ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}