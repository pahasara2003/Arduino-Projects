import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Input,
} from "@nextui-org/react";

export default function FormModal({
  username,
  setUsername,
  finished,
  finishedConfig,
}: any) {
  return (
    <>
      <Modal isOpen={!finished} placement="center" className=" w-[350px]">
        <ModalContent>
          <>
            <ModalHeader className=" text-center   gap-1">
              <h1 className="text-center w-full text-white font-extrabold text-[1.5rem]  pt-5">
                {" "}
                Setting up...
              </h1>
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-2 flex-col items-center">
                <Avatar
                  src={`https://robohash.org/a${username}.png?size=200x200&set=set4`}
                  className="w-40 h-40 mb-10"
                />
                <Input
                  value={username}
                  onValueChange={(val) => setUsername(val)}
                  key="outside"
                  size="lg"
                  variant="flat"
                  className="w-50 "
                  label="Username"
                  placeholder="What should we call you?"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-violet-600"
                onPressStart={() => {
                  finishedConfig(true);
                }}
              >
                Go
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
