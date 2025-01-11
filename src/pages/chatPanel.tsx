import FormModal from "@/components/formModel";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const ChatPanel = () => {
  const [username, setUsername] = useState("");
  const [finished, finishedConfig] = useState(false);
  const [id, setID] = useState<any>("");

  useEffect(() => {
    const socket: Socket = io("http://localhost:3000"); // Replace with your server URL

    socket.on("connect", () => {
      setID(socket.id);
      socket.emit("chat message", username);
    });

    return () => {
      socket.disconnect();
    };
  }, [finished]);
  return (
    <div>
      <FormModal
        username={username}
        finished={finished}
        finishedConfig={finishedConfig}
        setUsername={setUsername}
      />
    </div>
  );
};

export default ChatPanel;
