import { useEffect, useState } from "react";

function App() {
    const [inputValue, setInputValue] = useState("");
    const [userName, setUserName] = useState("");
    const [error, setError] = useState("");

    const trimName = (name) => name.trim();

    const handleConnect = () => {
        try {
            const trimmedName = trimName(inputValue);

            if (trimmedName.length < 3) {
                setError("Imię musi mieć przynajmniej 3 znaki.");
                return;
            }

            setError("");
            setUserName(trimmedName);
        } catch (error) {
            console.error("Error during WebSocket connection: ", error);
        }
    };

    useEffect(() => {
        if (!userName) return;

        const ws = new WebSocket(
            "wss://gjwebsocketserver.azurewebsites.net/ws?name=" + userName
        );

        ws.onmessage = (e) => {
            console.log(e.data);
        };

        ws.onerror = (error) => {
            console.error("WebSocket Error: ", error);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
            // Additional cleanup or handling logic if needed
        };

        // Cleanup function for useEffect
        return () => {
            if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
                ws.close();
            }
        };
    }, [userName]);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleConnect();
    };

    return (
        <>
            <div className="p-1 mt-10 w-full">
                <form className="flex gap-3 my-2" onSubmit={handleSubmit}>
                    <input
                        className="w-full text-xl border-[1px] border-blue-600 rounded p-2 border-solid"
                        value={inputValue}
                        autoFocus
                        type="text"
                        placeholder="Wpisz swoje imię"
                        onChange={(event) => {
                            setInputValue(event.target.value);
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

            {userName && <div className="flex w-full gap-3 h-screen flex justify-end flex-col">

                <div className="flex">{userName} wiadomość</div>

                <div className="flex items-center gap-3 mb-60">
                    <p className="text-xl font-bold text-blue-600">{userName}</p>
                    <input type="text"
                           className="w-full text-xl border-[1px] border-blue-600 rounded p-2 border-solid"
                           onClick={() => {
                           }} placeholder="wpisz coś"/>
                    <button
                        className="text-xl border-[1px] border-blue-600 rounded p-2 border-solid hover:text-white hover:bg-blue-600 transform-all duration-300 $"
                        type="submit"
                    >Wyślij
                    </button>
                </div>

            </div>}

        </>

    );
}

export default App;
