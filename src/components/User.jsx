import React, { useState } from "react";

export const User = ({ onUserConnect }) => {
    const [inputUserValue, setInputUserValue] = useState("");
    const [error, setError] = useState("");

    const trimName = (name) => name.trim();

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            const trimmedName = trimName(inputUserValue);

            if (trimmedName.length < 3) {
                setError("Imię musi mieć przynajmniej 3 znaki.");
                return;
            }

            setError("");
            onUserConnect(trimmedName);
        } catch (error) {
            console.error("Error during WebSocket connection: ", error);
        }
    };

    return (
        <div className="p-1 mt-10 w-full">
            <form className="flex gap-3 my-2" onSubmit={handleSubmit}>
                <input
                    className="w-full text-xl border-[1px] border-blue-600 rounded p-2 border-solid"
                    value={inputUserValue}
                    autoFocus
                    type="text"
                    placeholder="Wpisz swoje imię"
                    onChange={(event) => {
                        setInputUserValue(event.target.value);
                        setError("");
                    }}
                />
                <button
                    className="text-xl border-[1px] border-blue-600 rounded p-2 border-solid hover:text-white hover:bg-blue-600 transform-all duration-300 $"
                    type="submit"
                >
                    Połącz
                </button>
            </form>
            <div className="h-10 py-2">
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
};

