import React, { useEffect, useState } from 'react';

const Stream = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const API_KEY = "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";

    const promptInput = document.getElementById("promptInput"); // equivalent of 'user-input'
    const generateBtn = document.getElementById("generateBtn");
    const stopBtn = document.getElementById("stopBtn");
    const resultText = document.getElementById("resultText");

    const [input, setInput] = useState('')

    const handleInputChange = (event) => {
        setInput(event.target.value);
      };

    let controller = null; // Store the AbortController instance

    const generate = async () => {
    // Alert the user if no prompt value
    if (!input) {
        alert("Please enter a prompt.");
        return;
    }

    // Disable the generate button and enable the stop button
    // generateBtn.disabled = true;
    // stopBtn.disabled = false;
    resultText.innerText = "Generating...";

    // Create a new AbortController instance
    controller = new AbortController();
    const signal = controller.signal;

    try {
        // Fetch the response from the OpenAI API with the signal from AbortController
        const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: promptInput.value }],
            max_tokens: 100,
            stream: true, // For streaming responses
        }),
        signal, // Pass the signal to the fetch request
        });

        // Read the response as a stream of data
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        resultText.innerText = "";

        while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        // Massage and parse the chunk of data
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        const parsedLines = lines
            .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
            .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
            .map((line) => JSON.parse(line)); // Parse the JSON string

        for (const parsedLine of parsedLines) {
            const { choices } = parsedLine;
            const { delta } = choices[0];
            const { content } = delta;
            // Update the UI with the new content
            if (content) {
            resultText.innerText += content;
            }
        }
        }
    } catch (error) {
        // Handle fetch request errors
        if (signal.aborted) {
        resultText.innerText += ". [ABORTED]";
        } else {
        console.error("Error:", error);
        resultText.innerText = "Error occurred while generating.";
        }
    } finally {
        // Enable the generate button and disable the stop button
        // generateBtn.disabled = false;
        // stopBtn.disabled = true;
        controller = null; // Reset the AbortController instance
    }
    };

    const stop = () => {
    // Abort the fetch request by calling abort() on the AbortController instance
    if (controller) {
        controller.abort();
        controller = null;
    }
    };

    // console.log("Before promptInput")
    // promptInput.onKeyUp = (event) => {
    //     if (event.key === "Enter") {
    //         generate();
    //     }
    // };
    // generateBtn.onClick = generate;
    // stopBtn.onClick = stop;

    return (
        <div class="lg:w-1/2 2xl:w-1/3 p-8 rounded-md bg-gray-100">
        <h1 class="text-3xl font-bold mb-6">
            Streaming OpenAI API Completions in JavaScript
        </h1>
        <div id="resultContainer" class="mt-4 h-48 overflow-y-auto">
            <p class="text-gray-500 text-sm mb-2">Generated Text</p>
            <p id="resultText" class="whitespace-pre-line"></p>
        </div>
        <input
            type="text"
            id="promptInput"
            class="w-full px-4 py-2 rounded-md bg-gray-200 placeholder-gray-500 focus:outline-none mt-4"
            placeholder="Enter prompt..."
            onChange={handleInputChange}
        />
        <div class="flex justify-center mt-4">
            <button
            id="generateBtn"
            class="w-1/2 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-900 focus:outline-none mr-2 disabled:opacity-75 disabled:cursor-not-allowed"
            onClick={generate}
            >
            Generate
            </button>
            <button
            id="stopBtn"
            class="w-1/2 px-4 py-2 rounded-md border border-gray-500 text-gray-500 hover:text-gray-700 hover:border-gray-700 focus:outline-none ml-2 disabled:opacity-75 disabled:cursor-not-allowed"
            onClick={stop}
            >
            Stop
            </button>
        </div>
        </div>
    );
};

export default Stream;