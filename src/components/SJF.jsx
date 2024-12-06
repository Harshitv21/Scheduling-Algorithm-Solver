import { useState } from "react";
import "../styles/SJF.css";
import DisplayATAndBT from "./DisplayATAndBT";
import Output from "./Output";
import { TestCaseAccordion } from "./TestCaseAccordion";

export const SJF = ({ arrivalArray, burstTimeArray }) => {
  const [showOutput, setShowOutput] = useState(false);
  const [sortedJobs, setSortedJobs] = useState([]);

  const solveSJF = () => {
    console.log("SJF called");

    const jobs = arrivalArray.map((item, index) => ({
      jobIndex: String.fromCharCode(65 + index),
      arrivalTime: item,
      burstTime: burstTimeArray[index],
    }));

    let time = 0; // Current time
    const completedJobs = [];
    const remainingJobs = [...jobs];

    while (remainingJobs.length > 0) {
      // Filter jobs that have arrived by the current time
      const availableJobs = remainingJobs.filter(
        (job) => job.arrivalTime <= time
      );

      if (availableJobs.length === 0) {
        // If no jobs are available, move time to the next job's arrival
        time = Math.min(...remainingJobs.map((job) => job.arrivalTime));
        continue;
      }

      // Pick the job with the shortest burst time
      const nextJob = availableJobs.reduce((shortest, job) =>
        job.burstTime < shortest.burstTime ? job : shortest
      );

      // Calculate Finish Time, Turnaround Time, and Waiting Time
      const finishTime = time + nextJob.burstTime;
      const turnaroundTime = finishTime - nextJob.arrivalTime;
      const waitingTime = turnaroundTime - nextJob.burstTime;

      completedJobs.push({
        ...nextJob,
        finishTime,
        turnaroundTime,
        waitingTime,
      });

      // Update time and remove the job from the list
      time = finishTime;
      remainingJobs.splice(remainingJobs.indexOf(nextJob), 1);
    }

    setSortedJobs(completedJobs);
    setShowOutput(true);
  };

  return (
    <div>
      <div>
        <h3>SJF (Shortest Job First)</h3>
      </div>

      <div>
        <TestCaseAccordion arrivalTime="0 2 4 6 8" burstTime="7 2 3 6 5" />
      </div>

      <DisplayATAndBT
        arrivalArray={arrivalArray}
        burstTimeArray={burstTimeArray}
        messageAT={"Arrival times received,"}
        messageBT={"Burst times received,"}
      />

      <div className="solveBtnContainer">
        {arrivalArray.length >= 1 &&
        burstTimeArray.length >= 1 &&
        arrivalArray.length === burstTimeArray.length ? (
          <div>
            <button
              type="button"
              className="btn btn-success"
              onClick={solveSJF}
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
