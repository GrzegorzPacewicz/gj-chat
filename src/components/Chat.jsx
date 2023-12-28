// Chat.jsx

import React, { useState } from "react";

export const Chat = ({ userName, onSendMessage, messages }) => {
    const [inputMessageValue, setInputMessageValue] = useState("");

    const handleSendMessage = () => {
        onSendMessage(inputMessageValue);
        setInputMessageValue("");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="flex justify-center w-full items-center gap-3 flex-col ">
            <div className="h-[40rem] flex justify-end flex-col overflow-y-scroll w-full">
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>

            <div className="flex items-center gap-3">
                <p className="text-xl font-bold text-blue-600">{userName}</p>
                <input
                    type="text"
                    value={inputMessageValue}
                    className="w-full text-xl border-[1px] border-blue-600 rounded p-2 border-solid"
                    onChange={(event) => setInputMessageValue(event.target.value)}
                    onKeyPress={handleKeyPress}
                    autoFocus
                    placeholder="wpisz coś"
                />
                <button
                    className="text-xl border-[1px] border-blue-600 rounded p-2 border-solid hover:text-white hover:bg-blue-600 transform-all duration-300 $"
                    type="button"
                    onClick={handleSendMessage}
                >
                    Wyślij
                </button>
            </div>
        </div>
    );
};
