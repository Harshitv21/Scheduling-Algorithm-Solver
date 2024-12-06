import { useState } from "react";
import "../styles/FCFS.css";
import DisplayATAndBT from "./DisplayATAndBT";
import Output from "./Output";
import { TestCaseAccordion } from "./TestCaseAccordion";

export const FCFS = ({ arrivalArray, burstTimeArray }) => {
  const [showOutput, setShowOutput] = useState(false);
  const [sortedJobs, setSortedJobs] = useState([]);

  const solveFCFS = () => {
    const jobs = arrivalArray.map((item, index) => ({
      jobIndex: String.fromCharCode(65 + index),
      arrivalTime: item,
      burstTime: burstTimeArray[index],
    }));

    // Sort jobs by arrival time (and maintain original order for tie)
    const sortedJobsCopy = [...jobs].sort(
      (a, b) =>
        a.arrivalTime - b.arrivalTime || a.jobIndex.localeCompare(b.jobIndex)
    );

    let currentTime = 0;
    const finalJobs = sortedJobsCopy.map((job) => {
      const startTime = Math.max(currentTime, job.arrivalTime);
      const finishTime = startTime + job.burstTime;
      const turnaroundTime = finishTime - job.arrivalTime;
      const waitingTime = turnaroundTime - job.burstTime;

      currentTime = finishTime; // Update current time to the finish time of this job

      return {
        ...job,
        finishTime,
        turnaroundTime,
        waitingTime,
      };
    });

    setSortedJobs(finalJobs);
    setShowOutput(true);
  };

  return (
    <div>
      <div>
        <h3>First Come First Serve (FCFS)</h3>
      </div>

      <div>
        <TestCaseAccordion arrivalTime="0 2 4 6 8" burstTime="3 6 4 5 2" />
      </div>

      <DisplayATAndBT
        arrivalArray={arrivalArray}
        burstTimeArray={burstTimeArray}
        messageAT={"Arrival times received,"}
        messageBT={"Burst times received,"}
      />

      <div className="solve-btn-container">
        {arrivalArray.length >= 1 &&
        burstTimeArray.length >= 1 &&
        arrivalArray.length === burstTimeArray.length ? (
          <div>
            <button
              type="button"
              className="btn btn-success"
              onClick={solveFCFS}
            >
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

      {showOutput && <Output sortedJobs={sortedJobs} />}
    </div>
  );
};
