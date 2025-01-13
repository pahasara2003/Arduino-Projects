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
    <div className=" h-fit bg-gradient-to-r from-violet-300 via-pink-300 to-yellow-200  pt-0 ">
      <FormModal
        username={username}
        finished={finished}
        finishedConfig={finishedConfig}
        setUsername={setUsername}
      />
      <div className="max-md:w-screen  w-[600px] m-0 rounded-none  ">
        <div className="bg-white">
          <p className="text-center  font-bold pt-4 text-purple-500">
            Group Chat
          </p>
          <div className="w-full flex justify-center py-3  rounded-lg">
            <AvatarGroup max={5} total={Object.keys(users).length - 2}>
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
        </div>
        <Chat messages={messages} user={username} />
        <div className="flex p-3 gap-3 bg-white   items-center overflow-y-scroll bg-transparent ">
          <Textarea
            maxRows={"5" as any}
            size="lg"
            value={text}
            color="secondary"
            className="shadow-none"
            onValueChange={(val) => setText(val)}
          />
          <Button
            size="sm"
            className="w-[30px] text-[1.8rem] text-white bg-purple-500  h-[60px] rounded-full "
            onPressStart={() => {
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
