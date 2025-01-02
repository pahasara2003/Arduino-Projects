import { useState, useEffect } from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaPowerOff } from "react-icons/fa";
import { ref, update } from "firebase/database";

import { Button } from "@nextui-org/react";
const LEDbutton = ({ db, i }: any) => {
  const [on, toggle] = useState(false);

  useEffect(() => {
    update(ref(db, `device/LED${i}`), {
      value: on ? 1 : 0,
    });
  }, [on]);

  return (
    <Button
      radius="sm"
      color={on ? "secondary" : "default"}
      className="h-10 "
      size="sm"
      onPress={() => {
        toggle((prev) => !prev);
      }}
    >
      {on ? <HiOutlineLightBulb className="text-2xl" /> : <FaPowerOff />}
    </Button>
  );
};

export default LEDbutton;
