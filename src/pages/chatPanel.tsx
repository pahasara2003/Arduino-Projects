import FormModal from "@/components/formModel";
import { useEffect, useState } from "react";
import Chat from "@/components/Chat";
import { Textarea, Button } from "@nextui-org/react";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { socket } from "./../socket";
import { IoIosSend } from "react-icons/io";

const ChatPanel = () => {
  const [username, setUsername] = useState("");
  // const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  const [text, setText] = useState("");
  const [finished, finishedConfig] = useState(false);
  const [users, setUsers] = useState({});

  useEffect(() => {
    if (username !== "") {
      socket.auth = { username: username };
      socket.connect();
    }
  }, [finished]);

  useEffect(() => {
    const showUsers = (data: any) => {
      setUsers(data);
    };
    const addMessages = (data: any) => {
      setMessages((prev: any) => [...prev, data]);
    };
    socket.on("send users", showUsers);
    socket.on("send message", addMessages);

    return () => {
      socket.off("send users", showUsers);
      socket.off("send message", addMessages);
    };
  }, []);

  return (
    <div className=" h-full flex justify-center items-center bg-slate-800 ">
      <FormModal
        username={username}
        finished={finished}
        finishedConfig={finishedConfig}
        setUsername={setUsername}
      />
      <div className="w-screen m-0 rounded-none">
        <div className="w-full flex justify-center py-4  rounded-lg">
          <AvatarGroup max={3} total={Object.keys(users).length - 1}>
            {Object.keys(users).map((user: any) => {
              return (
                <Avatar
                  className="w-full"
                  src={`https://robohash.org/a${user}.png?size=200x200&set=set4`}
                />
              );
            })}
          </AvatarGroup>
        </div>
        <Chat messages={messages} user={username} />
        <div className="flex p-3 gap-3  items-center ">
          <Textarea value={text} onValueChange={(val) => setText(val)} />
          <Button
            size="sm"
            className="w-[30px] text-[1.8rem] text-white bg-green-400  h-[60px] rounded-full "
            onPress={() => {
              socket.emit("message", {
                user: username,
                message: text,
                timestamp: Date.now(),
              });
              setText("");
            }}
          >
            <IoIosSend className="m-0 p-0" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
