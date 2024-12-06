import { useState } from "react";
import TestCaseBlock from "./TestCaseBlock";
import "../styles/TestCaseAccordian.css";

export const TestCaseAccordion = ({ arrivalTime, burstTime }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="accordion-container">
      <div className="accordion-inner-container" onClick={toggleAccordion}>
        <span className="accordion-header">Sample Test Cases 🧪</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="accordion-content">
          <div>
            <p>Arrival time</p>
            <TestCaseBlock passedTC={arrivalTime} />
            <p>Burst time</p>
            <TestCaseBlock passedTC={burstTime} />
          </div>
        </div>
      )}
    </div>
  );
};
