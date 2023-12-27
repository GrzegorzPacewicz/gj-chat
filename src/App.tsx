import { useEffect, useState } from "react";

function App() {

    const [ws, setWs] = useState(null);

    const [inputUserValue, setInputUserValue] = useState("");
    const [userName, setUserName] = useState("");
    const [error, setError] = useState("");

    const [messages, setMessages] = useState([]);
        const [inputMessageValue, setInputMessageValue] = useState("");

    const trimName = (name) => name.trim();

    const handleUserConnect = () => {
        try {
            const trimmedName = trimName(inputUserValue);

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

        const newWs = new WebSocket(
            "wss://gjwebsocketserver.azurewebsites.net/ws?name=" + userName
        );

        setWs(newWs);

        newWs.onmessage = (e) => {
            console.log(e.data);
            setMessages((prev) => [...prev, e.data]);
        };

        newWs.onerror = (error) => {
            console.error("WebSocket Error: ", error);
        };

        newWs.onclose = () => {
            console.log("WebSocket connection closed");
            // Additional cleanup or handling logic if needed
        };

        // Cleanup function for useEffect
        return () => {
            if (
                newWs.readyState === WebSocket.OPEN ||
                newWs.readyState === WebSocket.CONNECTING
            ) {
                newWs.close();
            }
        };
    }, [userName]);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleUserConnect();
    };

    const handleSendMessage = () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            const messageContent = inputMessageValue.trim();
            if (messageContent.length > 0) {
                ws.send(messageContent);
                setInputMessageValue("");
            }
        } else {
            console.error("WebSocket is not open. Unable to send message.");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <>
            {!userName ? (
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
            ) : null}

            {userName ? (
                <div className="flex justify-center w-full  items-center gap-3  flex-col ">

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
                            onChange={(event) => {
                                setInputMessageValue(event.target.value);
                            }}
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
            ) : null}
        </>
    );
}

export default App;
