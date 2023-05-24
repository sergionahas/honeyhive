import React, { useState, useEffect } from 'react';

function ModelSelection({ onModelChange}) {
  const [selectedModel, setSelectedModel] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleModelChange = (model) => {
    setSelectedModel(model);
    setIsOpen(false);
    console.log(model)
    onModelChange(model);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleScreenSizeChange = () => {
    const isSmall = window.innerWidth < 768; // Adjust the breakpoint as needed
    setIsSmallScreen(isSmall);
  };

  React.useEffect(() => {
    handleScreenSizeChange();
    window.addEventListener('resize', handleScreenSizeChange);
    return () => {
      window.removeEventListener('resize', handleScreenSizeChange);
    };
  }, []);


  return (
    <div className="relative">
      <button 
        className="flex items-center whitespace-nowrap rounded bg-neutral-50 px-6 py-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#fbfbfb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] motion-reduce:transition-none relative"
        type="button"
        id="dropdownMenuButton9"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        value={selectedModel}
      >
        {!isSmallScreen && (
          <span className="ml-2">
            {selectedModel || 'Select Model'}
          </span>
        )}

        <span className="w-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <ul className="absolute z-[1000] float-left m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700">
          <li>
            <a
              className={`block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal ${
                selectedModel === 'gpt-4' ? 'text-primary-500' : 'text-neutral-700'
              } hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600`}
              href="#"
              onClick={() => handleModelChange('gpt-4')}>
              gpt-4
            </a>
          </li>
          <li>
            <a
              className={`block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal ${
                selectedModel === 'gpt-3.5-turbo' ? 'text-primary-500' : 'text-neutral-700'
              } hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600`}
              href="#"
              onClick={() => handleModelChange('gpt-3.5-turbo')}>
              gpt-3.5-turbo
            </a>
          </li>
          <li>
            <a
              className={`block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal ${
                selectedModel === 'gpt-3.5-turbo-0301' ? 'text-primary-500' : 'text-neutral-700'
              } hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600`}
              href="#"
              onClick={() => handleModelChange('gpt-3.5-turbo-0301')}>
            gpt-3.5-turbo-0301
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ModelSelection;
