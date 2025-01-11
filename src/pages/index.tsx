import { useState, useEffect } from "react";
import { CardHeader, Card, CardBody, Button, Slider } from "@nextui-org/react";
import { FiCamera, FiCameraOff } from "react-icons/fi";
import { MdFlashlightOn, MdFlashlightOff } from "react-icons/md";

export default function IndexPage() {
  const [imageSrc, setImageSrc] = useState(
    "https://asia-south1-arduino-led-ed555.cloudfunctions.net/api"
  );
  const [taking, toggle] = useState(false);
  const [flasher, toggleFlasher] = useState(false);
  const [angle, setAngle] = useState<any>(25);

  useEffect(() => {
    fetch(
      `https://asia-south1-arduino-led-ed555.cloudfunctions.net/api/data?flasherStatus=${flasher ? "1" : "0"}&takePhoto=${taking ? "1" : "0"}&servoAngle=${(parseInt(angle) + 90).toString()}`
    );
  }, [taking, flasher, angle]);

  useEffect(() => {
    const updateImage = () => {
      const timestamp = new Date().getTime(); // Unique identifier
      setImageSrc(
        `https://asia-south1-arduino-led-ed555.cloudfunctions.net/api?t=${timestamp}`
      );
    };

    updateImage();

    const interval = setInterval(updateImage, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="py-4 m-7  w-fit">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny text-center font-bold">
            You are watching ...
          </p>
          <h4 className="font-bold text-center text-[2.2rem] pb-2  text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text ">
            Pahasara's ESP-32 Cam
          </h4>
          <div className="flex justify-center w-full">
            <Button
              onPress={() => {
                toggle((prev) => !prev);
              }}
              color={!taking ? "danger" : "success"}
              className="text-white  rounded-full w-[40px] h-[60px] m-2 text-lg"
              size="sm"
            >
              {taking ? <FiCamera /> : <FiCameraOff />}
            </Button>
            <Button
              onPress={() => {
                toggleFlasher((prev) => !prev);
              }}
              color={!flasher ? "danger" : "success"}
              className="text-white  rounded-full w-[40px] h-[60px] m-2 text-lg"
              size="sm"
            >
              {flasher ? <MdFlashlightOn /> : <MdFlashlightOff />}
            </Button>
          </div>
          <Slider
            className="max-w-md"
            color="warning"
            value={angle}
            onChangeEnd={(v) => setAngle(v)}
            fillOffset={0}
            formatOptions={{ signDisplay: "always" }}
            label="Rotate"
            maxValue={90}
            minValue={-90}
            size="sm"
            step={1}
          />
        </CardHeader>
        <CardBody className=" py-2 m-3 ">
          <div className="flex justify-center">
            <img
              alt="NextUI hero Image with delay"
              className="rounded-medium rotate-90"
              src={imageSrc}
              width={400}
            />{" "}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
