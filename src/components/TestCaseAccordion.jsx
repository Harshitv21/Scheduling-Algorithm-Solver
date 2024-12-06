import { useState } from "react";
import TestCaseBlock from "./TestCaseBlock";
import "../styles/TestCaseAccordion.css";

export const TestCaseAccordion = ({ arrivalTime, burstTime, timeQuantum }) => {
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

      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <div>
          <div>
            <p>Arrival time</p>
            <TestCaseBlock passedTC={arrivalTime} />
          </div>
          <div>
            <p>Burst time</p>
            <TestCaseBlock passedTC={burstTime} />
          </div>
          {timeQuantum && (
            <div>
              <p>Time Quantum</p>
              <TestCaseBlock passedTC={timeQuantum} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
