import React, { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import Playground from './Playground'
import PlaygroundCompare from './PlaygroundCompare'

function App() {
  const [showCompare, setShowCompare] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleButtonClick = () => {
    setShowCompare((prevValue) => !prevValue);
  };

  const handleKeyChange = (apiKey) => {
    setApiKey(apiKey)
    console.log(apiKey)
  }

  return (
    <div>
      <Navbar onKeyChange={handleKeyChange}/>
      <Playground apiKey={apiKey}/>
      <div class="flex justify-center items-center">
      <button onClick={handleButtonClick} class="py-2 px-5 mr-2 text-sm font-small text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-yellow-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        {showCompare ? 'Compare Models' : 'Compare Models'}
      </button>
      </div>
      {showCompare && <PlaygroundCompare apiKey={apiKey}/>}
    </div>
  );
}

export default App;
