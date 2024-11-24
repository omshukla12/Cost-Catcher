import React, { useState } from 'react'

export const Accordion = ({ children }) => (
  <div className="border rounded-md">{children}</div>
)

export const AccordionItem = ({ children }) => (
  <div className="border-b last:border-b-0">{children}</div>
)

export const AccordionTrigger = ({ children, onClick }) => (
  <button
    className="w-full text-left p-4 focus:outline-none hover:bg-gray-100"
    onClick={onClick}
  >
    {children}
  </button>
)

export const AccordionContent = ({ children, isOpen }) => (
  <div className={`p-4 ${isOpen ? 'block' : 'hidden'}`}>{children}</div>
)

export const AccordionWrapper = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <Accordion>
      {items.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionTrigger onClick={() => setOpenIndex(openIndex === index ? null : index)}>
            {item.question}
          </AccordionTrigger>
          <AccordionContent isOpen={openIndex === index}>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};