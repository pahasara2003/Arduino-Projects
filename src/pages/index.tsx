import { useState, useEffect } from "react";
import { Image, CardHeader, Card, CardBody } from "@nextui-org/react";

export default function IndexPage() {
  const [encodedImage, setEncodedImage] = useState("");

  useEffect(() => {
    setInterval(async () => {
      let response = await fetchImage();

      setEncodedImage(response);
    }, 1000);
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
      </Card>
    </div>
  );
}
