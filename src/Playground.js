import React, { useEffect, useState } from 'react';
import TemperatureSlider from './TemperatureControl';
import MaxToken from './MaxToken';
import ModelSelection from './ModelSelection';
import StopSequence from './StopSequence';


const Playground = ({apiKey}) => {
    // Dynamic variables
    const [userInput, setUserInput] = useState('');
    const [variables, setVariables] = useState([]);
    const [requestData, setRequestData] = useState([]);

    useEffect(() => {
        const textarea = document.getElementById('user-input');
    
        textarea.addEventListener('input', () => {
          textarea.style.height = 'auto';
          textarea.style.height = `${textarea.scrollHeight}px`;
        });
      }, []);

    useEffect(() => {
        const handleTextareaResize = (event) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    variables.forEach((variable) => {
        const textarea = document.getElementById(variable.id);

        if (textarea) {
        textarea.addEventListener('input', handleTextareaResize);
        }
    });

    return () => {
        variables.forEach((variable) => {
        const textarea = document.getElementById(variable.id);

        if (textarea) {
            textarea.removeEventListener('input', handleTextareaResize);
        }
        });
    };
    }, [variables]);

    const checkVariables = () => {
    const variableRegex = /{{([^}]+)}}/g;
    const matches = userInput.match(variableRegex);

    if (matches) {
        const variableNames = matches.map((match) =>
        match.replace(/{{|}}/g, '').trim()
        );
        const newVariables = variableNames.map((variableName, index) => ({
        id: `variable-${index}`,
        name: variableName,
        }));
        setVariables(newVariables);
    } else {
        setVariables([]);
    }
    };
      
    
    // Function to handle user input changes
    const handleInputChange = (event) => {
        setUserInput(event.target.value);
      };
    
      useEffect(() => {
        checkVariables();
      }, [userInput]);

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    
    // Get current Model
    var [selectedModel, setSelectedModel] = useState(null);
    const handleModelChange = (model) => {
        // Access the selected model value here
        console.log(model);
        setSelectedModel(model)
      };
    // Get current Temperature
    var [selectedTemperature, setSelectedTemperature] = useState(1);
    const handleTemperatureChange = (temperature) => {
        console.log(temperature)
        setSelectedTemperature(temperature)

    }

    // Get current MaxToken
    var [selectedMaxToken, setSelectedMaxToken] = useState(200);
    const handleMaxTokenChange = (MaxToken) => {
        console.log(MaxToken)
        setSelectedMaxToken(MaxToken)

    }

    // Get current stop sequence
    var [selectedStopSequence, setSelectedStopSequence] = useState(null)
    const handleStopSequenceChange = (StopSequence) => {
        console.log(StopSequence)
        setSelectedStopSequence(StopSequence)
    }

    const makeRequest = async () => {
        setError(null)
        const url = 'https://api.openai.com/v1/completions';
      
        try {
          const userInput = document.getElementById('user-input').value;
          const model = selectedModel || 'text-davinci-003'; //default to 'text-davinci-003'
          const temperature = parseFloat(selectedTemperature) || 1;
          const tokens = parseFloat(selectedMaxToken) || 200;
          const stopSequence = selectedStopSequence || null;
      
          const variableValues = variables.map((variable) => {
            const textarea = document.getElementById(variable.id);
            return textarea.value;
          });
      
          // Replace variables in userInput
          let modifiedUserInput = userInput;
          variables.forEach((variable, index) => {
            const regex = new RegExp(`{{${variable.name}}}`, 'g');
            modifiedUserInput = modifiedUserInput.replace(regex, variableValues[index]);
          });
          
          console.log(apiKey)
          console.log(modifiedUserInput, model, temperature, tokens, stopSequence, apiKey);
      
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: model,
              prompt: modifiedUserInput,
              max_tokens: tokens,
              temperature: temperature,
              stop: stopSequence
            })
          });
      
          const data = await response.json();
          setResponse(data.choices[0].text);
      
          // Create a new request object
          const request = {
            modifiedUserInput,
            model,
            temperature,
            tokens,
            stopSequence,
            response: data.choices[0].text
          };
      
          // Append the request object to the requestData array
          setRequestData(prevData => [...prevData, request]);
        } catch (error) {
          setError('An error occurred while making the request.');
        }
      };
      
      
    
    return (
        <div className="text-black text-lg bg-white">
            <div class="container mx-auto p-4">
                <div class="flex">
                    <div class="w-5/12 pr-2">
                        <div class="bg-white p-4">
                        <h2 class="text-xl font-bold mb-2">
                            User Input
                        </h2>
                        <div class="w-full max-w mx-auto">
                            <div class="relative">
                                <textarea class="w-full px-4 py-2 pr-10 leading-tight bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:shadow-outline h-auto resize-none overflow-hidden text-sm" placeholder="Enter input... Place variables between {{ }}" id="user-input" onChange={handleInputChange}></textarea>
                                <button class="absolute inset-y-0 right-0 px-3 py-2 text-gray-500" onClick={makeRequest}>
                                <svg fill="#fcc01d" height="20px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 459 459" xmlSpace="preserve" stroke="#fcc01d">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                    <g>
                                        <path d="M229.5,0C102.751,0,0,102.751,0,229.5S102.751,459,229.5,459S459,356.249,459,229.5S356.249,0,229.5,0z M310.292,239.651 l-111.764,76.084c-3.761,2.56-8.63,2.831-12.652,0.704c-4.022-2.128-6.538-6.305-6.538-10.855V153.416 c0-4.55,2.516-8.727,6.538-10.855c4.022-2.127,8.891-1.857,12.652,0.704l111.764,76.084c3.359,2.287,5.37,6.087,5.37,10.151 C315.662,233.564,313.652,237.364,310.292,239.651z"></path>
                                    </g>
                                    </g>
                                </g>
                                </svg>
                                <p class="text-sm">Run</p>
                                </button>
                            </div>
                        </div>
                        <p class="pt-2">Variables</p>
                        <div className="flex flex-wrap pt-3">
                            {variables.map((variable) => (
                            <div className="mr-4 text-center" key={variable.id}>
                                <textarea
                                id={variable.id}
                                className="w-full bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:shadow-outline h-auto resize-none overflow-hidden text-sm"
                                rows="1"
                                placeholder=""
                                ></textarea>
                                <p className="text-xs mt-1">{variable.name}</p>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>  
                <div className="w-2/12">
                <div className="flex flex-col items-center h-full border-l border-r border-gray-400">
                    <p className="text-center font-bold">Model Tuning</p>
                    <div className="flex flex-col justify-center items-center w-full pt-4">
                    <ModelSelection onModelChange={handleModelChange}/>
                    <div className="pt-5">
                        <TemperatureSlider onTemperatureChange={handleTemperatureChange} compare={"false"}/>
                    </div>
                    <div className="pt-5">
                        <MaxToken onMaxTokenChange={handleMaxTokenChange} compare={"false"}/>
                    </div>
                    <div className="pt-5">
                        <StopSequence onStopSequenceChange={handleStopSequenceChange} compare={"false"}/>
                    </div>
                    </div>
                </div>
                </div>
                <div class="w-5/12 pl-2">
                    <div class="p-4">
                        <h2 class="text-xl font-bold mb-2">Model Output</h2>
                        <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                            {requestData.slice().reverse().map((request, index) => (
                                <div key={index} className="mb-4">
                                    <p className="text-sm">Model: {request.model}</p>
                                    <p className="text-sm">Temperature: {request.temperature}</p>
                                    <p className="text-sm">Tokens: {request.tokens}</p>
                                    <p className="text-sm">Stop Sequence: {request.stopSequence}</p>
                                    <br></br>
                                    <p className="text-sm">
                                        <span className="font-bold">User:</span> {request.modifiedUserInput}
                                    </p>
                                    <br></br>
                                    <p className="text-sm">
                                        <span className="font-bold">{request.model}:</span> {request.response}
                                    </p>
                                    <br></br>
                                    <hr className="w-180 border-t border-gray-400"></hr>
                                </div>
                            ))}
                        </div>
                        {error && <div>{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};


export default Playground;