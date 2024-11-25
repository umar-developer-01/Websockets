import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessage, setlatestMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection established");
      setSocket(newSocket);
      newSocket.send("Hello Server from Client!");
    };
    newSocket.onmessage = (message) => {
      console.log("Message received:", message.data);
      setlatestMessage(message.data);
    };

    return () => newSocket.close();
  }, []);

  const sendData = () => {
    socket?.send(message || "");
  };

  if (!socket) {
    return (
      <>
        <div>Socket connecting...</div>
      </>
    );
  }
  return (
    <>
      <div>
        <div>Hi there socker connection established</div>
        <div>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <button onClick={sendData}>Send</button>
        </div>
        <div>{latestMessage}</div>
      </div>
    </>
  );
}

export default App;

// now use the socket state to send the data or pass it in Context API or redux and use it any where
