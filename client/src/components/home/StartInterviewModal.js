import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { MainBlueButtonCss } from "../utils/buttons/MainBlueButton";
import FormAction from "../FormAction";

export default function StartInterviewModal({ handleClick }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        className={MainBlueButtonCss}
        style={{ margin: "0" }}
        onPress={onOpen}
      >
        Practice Interview
      </Button>
      <Modal
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                {/* <Image
                alt="NextUI hero Image"
                className="object-cover rounded-xl"
                src="/images/online_interview.png"
                /> */}
                <h3 className="text-md text-gray-700 font-medium text-center my-3">
                  Answer 5 interview questions
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Engage in a focused practice session with our
                  attention-grabbing modal and tackle 5 interview questions
                  effectively.
                </p>
              </ModalBody>
              <ModalFooter>
                <FormAction
                  padding="15px 5px"
                  fontWeight="normal"
                  fontSize="1rem"
                  handleClick={handleClick}
                  text="Start"
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
