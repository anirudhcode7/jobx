import React from 'react'
import { Modal, ModalContent, ModalBody, ModalFooter, Button, Accordion, AccordionItem, useDisclosure } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

export default function QuestionTypeModal({ type }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // setting up the button based on the type of question
  let buttonClass, buttonContent;

  // Trim and lowercase the type for comparison
  const trimmedLowercaseType = type.trim().toLowerCase();

  // Determine button class and modal header text based on the type
  switch (trimmedLowercaseType) {
    case 'situational':
      buttonClass = "bg-rose-50 text-rose-400 font-medium text-xs lg:text-sm border-1 border-rose-100 align-middle";
      buttonContent = "Situational Question";
      break;
    case 'technical':
      buttonClass = "bg-lime-50 text-lime-600 font-medium text-xs lg:text-sm border-1 border-lime-100 align-middle";
      buttonContent = "Technical Question";
      break;
    case 'background':
      buttonClass = "bg-purple-50 text-purple-500 font-medium text-xs lg:text-sm border-1 border-purple-100 align-middle";
      buttonContent = "Background Question";
      break;
    default:
      buttonClass = "hidden";
      buttonContent = "";
      break;
  }

  return (
    <>
      <Button size="sm" className={buttonClass} style={{ margin: '0', transform: 'scale(0.9)' }} onPress={onOpen}><FontAwesomeIcon icon={faCircleInfo} /> {buttonContent}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" scrollBehavior="outside" placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <h3 className="text-md text-slate-700 font-medium mt-2">Question categories</h3>
                <p className="text-sm">Interviewers ask different types of questions to better understand things like how your interests align with the company’s interests, what skills you’ll bring to the role, and how you solve problems.</p>

                <Accordion variant="splitted" >

                  <AccordionItem size="sm" key="1" aria-label="Background Question"
                    subtitle={
                      <p className="flex text-purple-500 font-medium">
                        Background Question
                      </p>
                    }
                  >
                    <ul className="list-disc text-sm space-y-2">
                      <li>Background questions provide insight into your previous training and experiences.</li>
                      <li>They may touch upon your education, past jobs, interests, and goals.</li>
                      <li>These questions help the interviewer gauge whether your experiences and interests align with their company.</li>
                      <li>By exploring your background, the interviewer aims to understand if you possess the skills necessary for the role.</li>
                      <li>They also consider whether you have previous experience in similar positions.</li>
                      <li>The interviewer evaluates if the new role aligns with your goals and interests.</li>
                      <li>Essentially, these questions shed light on your professional journey and how it relates to the position you're interviewing for.</li>
                    </ul>
                    {/* <h5 className="text-slate-600 font-medium text-sm">What they are:</h5> */}
                  </AccordionItem>
                  <AccordionItem key="2" aria-label="Situational Question"
                    subtitle={
                      <p className="flex text-rose-400 font-medium">
                        Situational Question
                      </p>
                    }>
                    <ul className="list-disc text-sm space-y-2">
                      <li>Situational questions cover how you’ve dealt with situations in the past and how you might deal with situations in the future.</li>
                      <li>Situational questions help interviewers understand how you use your skills to approach challenging problems.</li>
                      <li>They can show how you handle adversity, how you solve problems, and how you’ve grown from past experiences.</li>
                    </ul>
                  </AccordionItem>
                  <AccordionItem key="3" aria-label="Technical Question" subtitle={
                    <p className="flex text-lime-600 font-medium">
                      Technical Question
                    </p>
                  }>
                    <ul className="list-disc text-sm space-y-2">
                      <li>Technical questions cover knowledge and skills specific to your field.</li>
                      <li>They often test how you would use your technical knowledge to solve problems in hypothetical situations.</li>
                      <li>Technical questions help interviewers understand how you think and if you have the skills needed to perform the role.</li>
                      <li>They can help show how you adapt to situations and use your knowledge to approach complicated problems.</li>
                    </ul>

                  </AccordionItem>
                </Accordion>
              </ModalBody>
              <ModalFooter>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
