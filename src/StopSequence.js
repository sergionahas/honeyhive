import { useState, useEffect } from 'react';
import './StopSequence.css';

export default function StopSequence({onStopSequenceChange, compare}) {
  const [stopsequence, setStopSequence] = useState(null); // Initial temperature value

  const handleStopSequenceChange = (event) => {
    setStopSequence(event.target.value);
    var stopsequence = document.getElementById(`stopsequence-${compare}`).value
    onStopSequenceChange(stopsequence);
  };

  useEffect(() => {
    const textarea = document.getElementById(`stopsequence-${compare}`);

    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  }, []);

  const stopsequenceId = `stopsequence-${compare}`;

  return (
    <div class="text-center">
        <div class="relative pr-2 pl-2">
        <textarea class=" w-full px-4 py-2 pr-10 leading-tight bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:shadow-outline h-auto resize-none overflow-hidden text-sm" placeholder="Stop Sequence" id={stopsequenceId}></textarea>
        <button class="absolute inset-y-0 right-0 px-1 text-yellow-500" onClick={handleStopSequenceChange}>
          <p className="text-sm font-bold text-yellow pb-2 pr-2">Save</p>
        </button>
        </div>
        <p class="text-sm">Stop Sequence</p>
    </div>
  );
}
