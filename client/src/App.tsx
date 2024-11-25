import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection established");
      setSocket(newSocket);
      newSocket.send("Hello Server from Client!");
    };
    newSocket.onmessage = (message) => {
      console.log("Message received:", message.data);
    };

    return () => newSocket.close();
  }, []);

  if (!socket) {
    return (
      <>
        <div>Socket connecting...</div>
      </>
    );
  }
  return <>Hi there socker connection established</>;
}

export default App;

// now use the socket state to send the data or pass it in Context API or redux and use it any where
