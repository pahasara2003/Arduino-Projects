import { useState, useEffect } from "react";
import { Slider } from "@nextui-org/react";

export default function IndexPage() {
  const [value, setValue] = useState<any>(0);

  useEffect(() => {
    const brightness = Math.round((255 * value) / 100);
    const options = {
      method: "PATCH",
      body: JSON.stringify({ data: brightness }),
    };

    fetch(
      "https://arduino-led-ed555-default-rtdb.asia-southeast1.firebasedatabase.app/pwm.json",
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }, [value]);

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <Slider
        className="max-w-md"
        color="primary"
        defaultValue={value}
        onChangeEnd={setValue}
        label="Change Brightness"
        marks={[
          {
            value: 20,
            label: "20%",
          },
          {
            value: 50,
            label: "50%",
          },
          {
            value: 80,
            label: "80%",
          },
        ]}
        size="md"
        step={1}
      />
    </div>
  );
}
