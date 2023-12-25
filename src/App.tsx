import React, { useState } from "react";

function App() {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [userName, setUserName] = useState('')

    const trimName = (name) => name.trim();

        function handleSubmit(event) {
        event.preventDefault();

        const trimmedName = trimName(inputValue);

        if (trimmedName.length < 3) {
            setError('Imię musi mieć przynajmniej 3 znaki.');
            return;
        }

        setError('');
        setUserName((trimmedName));
        setInputValue('')

        console.log('Imię (przycięte):', trimmedName);
    }

    // const isSubmitDisabled = inputValue.trim().length === 0;


    return (
        <div className="p-1">
            <form className="flex gap-3 my-2" onSubmit={handleSubmit}>
                <input
                    className="w-full text-xl border-[1px] border-blue-400 rounded p-2 border-solid"
                    value={inputValue}
                    autoFocus
                    type="text"
                    placeholder="Wpisz swoje imię"
                    onChange={(event) => {
                        setInputValue(event.target.value);
                        setError('');
                    }}
                />
                <button
                    className="text-xl border-[1px] border-blue-400 rounded p-2 border-solid"
                    type="submit"
                    // disabled={isSubmitDisabled}
                    >

                    Połącz
                </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}

            <div className="text-xl">Name: <span className="font-bold text-blue-600">{userName}</span></div>
        </div>
    );
}

export default App;
