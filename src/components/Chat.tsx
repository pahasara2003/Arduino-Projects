import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react";
import { useRef, useEffect } from "react";

const Chat = ({ messages, user }: any) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current as any;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollContainerRef}
      className=" h-[70vh] bg-gradient-to-tr p-1 overflow-y-scroll overflow-visible  items-center justify-center"
    >
      {messages.map((msg: any) => {
        const date = new Date(msg.timestamp); // Convert timestamp to Date object

        // Get hours and minutes
        let hours = date.getHours(); // Get hours in 24-hour format
        let minutes = date.getMinutes() as any; // Get minutes

        // Format the time (convert hours to 12-hour format and append AM/PM)
        let period = hours >= 12 ? "pm" : "am"; // Determine AM or PM
        hours = hours % 12 || 12; // Convert to 12-hour format (0 becomes 12)
        minutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero to minutes if needed

        const timeString = `${hours}.${minutes}${period}`; // Format the string
        return (
          <>
            <Card
              className={`shadow-none clear-both rounded-lg ${msg.user == user ? "float-right bg-purple-500" : "float-left bg-gray-50"}  p-0 max-w-[40vw] mx-3 my-1 mb-0 flex `}
            >
              <CardHeader className="text-[0.6rem]  text-slate-400 m-0    text-center  px-2   my-1 mb-0 flex pb-0 pt-[0.1rem]">
                <img
                  className="w-fit   h-[15px]  "
                  src={`https://robohash.org/a${msg.user}.png?size=200x200&set=set4`}
                />
                <p
                  className={` ${msg.user == user ? "text-right text-white" : "text-left"} w-full mx-2 `}
                >
                  {msg.user == user ? "Me" : msg.user}
                </p>
              </CardHeader>
              <CardBody
                className={`m-0 pb-0 pt-0 px-3 text-slate-700 ${msg.user == user ? "text-white" : ""}`}
              >
                {msg.message}
              </CardBody>
              <CardFooter className="text-[0.6rem]  text-slate-400 m-0   px-2 py-0">
                <p
                  className={` ${msg.user == user ? "text-right text-white" : "text-left"} w-full mx-1 pb-1 `}
                >
                  {timeString}
                </p>{" "}
              </CardFooter>
            </Card>
          </>
        );
      })}
    </div>
  );
};

export default Chat;
