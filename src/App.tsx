import { useEffect, useState } from "react";
import { User } from "./components/User.jsx";
import { Chat } from "./components/Chat.jsx";

function App() {
    const [ws, setWs] = useState(null);
    const [userName, setUserName] = useState("");
    const [messages, setMessages] = useState([]);

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
        };

        return () => {
            if (
                newWs.readyState === WebSocket.OPEN ||
                newWs.readyState === WebSocket.CONNECTING
            ) {
                newWs.close();
            }
        };
    }, [userName]);

    const handleUserConnect = (trimmedName) => {
        setUserName(trimmedName);
    };

    const handleSendMessage = (messageContent) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            if (messageContent.length > 0) {
                ws.send(messageContent);
            }
        } else {
            console.error("WebSocket is not open. Unable to send message.");
        }
    };

    return (
        <>
            {!userName ? (
                <User onUserConnect={handleUserConnect}/>
            ) : (
                <Chat
                    userName={userName}
                    onSendMessage={handleSendMessage}
                    messages={messages}
                />
            )}
        </>
    );
}

export default App;
