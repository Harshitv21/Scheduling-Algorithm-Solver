import { useState } from "react";
import "../styles/RR.css";
import DisplayATAndBT from "./DisplayATAndBT";
import { TestCaseAccordion } from "./TestCaseAccordion";
import Output from "./Output";

export const RR = ({ arrivalArray, burstTimeArray, timeQuantum }) => {
  const [showOutput, setShowOutput] = useState(false);
  const [scheduledJobs, setScheduledJobs] = useState([]);

  const solveRR = () => {
    const n = arrivalArray.length;
    const remainingBurstTime = [...burstTimeArray];
    const completionTime = Array(n).fill(0);

    let time = 0;
    const queue = [];
    const isInQueue = Array(n).fill(false);

    // Enqueue jobs arriving at time 0
    for (let i = 0; i < n; i++) {
      if (arrivalArray[i] === 0) {
        queue.push(i);
        isInQueue[i] = true;
      }
    }

    while (queue.length > 0) {
      const currentIndex = queue.shift();
      const timeToExecute = Math.min(
        remainingBurstTime[currentIndex],
        timeQuantum
      );

      // Simulate execution
      time += timeToExecute;
      remainingBurstTime[currentIndex] -= timeToExecute;

      // Check for newly arrived jobs during the current time
      for (let i = 0; i < n; i++) {
        if (
          arrivalArray[i] <= time &&
          !isInQueue[i] &&
          remainingBurstTime[i] > 0
        ) {
          queue.push(i);
          isInQueue[i] = true;
        }
      }

      // If the current process is not finished, re-add it to the queue
      if (remainingBurstTime[currentIndex] > 0) {
        queue.push(currentIndex);
      } else {
        completionTime[currentIndex] = time;
      }
    }

    // Calculate TAT and WT
    const results = arrivalArray.map((arrivalTime, index) => {
      const turnaroundTime = completionTime[index] - arrivalTime;
      const waitingTime = turnaroundTime - burstTimeArray[index];
      return {
        jobIndex: String.fromCharCode(65 + index), // A, B, C...
        arrivalTime,
        burstTime: burstTimeArray[index],
        finishTime: completionTime[index],
        turnaroundTime,
        waitingTime,
      };
    });

    setScheduledJobs(results);
    setShowOutput(true);
  };

  return (
    <div>
      <div>
        <h3>Round Robin (RR)</h3>
      </div>

      <div>
        <TestCaseAccordion
          arrivalTime="0 1 2 3 4"
          burstTime="5 4 3 2 6"
          timeQuantum="2"
        />
      </div>

      <DisplayATAndBT
        arrivalArray={arrivalArray}
        burstTimeArray={burstTimeArray}
        messageAT={"Arrival times received,"}
        messageBT={"Burst times received,"}
      />
      <div>
        Time Quantum: <span>{timeQuantum}</span>
      </div>

      <div className="solveBtnContainer">
        {arrivalArray.length >= 1 &&
        burstTimeArray.length >= 1 &&
        arrivalArray.length === burstTimeArray.length &&
        timeQuantum ? (
          <div>
            <button type="button" className="btn btn-success" onClick={solveRR}>
              Solve ✅
            </button>
          </div>
        ) : (
          <div>
            <button type="button" className="btn btn-danger" disabled={true}>
              No of AT & BT does not match OR null ⚠️
            </button>
          </div>
        )}
      </div>

      {showOutput && <Output sortedJobs={scheduledJobs} />}
    </div>
  );
};
