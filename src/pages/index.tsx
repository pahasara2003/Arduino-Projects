import { useState, useEffect } from "react";
import { CardHeader, Card, CardBody, Button } from "@nextui-org/react";

import { getDatabase, ref, update } from "firebase/database";

import { initializeApp } from "firebase/app";
// import LEDbutton from "@/components/LEDbutton";
// import { io } from "socket.io-client";

const firebaseConfig = {
  apiKey: "AIzaSyBAn3QkrGRtfQTMlmhr5ojDkr7SHsB5bY0",
  authDomain: "arduino-led-ed555.firebaseapp.com",
  databaseURL:
    "https://arduino-led-ed555-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "arduino-led-ed555",
  storageBucket: "arduino-led-ed555.firebasestorage.app",
  messagingSenderId: "166075128865",
  appId: "1:166075128865:web:ddb87fd103f5142f059760",
  measurementId: "G-DXFSBS7MMR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase

export default function IndexPage() {
  const [imageSrc, setImageSrc] = useState(
    "https://asia-south1-arduino-led-ed555.cloudfunctions.net/api"
  );
  const [taking, toggle] = useState(false);
  const db = getDatabase(app);

  // const btnList = [1, 2, 3, 4, 5];

  useEffect(() => {
    update(ref(db, "device"), {
      takePhoto: taking ? 1 : 0,
    });
  }, [taking]);

  useEffect(() => {
    // Function to update image source
    const updateImage = () => {
      const timestamp = new Date().getTime(); // Unique identifier
      setImageSrc(
        `https://asia-south1-arduino-led-ed555.cloudfunctions.net/api?t=${timestamp}`
      );
    };

    // Initial image load
    updateImage();

    // Update image every second
    const interval = setInterval(updateImage, 600);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="py-4 m-7  w-fit">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Image Capture</p>
          <h4 className="font-bold text-[2rem] pb-2  text-primary">
            ESP-32 Cam
          </h4>
          <Button
            onPress={() => {
              toggle((prev) => !prev);
            }}
            color={taking ? "danger" : "success"}
            className="text-white m-2"
            size="sm"
          >
            {taking ? "Stop" : "Start"}
          </Button>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <img alt="NextUI hero Image with delay" src={imageSrc} width={500} />{" "}
        </CardBody>
        {/* <CardFooter className="flex gap-3 justify-evenly">
          {btnList?.map((btn) => <LEDbutton db={db} i={btn} />)}
        </CardFooter> */}
      </Card>
    </div>
  );
}
