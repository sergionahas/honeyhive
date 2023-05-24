import { useState } from 'react';
import './TemperatureControl.css';

export default function TemperatureSlider({ onTemperatureChange, compare }) {
  const [temperature, setTemperature] = useState(1); // Initial temperature value

  const handleSliderChange = (event) => {
    setTemperature(event.target.value);
    const temperature = document.getElementById(`range-${compare}`).value;
    onTemperatureChange(temperature);
  };

  const handleInputChange = (event) => {
    setTemperature(event.target.value);
    const temperature = document.getElementById(`number-${compare}`).value;
    onTemperatureChange(temperature);
  };

  const numberId = `number-${compare}`;
  const rangeId = `range-${compare}`;

  return (
    <div className="flex items-center">
      <div class="w-50 text-center">
        <input
          type="number"
          min="0"
          max="2"
          step="0.01"
          value={temperature}
          onChange={handleInputChange}
          id={numberId}
          className="w-10 h-5 rounded-sm text-center appearance-none cursor-pointer focus:outline-none no-arrows"
          style={{ textAlign: 'center' }}
        />

        <input
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={temperature}
          onChange={handleSliderChange}
          id={rangeId}
          class="block mb-2 text-sm font-medium text-gray-800 dark:text-white appearance-none bg-gray-200 dark:bg-gray-800 h-2 rounded-lg w-full"
        />
        <p class="text-sm">Temperature</p>
      </div>
    </div>
  );
}
