import { useState } from 'react';
import './MaxToken.css';

export default function MaxTokenSlider({onMaxTokenChange, compare}) {
  const [max_tokens, setMaxTokens] = useState(200); // Initial temperature value

  const handleSliderChange = (event) => {
    setMaxTokens(event.target.value);
    var maxToken = document.getElementById(`token-range-${compare}`).value
    onMaxTokenChange(maxToken);
  };

  const handleInputChange = (event) => {
    setMaxTokens(event.target.value);
    var maxToken = document.getElementById(`token-number-${compare}`).value
    onMaxTokenChange(maxToken);
  };

  const numberId = `token-number-${compare}`;
  const rangeId = `token-range-${compare}`;

  return (
    <div className="flex items-center">
        <div class="w-50 text-center">
        <input
            type="number"
            min="1"
            max="1000"
            step="1"
            value={max_tokens}
            onChange={handleInputChange}
            id={numberId}
            className="w-10 h-5 rounded-sm text-center appearance-none cursor-pointer focus:outline-none no-arrows"
            style={{ textAlign: 'center' }}
            />

            <input type="range"
                min="1"
                max="1000"
                step="1"
                value={max_tokens}
                onChange={handleSliderChange}
                id={rangeId}
                class="block mb-2 text-sm font-medium text-gray-800 dark:text-white appearance-none bg-gray-200 dark:bg-gray-800 h-2 rounded-lg w-full" />
            <p class="text-sm">Max Tokens</p>
        </div>
    </div>
  );
}
