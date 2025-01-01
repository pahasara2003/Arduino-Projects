import { useState, useEffect } from "react";
import {
  Slider,
  Image,
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  Button,
  image,
} from "@nextui-org/react";
import { MdLinkedCamera } from "react-icons/md";

export default function IndexPage() {
  const [capture, setCapture] = useState<any>(false);
  const [encodedImage, setEncodedImage] = useState("");

  useEffect(() => {
    handleRequest();
  }, []);

  const fetchImage = async () => {
    const getResponse = await fetch(
      "https://arduino-led-ed555-default-rtdb.asia-southeast1.firebasedatabase.app/capture.json"
    );

    const responseData = await getResponse.json();
    const image = `data:image/png;base64,${responseData.base64}`;
    console.log(image == encodedImage);
    return image;
  };

  const handleRequest = async () => {
    try {
      // Send PATCH request
      await fetch(
        "https://arduino-led-ed555-default-rtdb.asia-southeast1.firebasedatabase.app/device.json",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Your patch payload
            takePhoto: 1,
          }),
        }
      );

      setCapture(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Send GET request
      let response = await fetchImage();
      if (response == encodedImage) {
        response = await fetchImage();
      }

      setEncodedImage(response);
      setCapture(false);
      await fetch(
        "https://arduino-led-ed555-default-rtdb.asia-southeast1.firebasedatabase.app/device.json",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Your patch payload
            takePhoto: 0,
          }),
        }
      );
    } catch (error) {
      console.error("Error during requests:", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="py-4 m-7  w-fit">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Image Capture</p>
          <h4 className="font-bold text-large text-primary">
            Pahasara's ESP-32 Cam
          </h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="NextUI hero Image with delay"
            src={encodedImage}
            width={500}
          />{" "}
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button
            isLoading={capture}
            className="bg-gradient-to-tl from-primary-500 to-secondary-500 shadow-none text-white "
            endContent={<MdLinkedCamera />}
            onPress={handleRequest}
          >
            Take a photo
          </Button>{" "}
        </CardFooter>
      </Card>
    </div>
  );
}
