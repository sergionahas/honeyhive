import React, { useEffect, useState } from 'react';

const Navbar = ({onKeyChange, onHomeChange}) => {
    const [showInput, setShowInput] = useState(true);
    const [apiKey, setApiKey] = useState('');

    const handleClick = () => {
      setShowInput((prevShowInput) => !prevShowInput);
      if (document.getElementById("openai_key")) {
        setApiKey(document.getElementById("openai_key").value)
      }
      onKeyChange(apiKey)
    };

    const handleInputChange = (event) => {
      setApiKey(event.target.value);
    };

    const [home, setHome] = useState(true);

    const handleHome = () => {
      if (document.getElementById("home").value == "home") {
        setHome(true)
      } else {
        setHome(false)
      }
      onHomeChange(home)
    };


    return (
      <nav class="bg-white border-b border-gray-100">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex flex-shrink-0 items-center">
              </div>
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">
                  <button
                  id="home"
                  value="home"
                  onClick={handleHome}>
                  <a href="/honeyhive" class="text-black hover:bg-gray-100 hover:text-black rounded-lg px-3 py-2 text-sm font-medium" aria-current="page">Playground</a>
                  </button>
                  <button
                  id="history"
                  value="history"
                  onClick={handleHome}>
                  <a href="/history"></a>
                  </button>
                </div>
              </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {showInput && (
              <div>
                <input
                  type="text"
                  value={apiKey}
                  onChange={handleInputChange}
                  placeholder="Enter OpenAI API key"
                  id="openai_key"
                />
              </div>
            )}
              <button
                type="button"
                className="flex flex-col items-center rounded-full bg-white p-1 text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                onClick={handleClick}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                <p class="text-sm">API KEY</p>
              </button>
              <div class="relative ml-3">
                <div>
                  <button type="button" class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span class="sr-only">Open user menu</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sm:hidden" id="mobile-menu">
          <div class="space-y-1 px-2 pb-3 pt-2">
            <a href="#" class="hover:bg-gray-100 text-black block rounded-md px-3 py-2 text-base font-medium" aria-current="page">Playground</a>
            <a href="#" class="hover:bg-gray-100 text-black block rounded-md px-3 py-2 text-base font-medium">History</a>
          </div>
        </div>
      </nav>
    );
  };

export default Navbar;
  